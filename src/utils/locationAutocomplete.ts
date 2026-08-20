import { apiClient } from "./api";
import { INDIAN_LOCATION_SUGGESTIONS } from "@/data/home-data/LocationSuggestions";

export interface UnifiedLocationSuggestion {
  id: string;
  title: string;
  subtitle?: string;
  source: "google" | "local";
  placeId?: string;
}

class LocationAutocompleteManager {
  private sessionToken: string | null = null;
  private cache: Map<string, UnifiedLocationSuggestion[]> = new Map();
  private currentAbortController: AbortController | null = null;

  /**
   * Get or initialize session token for Google Places Autocomplete session pricing
   */
  getSessionToken(): string {
    if (!this.sessionToken) {
      this.sessionToken = Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    }
    return this.sessionToken;
  }

  /**
   * Reset session token once a user selects a place details result
   */
  resetSessionToken() {
    this.sessionToken = null;
  }

  /**
   * Fetch location suggestions with debounce, caching, and local fallback
   */
  async fetchSuggestions(query: string): Promise<UnifiedLocationSuggestion[]> {
    const trimmed = (query || "").trim();
    if (trimmed.length < 2) {
      return [];
    }

    const cacheKey = trimmed.toLowerCase();

    // 1. Check client memory cache
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // 2. Abort previous in-flight request if user is typing rapidly
    if (this.currentAbortController) {
      this.currentAbortController.abort();
    }
    this.currentAbortController = new AbortController();

    const localFiltered = INDIAN_LOCATION_SUGGESTIONS.filter((loc) =>
      loc.toLowerCase().includes(cacheKey)
    ).slice(0, 6).map((loc, idx) => ({
      id: `local-${idx}-${loc}`,
      title: loc,
      subtitle: "Popular Location",
      source: "local" as const,
    }));

    try {
      const res = await apiClient.getAutocomplete(
        trimmed,
        this.getSessionToken(),
        this.currentAbortController.signal
      );

      if (res.data && Array.isArray(res.data.suggestions) && res.data.suggestions.length > 0) {
        const googleResults: UnifiedLocationSuggestion[] = res.data.suggestions.map((s: any) => ({
          id: s.placeId || s.description,
          title: s.mainText || s.description,
          subtitle: s.secondaryText || "Verified Area",
          source: "google" as const,
          placeId: s.placeId,
        }));

        this.cache.set(cacheKey, googleResults);
        return googleResults;
      }
    } catch (err: any) {
      // Aborted or network error, fallback to local suggestions
      if (err.name !== "CanceledError" && err.name !== "AbortError") {
        console.info("Using local location suggestions (backend/Google unavailable)");
      }
    }

    this.cache.set(cacheKey, localFiltered);
    return localFiltered;
  }
}

export const locationAutocompleteManager = new LocationAutocompleteManager();
