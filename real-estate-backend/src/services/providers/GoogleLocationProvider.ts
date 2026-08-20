import axios from "axios";
import { LocationProvider, NormalizedLocation, AutocompleteSuggestion } from "./LocationProvider";
import { LocationCache } from "../../models/LocationCache";
import { Op } from "sequelize";

export class GoogleLocationProvider implements LocationProvider {
  private apiKey: string | undefined;

  constructor() {
    this.apiKey = process.env.GOOGLE_MAPS_SERVER_KEY || process.env.GOOGLE_MAPS_API_KEY;
  }

  private isKeyAvailable(): boolean {
    return !!this.apiKey && this.apiKey.trim().length > 0;
  }

  /**
   * Helper to normalize Google address components into standard VELMORA location shape
   */
  private extractComponents(components: any[] = []): {
    locality?: string;
    city?: string;
    district?: string;
    state?: string;
    country?: string;
    pincode?: string;
  } {
    const result: any = { country: "India" };

    for (const comp of components) {
      const types = comp.types || [];
      if (types.includes("sublocality_level_1") || types.includes("sublocality")) {
        result.locality = comp.long_name;
      } else if (types.includes("neighborhood") && !result.locality) {
        result.locality = comp.long_name;
      }

      if (types.includes("locality")) {
        result.city = comp.long_name;
        if (!result.locality) {
          result.locality = comp.long_name;
        }
      } else if (types.includes("administrative_area_level_2")) {
        result.district = comp.long_name;
        if (!result.city) {
          result.city = comp.long_name;
        }
      }

      if (types.includes("administrative_area_level_1")) {
        result.state = comp.long_name;
      }

      if (types.includes("country")) {
        result.country = comp.long_name;
      }

      if (types.includes("postal_code")) {
        result.pincode = comp.long_name;
      }
    }

    return result;
  }

  /**
   * Autocomplete location suggestions in India
   */
  async autocomplete(query: string, sessionToken?: string): Promise<AutocompleteSuggestion[]> {
    const cleanQuery = (query || "").trim();
    if (!cleanQuery || cleanQuery.length < 2) {
      return [];
    }

    if (!this.isKeyAvailable()) {
      return [];
    }

    try {
      const params: any = {
        input: cleanQuery,
        components: "country:in",
        key: this.apiKey,
      };

      if (sessionToken) {
        params.sessiontoken = sessionToken;
      }

      const response = await axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json", {
        params,
        timeout: 5000,
      });

      if (response.data?.status === "OK" && Array.isArray(response.data.predictions)) {
        return response.data.predictions.slice(0, 6).map((item: any) => ({
          placeId: item.place_id,
          description: item.description,
          mainText: item.structured_formatting?.main_text || item.description.split(",")[0],
          secondaryText: item.structured_formatting?.secondary_text,
          types: item.types || [],
        }));
      }

      return [];
    } catch (err: any) {
      console.warn("Google Places Autocomplete notice:", err.message || "Network error");
      return [];
    }
  }

  /**
   * Geocode a text address into standardized coordinates and location attributes
   */
  async geocode(address: string): Promise<NormalizedLocation | null> {
    const cleanAddress = (address || "").trim();
    if (!cleanAddress) return null;

    const cacheKey = `geo:${cleanAddress.toLowerCase().replace(/\s+/g, " ")}`;

    // 1. Check persistent database cache
    try {
      const cached = await LocationCache.findOne({
        where: {
          queryKey: cacheKey,
          expiresAt: { [Op.gt]: new Date() },
        },
      });

      if (cached) {
        return {
          placeId: cached.placeId,
          formattedAddress: cached.formattedAddress,
          name: cached.name,
          locality: cached.locality,
          city: cached.city,
          district: cached.district,
          state: cached.state,
          country: cached.country,
          pincode: cached.pincode,
          latitude: cached.latitude,
          longitude: cached.longitude,
          rawComponents: cached.rawComponents,
        };
      }
    } catch (cacheReadErr: any) {
      console.warn("Location cache lookup notice:", cacheReadErr.message);
    }

    if (!this.isKeyAvailable()) {
      return null;
    }

    try {
      const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: cleanAddress,
          components: "country:in",
          key: this.apiKey,
        },
        timeout: 6000,
      });

      if (response.data?.status === "OK" && Array.isArray(response.data.results) && response.data.results.length > 0) {
        const topResult = response.data.results[0];
        const { lat, lng } = topResult.geometry.location;
        const comps = this.extractComponents(topResult.address_components);

        const normalized: NormalizedLocation = {
          placeId: topResult.place_id,
          formattedAddress: topResult.formatted_address,
          name: cleanAddress.split(",")[0].trim(),
          locality: comps.locality,
          city: comps.city,
          district: comps.district,
          state: comps.state,
          country: comps.country,
          pincode: comps.pincode,
          latitude: Number(lat),
          longitude: Number(lng),
          rawComponents: topResult.address_components,
        };

        // Cache result for 30 days
        try {
          const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
          await LocationCache.upsert({
            queryKey: cacheKey,
            provider: "google",
            formattedAddress: normalized.formattedAddress,
            placeId: normalized.placeId,
            name: normalized.name,
            locality: normalized.locality,
            city: normalized.city,
            district: normalized.district,
            state: normalized.state,
            country: normalized.country || "India",
            pincode: normalized.pincode,
            latitude: normalized.latitude,
            longitude: normalized.longitude,
            rawComponents: normalized.rawComponents,
            expiresAt,
          });
        } catch (cacheWriteErr: any) {
          console.warn("Location cache write notice:", cacheWriteErr.message);
        }

        return normalized;
      }

      return null;
    } catch (err: any) {
      console.warn("Google Geocoding notice:", err.message || "Network error");
      return null;
    }
  }

  /**
   * Reverse geocode coordinates into a standardized address
   */
  async reverseGeocode(lat: number, lng: number): Promise<NormalizedLocation | null> {
    if (isNaN(lat) || isNaN(lng)) return null;

    const roundLat = Number(lat.toFixed(6));
    const roundLng = Number(lng.toFixed(6));
    const cacheKey = `rev:${roundLat},${roundLng}`;

    try {
      const cached = await LocationCache.findOne({
        where: {
          queryKey: cacheKey,
          expiresAt: { [Op.gt]: new Date() },
        },
      });

      if (cached) {
        return {
          placeId: cached.placeId,
          formattedAddress: cached.formattedAddress,
          name: cached.name,
          locality: cached.locality,
          city: cached.city,
          district: cached.district,
          state: cached.state,
          country: cached.country,
          pincode: cached.pincode,
          latitude: cached.latitude,
          longitude: cached.longitude,
          rawComponents: cached.rawComponents,
        };
      }
    } catch (cacheErr: any) {}

    if (!this.isKeyAvailable()) {
      return null;
    }

    try {
      const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          latlng: `${roundLat},${roundLng}`,
          key: this.apiKey,
        },
        timeout: 6000,
      });

      if (response.data?.status === "OK" && Array.isArray(response.data.results) && response.data.results.length > 0) {
        const topResult = response.data.results[0];
        const comps = this.extractComponents(topResult.address_components);

        const normalized: NormalizedLocation = {
          placeId: topResult.place_id,
          formattedAddress: topResult.formatted_address,
          name: comps.locality || comps.city || topResult.formatted_address.split(",")[0],
          locality: comps.locality,
          city: comps.city,
          district: comps.district,
          state: comps.state,
          country: comps.country,
          pincode: comps.pincode,
          latitude: roundLat,
          longitude: roundLng,
          rawComponents: topResult.address_components,
        };

        try {
          const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
          await LocationCache.upsert({
            queryKey: cacheKey,
            provider: "google",
            formattedAddress: normalized.formattedAddress,
            placeId: normalized.placeId,
            name: normalized.name,
            locality: normalized.locality,
            city: normalized.city,
            district: normalized.district,
            state: normalized.state,
            country: normalized.country || "India",
            pincode: normalized.pincode,
            latitude: roundLat,
            longitude: roundLng,
            rawComponents: normalized.rawComponents,
            expiresAt,
          });
        } catch (e) {}

        return normalized;
      }

      return null;
    } catch (err: any) {
      console.warn("Google Reverse Geocoding notice:", err.message || "Network error");
      return null;
    }
  }

  /**
   * Fetch full place details by Place ID
   */
  async placeDetails(placeId: string, sessionToken?: string): Promise<NormalizedLocation | null> {
    const cleanPlaceId = (placeId || "").trim();
    if (!cleanPlaceId) return null;

    const cacheKey = `pid:${cleanPlaceId}`;

    try {
      const cached = await LocationCache.findOne({
        where: {
          queryKey: cacheKey,
          expiresAt: { [Op.gt]: new Date() },
        },
      });

      if (cached) {
        return {
          placeId: cached.placeId,
          formattedAddress: cached.formattedAddress,
          name: cached.name,
          locality: cached.locality,
          city: cached.city,
          district: cached.district,
          state: cached.state,
          country: cached.country,
          pincode: cached.pincode,
          latitude: cached.latitude,
          longitude: cached.longitude,
          rawComponents: cached.rawComponents,
        };
      }
    } catch (cacheErr: any) {}

    if (!this.isKeyAvailable()) {
      return null;
    }

    try {
      const params: any = {
        place_id: cleanPlaceId,
        fields: "address_components,formatted_address,geometry,name,place_id",
        key: this.apiKey,
      };

      if (sessionToken) {
        params.sessiontoken = sessionToken;
      }

      const response = await axios.get("https://maps.googleapis.com/maps/api/place/details/json", {
        params,
        timeout: 6000,
      });

      if (response.data?.status === "OK" && response.data.result) {
        const place = response.data.result;
        const comps = this.extractComponents(place.address_components);
        const lat = place.geometry?.location?.lat;
        const lng = place.geometry?.location?.lng;

        if (lat === undefined || lng === undefined) return null;

        const normalized: NormalizedLocation = {
          placeId: place.place_id || cleanPlaceId,
          formattedAddress: place.formatted_address || place.name,
          name: place.name || comps.locality || comps.city,
          locality: comps.locality,
          city: comps.city,
          district: comps.district,
          state: comps.state,
          country: comps.country,
          pincode: comps.pincode,
          latitude: Number(lat),
          longitude: Number(lng),
          rawComponents: place.address_components,
        };

        try {
          const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
          await LocationCache.upsert({
            queryKey: cacheKey,
            provider: "google",
            formattedAddress: normalized.formattedAddress,
            placeId: normalized.placeId,
            name: normalized.name,
            locality: normalized.locality,
            city: normalized.city,
            district: normalized.district,
            state: normalized.state,
            country: normalized.country || "India",
            pincode: normalized.pincode,
            latitude: normalized.latitude,
            longitude: normalized.longitude,
            rawComponents: normalized.rawComponents,
            expiresAt,
          });
        } catch (e) {}

        return normalized;
      }

      return null;
    } catch (err: any) {
      console.warn("Google Place Details notice:", err.message || "Network error");
      return null;
    }
  }
}
