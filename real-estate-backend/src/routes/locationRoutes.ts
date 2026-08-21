import { Router } from "express";
import {
  getAutocomplete,
  getGeocode,
  getReverseGeocode,
  getPlaceDetails,
  getCommute,
} from "../controllers/LocationController";
import {
  getLocalities,
  getLocalityBySlug,
  createOrUpdateLocality,
} from "../controllers/LocalityController";
import { authenticateUser, requireAdmin } from "../middleware/authMiddleware";

const router = Router();

// Public Location APIs
router.get("/autocomplete", getAutocomplete);
router.get("/geocode", getGeocode);
router.get("/reverse-geocode", getReverseGeocode);
router.get("/details", getPlaceDetails);
router.get("/commute", getCommute);

// Locality Intelligence APIs
router.get("/localities", getLocalities);
router.get("/localities/:slug", getLocalityBySlug);
router.post("/localities", authenticateUser, requireAdmin, createOrUpdateLocality);
router.put("/localities/:id", authenticateUser, requireAdmin, createOrUpdateLocality);

export default router;
