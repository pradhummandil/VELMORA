import axios from "axios";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token automatically to outgoing requests if in browser
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Helper functions for API calls
export const apiClient = {
  // Auth & Profile
  getProfile: () => api.get("/api/profile"),
  updateProfile: (data: any) => api.put("/api/profile", data),
  getDashboardStats: () => api.get("/api/dashboard/stats"),

  // Locations & Maps
  getAutocomplete: (q: string, sessionToken?: string, signal?: AbortSignal) =>
    api.get("/api/locations/autocomplete", { params: { q, sessionToken }, signal }),
  geocode: (address: string) => api.get("/api/locations/geocode", { params: { address } }),
  reverseGeocode: (lat: number, lng: number) =>
    api.get("/api/locations/reverse-geocode", { params: { lat, lng } }),
  getPlaceDetails: (placeId: string, sessionToken?: string) =>
    api.get("/api/locations/details", { params: { placeId, sessionToken } }),

  // Properties & Map Discovery
  searchProperties: (params?: any, signal?: AbortSignal) =>
    api.get("/api/search/properties", { params, signal }),
  getProperties: (params?: any) => api.get("/api/properties", { params }),
  getProperty: (id: string | number) => api.get(`/api/properties/${id}`),
  getMyListings: () => api.get("/api/properties/my/listings"),
  createProperty: (data: any) => api.post("/api/properties", data),
  updateProperty: (id: string | number, data: any) => api.put(`/api/properties/${id}`, data),
  deleteProperty: (id: string | number) => api.delete(`/api/properties/${id}`),

  // Inquiries
  createInquiry: (data: any) => api.post("/api/inquiries", data),
  getMyInquiries: () => api.get("/api/inquiries/my"),
  getReceivedInquiries: () => api.get("/api/inquiries/received"),
  updateInquiryStatus: (id: string | number, status: string) =>
    api.patch(`/api/inquiries/${id}/status`, { status }),

  // Viewing Requests (Schedule Tour)
  createViewing: (data: any) => api.post("/api/viewings", data),
  getMyViewings: () => api.get("/api/viewings/my"),
  getReceivedViewings: () => api.get("/api/viewings/received"),
  updateViewingStatus: (id: string | number, status: string) =>
    api.patch(`/api/viewings/${id}/status`, { status }),

  // Favorites
  getFavorites: () => api.get("/api/favorites"),
  getFavoriteIds: () => api.get("/api/favorites/ids"),
  addFavorite: (propertyId: number, propertyData?: any) =>
    api.post("/api/favorites", { propertyId, propertyData }),
  removeFavorite: (propertyId: number) => api.delete(`/api/favorites/${propertyId}`),

  // RERA Trust & Verification
  getReraInfo: (propertyId: number | string) => api.get(`/api/rera/property/${propertyId}`),
  submitReraInfo: (propertyId: number | string, data: any) =>
    api.patch(`/api/properties/${propertyId}/rera`, data),
  reportReraDiscrepancy: (data: any) => api.post("/api/rera/report", data),
  getPendingReraModerations: () => api.get("/api/admin/rera/pending"),
  getReraModerationDetail: (propertyId: number | string) =>
    api.get(`/api/admin/rera/${propertyId}`),
  verifyRera: (propertyId: number | string, data: any) =>
    api.patch(`/api/admin/rera/${propertyId}/verify`, data),
  rejectRera: (propertyId: number | string, data: any) =>
    api.patch(`/api/admin/rera/${propertyId}/reject`, data),

  // Locality & Price Intelligence
  getLocalities: (params?: any) => api.get("/api/locations/localities", { params }),
  getLocality: (slug: string) => api.get(`/api/locations/localities/${slug}`),
  getPriceTrends: (localityId: number | string) =>
    api.get(`/api/market/price-trends/${localityId}`),
  getPropertyComparison: (propertyId: number | string) =>
    api.get(`/api/market/property/${propertyId}`),

  // VELMORA Match & Commute Intelligence
  calculateMatch: (criteria: any) => api.post("/api/search/match", criteria),
  getCommute: (params: any) => api.get("/api/locations/commute", { params }),

  // Dynamic Property Comparison
  compareProperties: (ids: number[] | string) =>
    api.get("/api/properties/compare", {
      params: { ids: Array.isArray(ids) ? ids.join(",") : ids },
    }),

  // Saved Searches
  getSavedSearches: () => api.get("/api/saved-searches"),
  getSavedSearch: (id: number | string) => api.get(`/api/saved-searches/${id}`),
  createSavedSearch: (data: any) => api.post("/api/saved-searches", data),
  updateSavedSearch: (id: number | string, data: any) =>
    api.put(`/api/saved-searches/${id}`, data),
  deleteSavedSearch: (id: number | string) => api.delete(`/api/saved-searches/${id}`),
};




