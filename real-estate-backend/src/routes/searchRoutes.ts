import { Router } from "express";
import { searchProperties } from "../controllers/SearchController";
import { calculateMatches } from "../controllers/MatchController";

const router = Router();

// Public property search & discovery
router.get("/properties", searchProperties);
router.post("/match", calculateMatches);

export default router;
