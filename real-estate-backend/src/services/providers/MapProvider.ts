export interface MapProviderConfig {
  providerName: string;
  isAvailable: boolean;
}

export interface MapProvider {
  getConfig(): MapProviderConfig;
  getStaticMapUrl(params: {
    latitude: number;
    longitude: number;
    zoom?: number;
    width?: number;
    height?: number;
  }): string | null;
}
