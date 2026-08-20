import { MapProvider, MapProviderConfig } from "./MapProvider";

export class GoogleMapProvider implements MapProvider {
  private apiKey: string | undefined;

  constructor() {
    this.apiKey = process.env.GOOGLE_MAPS_SERVER_KEY || process.env.GOOGLE_MAPS_API_KEY;
  }

  getConfig(): MapProviderConfig {
    return {
      providerName: "google",
      isAvailable: !!this.apiKey && this.apiKey.trim().length > 0,
    };
  }

  getStaticMapUrl(params: {
    latitude: number;
    longitude: number;
    zoom?: number;
    width?: number;
    height?: number;
  }): string | null {
    if (!this.apiKey) return null;
    const { latitude, longitude, zoom = 15, width = 600, height = 400 } = params;
    return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=${width}x${height}&markers=color:gold%7C${latitude},${longitude}&key=${this.apiKey}`;
  }
}
