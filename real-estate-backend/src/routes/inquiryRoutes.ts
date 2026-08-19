import { Router } from "express";
import {
  createInquiry,
  getMyInquiries,
  getReceivedInquiries,
  updateInquiryStatus,
} from "../controllers/InquiryController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticateUser, createInquiry);
router.get("/my", authenticateUser, getMyInquiries);
router.get("/received", authenticateUser, getReceivedInquiries);
router.patch("/:id/status", authenticateUser, updateInquiryStatus);

export default router;
