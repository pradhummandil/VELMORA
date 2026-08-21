import express from "express";
import { getPublicReraInfo, reportIncorrectRera } from "../controllers/ReraController";

const router = express.Router();

// Public RERA routes
router.get("/property/:propertyId", getPublicReraInfo);
router.post("/report", reportIncorrectRera);

export default router;
