import { Router } from "express";
import {
  getAutocomplete,
  getGeocode,
  getReverseGeocode,
  getPlaceDetails,
} from "../controllers/LocationController";

const router = Router();

// Public Location APIs
router.get("/autocomplete", getAutocomplete);
router.get("/geocode", getGeocode);
router.get("/reverse-geocode", getReverseGeocode);
router.get("/details", getPlaceDetails);

export default router;
