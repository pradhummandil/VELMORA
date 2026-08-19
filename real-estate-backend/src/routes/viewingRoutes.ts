import { Router } from "express";
import {
  createViewingRequest,
  getMyViewings,
  getReceivedViewings,
  updateViewingStatus,
} from "../controllers/ViewingController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticateUser, createViewingRequest);
router.get("/my", authenticateUser, getMyViewings);
router.get("/received", authenticateUser, getReceivedViewings);
router.patch("/:id/status", authenticateUser, updateViewingStatus);

export default router;
