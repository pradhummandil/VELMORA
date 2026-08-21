import express from "express";
import { authenticateUser, requireAdmin } from "../middleware/authMiddleware";
import {
  getPendingReraModerations,
  getReraModerationDetail,
  verifyRera,
  rejectOrUpdateReraStatus,
} from "../controllers/ReraController";

const router = express.Router();

// Admin-only RERA moderation endpoints
router.get("/pending", authenticateUser, requireAdmin, getPendingReraModerations);
router.get("/:propertyId", authenticateUser, requireAdmin, getReraModerationDetail);
router.patch("/:propertyId/verify", authenticateUser, requireAdmin, verifyRera);
router.patch("/:propertyId/reject", authenticateUser, requireAdmin, rejectOrUpdateReraStatus);

export default router;
