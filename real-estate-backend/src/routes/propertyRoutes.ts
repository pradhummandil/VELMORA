import { Router } from "express";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  getMyListings,
  updateProperty,
  deleteProperty,
} from "../controllers/PropertyController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = Router();

// Public property routes
router.get("/", getAllProperties);
router.get("/my/listings", authenticateUser, getMyListings);
router.get("/:id", getPropertyById);

// Protected property management routes
router.post("/", authenticateUser, createProperty);
router.put("/:id", authenticateUser, updateProperty);
router.delete("/:id", authenticateUser, deleteProperty);

export default router;
