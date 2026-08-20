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

  // Properties
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
};
