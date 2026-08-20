import axios from "axios";
import { RouteProvider, RouteResult, LatLngPoint } from "./RouteProvider";
import { CommuteRouteCache } from "../../models/CommuteRouteCache";
import { Op } from "sequelize";
import crypto from "crypto";

export class GoogleRouteProvider implements RouteProvider {
  private apiKey: string | undefined;

  constructor() {
    this.apiKey = process.env.GOOGLE_MAPS_SERVER_KEY || process.env.GOOGLE_MAPS_API_KEY;
  }

  private isKeyAvailable(): boolean {
    return !!this.apiKey && this.apiKey.trim().length > 0;
  }

  private formatPoint(point: LatLngPoint | string): string {
    if (typeof point === "string") return point.trim();
    return `${point.lat},${point.lng}`;
  }

  private hashString(str: string): string {
    return crypto.createHash("md5").update(str.toLowerCase().trim()).digest("hex");
  }

  async getRoute(
    origin: LatLngPoint | string,
    destination: LatLngPoint | string,
    mode: "driving" | "transit" | "walking" | "bicycling" = "driving"
  ): Promise<RouteResult | null> {
    const originStr = this.formatPoint(origin);
    const destStr = this.formatPoint(destination);

    if (!originStr || !destStr) return null;

    const originHash = this.hashString(`${originStr}:${mode}`);
    const destHash = this.hashString(destStr);

    // 1. Check persistent route cache
    try {
      const cached = await CommuteRouteCache.findOne({
        where: {
          originHash,
          destinationHash: destHash,
          cachedUntil: { [Op.gt]: new Date() },
        },
      });

      if (cached) {
        return {
          distanceKm: cached.distanceKm,
          durationMinutes: cached.durationMinutes,
          originAddress: cached.originAddress,
          destinationAddress: cached.destinationAddress,
          status: "OK",
        };
      }
    } catch (cacheErr: any) {
      console.warn("Commute cache lookup notice:", cacheErr.message);
    }

    if (!this.isKeyAvailable()) {
      return null;
    }

    try {
      const response = await axios.get("https://maps.googleapis.com/maps/api/distancematrix/json", {
        params: {
          origins: originStr,
          destinations: destStr,
          mode,
          key: this.apiKey,
        },
        timeout: 6000,
      });

      if (response.data?.status === "OK") {
        const row = response.data.rows?.[0];
        const element = row?.elements?.[0];

        if (element?.status === "OK") {
          const distanceMeters = element.distance?.value || 0;
          const durationSeconds = element.duration?.value || 0;

          const distanceKm = Number((distanceMeters / 1000).toFixed(1));
          const durationMinutes = Math.ceil(durationSeconds / 60);

          const result: RouteResult = {
            distanceKm,
            durationMinutes,
            originAddress: response.data.origin_addresses?.[0] || originStr,
            destinationAddress: response.data.destination_addresses?.[0] || destStr,
            status: "OK",
          };

          // Cache route calculation for 14 days
          try {
            const cachedUntil = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
            await CommuteRouteCache.create({
              originHash,
              destinationHash: destHash,
              originAddress: result.originAddress,
              destinationAddress: result.destinationAddress,
              distanceKm: result.distanceKm,
              durationMinutes: result.durationMinutes,
              transitMode: mode,
              cachedUntil,
            });
          } catch (writeErr: any) {}

          return result;
        }
      }

      return null;
    } catch (err: any) {
      console.warn("Google Distance Matrix notice:", err.message || "Network error");
      return null;
    }
  }
}
