"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { apiClient } from "@/utils/api";
import { MapMarkerItem } from "@/components/map/PropertyMap";
import listing_data from "@/data/inner-data/ListingData";

export interface DiscoveryFilters {
  location?: string;
  locality?: string;
  city?: string;
  search?: string;
  purpose?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  bhk?: string;
  reraOnly?: boolean;
  minScore?: number;
  sortBy?: "newest" | "price_asc" | "price_desc" | "score_desc";
  page?: number;
  limit?: number;
}

export interface ViewportBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

// Fallback coordinate mappings for curated static data
const LOCALITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  worli: { lat: 19.015, lng: 72.815 },
  bandra: { lat: 19.0596, lng: 72.8295 },
  "bandra west": { lat: 19.0596, lng: 72.8295 },
  juhu: { lat: 19.1075, lng: 72.8263 },
  "marine lines": { lat: 18.9438, lng: 72.8233 },
  "altamount road": { lat: 18.9686, lng: 72.8089 },
  "golf course road": { lat: 28.4595, lng: 77.0967 },
  whitefield: { lat: 12.9698, lng: 77.75 },
  koramangala: { lat: 12.9352, lng: 77.6245 },
  indore: { lat: 22.7196, lng: 75.8577 },
  bhopal: { lat: 23.2599, lng: 77.4126 },
};

export const usePropertyDiscovery = (initialLimit: number = 20) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [properties, setProperties] = useState<any[]>([]);
  const [markers, setMarkers] = useState<MapMarkerItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | number | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "map">("list");
  const [viewportBounds, setViewportBounds] = useState<ViewportBounds | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  // Parse initial filters from URL params
  const [filters, setFilters] = useState<DiscoveryFilters>(() => ({
    location: searchParams.get("location") || "",
    search: searchParams.get("search") || "",
    purpose: searchParams.get("purpose") || "buy",
    propertyType: searchParams.get("type") || "all",
    bhk: searchParams.get("bhk") || "all",
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    sortBy: (searchParams.get("sortBy") as any) || "newest",
    page: 1,
    limit: initialLimit,
  }));

  // Update URL search parameters without triggering a full page reload
  const syncUrlParams = useCallback(
    (newFilters: DiscoveryFilters) => {
      const params = new URLSearchParams();
      if (newFilters.location) params.set("location", newFilters.location);
      if (newFilters.search) params.set("search", newFilters.search);
      if (newFilters.purpose && newFilters.purpose !== "buy") params.set("purpose", newFilters.purpose);
      if (newFilters.propertyType && newFilters.propertyType !== "all") params.set("type", newFilters.propertyType);
      if (newFilters.bhk && newFilters.bhk !== "all") params.set("bhk", newFilters.bhk);
      if (newFilters.minPrice) params.set("minPrice", String(newFilters.minPrice));
      if (newFilters.maxPrice) params.set("maxPrice", String(newFilters.maxPrice));
      if (newFilters.sortBy && newFilters.sortBy !== "newest") params.set("sortBy", newFilters.sortBy);

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      window.history.replaceState(null, "", newUrl);
    },
    [pathname]
  );

  // Fetch properties from backend search API with fallback
  const fetchProperties = useCallback(
    async (bounds?: ViewportBounds | null) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      setLoading(true);

      const queryParams: any = {
        ...filters,
        limit: filters.limit || initialLimit,
        page: currentPage,
      };

      if (bounds) {
        queryParams.north = bounds.north;
        queryParams.south = bounds.south;
        queryParams.east = bounds.east;
        queryParams.west = bounds.west;
      }

      try {
        const response = await apiClient.searchProperties(queryParams, abortControllerRef.current.signal);

        if (response.data && Array.isArray(response.data.properties) && response.data.properties.length > 0) {
          setProperties(response.data.properties);
          setMarkers(response.data.markers || []);
          setTotal(response.data.total || response.data.properties.length);
          setTotalPages(response.data.totalPages || 1);
          setLoading(false);
          return;
        }
      } catch (err: any) {
        if (err.name === "CanceledError" || err.name === "AbortError") {
          return;
        }
        console.warn("Backend property search fallback mode active:", err.message);
      }

      // Fallback: Filter curated static catalogue
      let filtered = [...listing_data];

      if (filters.location) {
        const q = filters.location.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.location?.toLowerCase().includes(q) ||
            p.address?.toLowerCase().includes(q) ||
            p.title?.toLowerCase().includes(q)
        );
      }

      if (filters.propertyType && filters.propertyType !== "all") {
        filtered = filtered.filter(
          (p) => p.type?.toLowerCase() === filters.propertyType?.toLowerCase()
        );
      }

      if (filters.bhk && filters.bhk !== "all") {
        filtered = filtered.filter((p) => String(p.property_info?.bed) === String(filters.bhk));
      }

      if (filters.minPrice) {
        filtered = filtered.filter((p) => p.price >= (filters.minPrice || 0));
      }
      if (filters.maxPrice) {
        filtered = filtered.filter((p) => p.price <= (filters.maxPrice || Infinity));
      }

      const staticMarkers: MapMarkerItem[] = filtered.map((item, idx) => {
        const locLower = (item.location || "").toLowerCase();
        let coords = { lat: 19.015 + (idx * 0.005), lng: 72.815 + (idx * 0.005) };
        for (const [key, val] of Object.entries(LOCALITY_COORDINATES)) {
          if (locLower.includes(key)) {
            coords = { lat: val.lat + (idx * 0.002), lng: val.lng + (idx * 0.002) };
            break;
          }
        }

        return {
          id: item.id,
          title: item.title,
          price: item.price,
          latitude: coords.lat,
          longitude: coords.lng,
          listingPurpose: item.tag || "buy",
          propertyType: item.property_type,
          bedrooms: item.property_details?.bed,
          addressScore: 92,
          reraStatus: "verified",
          locality: item.location,
          thumb: item.carousel_thumb ? item.carousel_thumb[0]?.img : null,
        };
      });

      setProperties(filtered);
      setMarkers(staticMarkers);
      setTotal(filtered.length);
      setTotalPages(Math.ceil(filtered.length / (filters.limit || initialLimit)) || 1);
      setLoading(false);
    },
    [filters, currentPage, initialLimit]
  );

  useEffect(() => {
    fetchProperties(viewportBounds);
  }, [fetchProperties, viewportBounds]);

  const handleBoundsChange = useCallback((bounds: ViewportBounds) => {
    setViewportBounds(bounds);
  }, []);

  const updateFilters = (newFilters: Partial<DiscoveryFilters>) => {
    const updated = { ...filters, ...newFilters, page: 1 };
    setFilters(updated);
    setCurrentPage(1);
    syncUrlParams(updated);
  };

  const resetFilters = () => {
    const cleared: DiscoveryFilters = {
      location: "",
      search: "",
      purpose: "buy",
      propertyType: "all",
      bhk: "all",
      minPrice: undefined,
      maxPrice: undefined,
      sortBy: "newest",
      page: 1,
      limit: initialLimit,
    };
    setFilters(cleared);
    setViewportBounds(null);
    setCurrentPage(1);
    syncUrlParams(cleared);
  };

  return {
    properties,
    markers,
    total,
    totalPages,
    currentPage,
    setCurrentPage,
    loading,
    selectedPropertyId,
    setSelectedPropertyId,
    mobileView,
    setMobileView,
    viewportBounds,
    handleBoundsChange,
    filters,
    updateFilters,
    resetFilters,
  };
};
