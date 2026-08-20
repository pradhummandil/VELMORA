import { Router } from "express";
import { searchProperties } from "../controllers/SearchController";

const router = Router();

// Public property search & discovery
router.get("/properties", searchProperties);

export default router;
