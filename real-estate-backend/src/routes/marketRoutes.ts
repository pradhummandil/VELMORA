import { Router } from "express";
import {
  getPriceTrendsByLocality,
  getPropertyMarketComparison,
} from "../controllers/MarketController";
import { getLocalityBySlug } from "../controllers/LocalityController";

const router = Router();

// Public Market & Price Intelligence APIs
router.get("/price-trends/:localityId", getPriceTrendsByLocality);
router.get("/locality/:slug", getLocalityBySlug);
router.get("/property/:propertyId", getPropertyMarketComparison);

export default router;
