export interface NormalizedLocation {
  placeId?: string;
  formattedAddress: string;
  name?: string;
  locality?: string;
  city?: string;
  district?: string;
  state?: string;
  country?: string;
  pincode?: string;
  latitude: number;
  longitude: number;
  rawComponents?: any;
}

export interface AutocompleteSuggestion {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText?: string;
  types?: string[];
}

export interface LocationProvider {
  autocomplete(query: string, sessionToken?: string): Promise<AutocompleteSuggestion[]>;
  geocode(address: string): Promise<NormalizedLocation | null>;
  reverseGeocode(lat: number, lng: number): Promise<NormalizedLocation | null>;
  placeDetails(placeId: string, sessionToken?: string): Promise<NormalizedLocation | null>;
}
