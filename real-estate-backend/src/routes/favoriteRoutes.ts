import { Router } from "express";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
  getFavoriteIds,
} from "../controllers/FavoriteController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticateUser, addFavorite);
router.delete("/:propertyId", authenticateUser, removeFavorite);
router.get("/", authenticateUser, getFavorites);
router.get("/ids", authenticateUser, getFavoriteIds);

export default router;
