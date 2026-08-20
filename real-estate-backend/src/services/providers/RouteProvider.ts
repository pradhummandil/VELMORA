export interface LatLngPoint {
  lat: number;
  lng: number;
}

export interface RouteResult {
  distanceKm: number;
  durationMinutes: number;
  originAddress?: string;
  destinationAddress?: string;
  status: string;
}

export interface RouteProvider {
  getRoute(
    origin: LatLngPoint | string,
    destination: LatLngPoint | string,
    mode?: "driving" | "transit" | "walking" | "bicycling"
  ): Promise<RouteResult | null>;
}
