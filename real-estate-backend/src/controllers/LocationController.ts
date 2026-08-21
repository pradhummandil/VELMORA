import { Request, Response } from "express";
import { LocationService } from "../services/LocationService";

export const getAutocomplete = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q, sessionToken } = req.query;

    if (!q || typeof q !== "string" || q.trim().length < 2) {
      res.json({ query: q || "", suggestions: [] });
      return;
    }

    const suggestions = await LocationService.autocomplete(
      q.trim(),
      typeof sessionToken === "string" ? sessionToken : undefined
    );

    res.json({
      query: q.trim(),
      count: suggestions.length,
      suggestions,
    });
  } catch (error) {
    console.error("Location Autocomplete Error:", error);
    res.status(500).json({ error: "Error retrieving location suggestions", suggestions: [] });
  }
};

export const getGeocode = async (req: Request, res: Response): Promise<void> => {
  try {
    const { address } = req.query;

    if (!address || typeof address !== "string" || address.trim().length === 0) {
      res.status(400).json({ error: "address query parameter is required" });
      return;
    }

    const location = await LocationService.geocode(address.trim());

    if (!location) {
      res.status(404).json({ error: "Could not geocode the provided address" });
      return;
    }

    res.json({ location });
  } catch (error) {
    console.error("Geocoding Error:", error);
    res.status(500).json({ error: "Error geocoding location" });
  }
};

export const getReverseGeocode = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lat, lng } = req.query;

    const parsedLat = Number(lat);
    const parsedLng = Number(lng);

    if (isNaN(parsedLat) || isNaN(parsedLng)) {
      res.status(400).json({ error: "Valid lat and lng numeric query parameters are required" });
      return;
    }

    const location = await LocationService.reverseGeocode(parsedLat, parsedLng);

    if (!location) {
      res.status(404).json({ error: "Could not find address for provided coordinates" });
      return;
    }

    res.json({ location });
  } catch (error) {
    console.error("Reverse Geocoding Error:", error);
    res.status(500).json({ error: "Error reverse geocoding location" });
  }
};

export const getPlaceDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { placeId, sessionToken } = req.query;

    if (!placeId || typeof placeId !== "string" || placeId.trim().length === 0) {
      res.status(400).json({ error: "placeId query parameter is required" });
      return;
    }

    const location = await LocationService.placeDetails(
      placeId.trim(),
      typeof sessionToken === "string" ? sessionToken : undefined
    );

    if (!location) {
      res.status(404).json({ error: "Place details not found" });
      return;
    }

    res.json({ location });
  } catch (error) {
    console.error("Place Details Error:", error);
    res.status(500).json({ error: "Error fetching place details" });
  }
};

export const getCommute = async (req: Request, res: Response): Promise<void> => {
  try {
    const { originLat, originLng, originAddress, destinationLat, destinationLng, destinationAddress, mode } = req.query;

    const origin = (originLat && originLng) ? { lat: Number(originLat), lng: Number(originLng) } : (originAddress as string);
    const destination = (destinationLat && destinationLng) ? { lat: Number(destinationLat), lng: Number(destinationLng) } : (destinationAddress as string);

    if (!origin || !destination) {
      res.status(400).json({ error: "Origin and destination are required" });
      return;
    }

    const { GoogleRouteProvider } = await import("../services/providers/GoogleRouteProvider");
    const routeProvider = new GoogleRouteProvider();
    const result = await routeProvider.getRoute(origin, destination, (mode as any) || "driving");

    if (!result) {
      res.status(404).json({ error: "Commute route could not be calculated" });
      return;
    }

    res.json(result);
  } catch (error) {
    console.error("Get Commute Error:", error);
    res.status(500).json({ error: "Error calculating commute" });
  }
};

