import { Router } from "express";
import {
  getSavedSearches,
  getSavedSearchById,
  createSavedSearch,
  updateSavedSearch,
  deleteSavedSearch,
} from "../controllers/SavedSearchController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = Router();

// Protected Saved Search APIs
router.get("/", authenticateUser, getSavedSearches);
router.post("/", authenticateUser, createSavedSearch);
router.get("/:id", authenticateUser, getSavedSearchById);
router.put("/:id", authenticateUser, updateSavedSearch);
router.delete("/:id", authenticateUser, deleteSavedSearch);

export default router;
