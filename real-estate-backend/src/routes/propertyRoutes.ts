import { Router } from "express";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  getMyListings,
  updateProperty,
  deleteProperty,
  compareProperties,
} from "../controllers/PropertyController";
import { submitReraInfo } from "../controllers/ReraController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = Router();

// Public property routes
router.get("/", getAllProperties);
router.get("/compare", compareProperties);
router.get("/my/listings", authenticateUser, getMyListings);
router.get("/:id", getPropertyById);

// Protected property management routes
router.post("/", authenticateUser, createProperty);
router.put("/:id", authenticateUser, updateProperty);
router.patch("/:id/rera", authenticateUser, submitReraInfo);
router.delete("/:id", authenticateUser, deleteProperty);

export default router;
