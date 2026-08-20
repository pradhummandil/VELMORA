import { LocationProvider, NormalizedLocation, AutocompleteSuggestion } from "./providers/LocationProvider";
import { GoogleLocationProvider } from "./providers/GoogleLocationProvider";

export class LocationService {
  private static provider: LocationProvider = new GoogleLocationProvider();

  static setProvider(customProvider: LocationProvider) {
    this.provider = customProvider;
  }

  static async autocomplete(query: string, sessionToken?: string): Promise<AutocompleteSuggestion[]> {
    if (!query || query.trim().length < 2) {
      return [];
    }
    return await this.provider.autocomplete(query.trim(), sessionToken);
  }

  static async geocode(address: string): Promise<NormalizedLocation | null> {
    if (!address || address.trim().length === 0) {
      return null;
    }
    return await this.provider.geocode(address.trim());
  }

  static async reverseGeocode(lat: number, lng: number): Promise<NormalizedLocation | null> {
    if (isNaN(lat) || isNaN(lng)) {
      return null;
    }
    return await this.provider.reverseGeocode(lat, lng);
  }

  static async placeDetails(placeId: string, sessionToken?: string): Promise<NormalizedLocation | null> {
    if (!placeId || placeId.trim().length === 0) {
      return null;
    }
    return await this.provider.placeDetails(placeId.trim(), sessionToken);
  }

  /**
   * Safe server-side normalization during property creation / address updates
   */
  static async normalizeAndGeocode(input: {
    address?: string;
    locality?: string;
    city?: string;
    state?: string;
    pincode?: string;
    placeId?: string;
  }): Promise<NormalizedLocation | null> {
    // If Place ID is provided, query place details directly
    if (input.placeId) {
      const details = await this.placeDetails(input.placeId);
      if (details) return details;
    }

    // Build comprehensive search query from available components
    const queryParts = [input.address, input.locality, input.city, input.state, input.pincode]
      .filter((part) => part && part.trim().length > 0)
      .map((part) => part!.trim());

    if (queryParts.length === 0) return null;

    const fullAddress = queryParts.join(", ");
    return await this.geocode(fullAddress);
  }
}
