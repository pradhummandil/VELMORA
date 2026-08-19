import { Response } from "express";
import { Favorite } from "../models/Favorite";
import { AuthRequest } from "../middleware/authMiddleware";

export const addFavorite = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Please log in to save properties." });
      return;
    }

    const { propertyId, propertyData } = req.body;

    if (!propertyId) {
      res.status(400).json({ error: "propertyId is required." });
      return;
    }

    const [favorite, created] = await Favorite.findOrCreate({
      where: {
        userId: req.user.id,
        propertyId: Number(propertyId),
      },
      defaults: {
        userId: req.user.id,
        propertyId: Number(propertyId),
        propertyData: propertyData || null,
      },
    });

    if (!created && propertyData) {
      favorite.propertyData = propertyData;
      await favorite.save();
    }

    res.status(200).json({
      message: created ? "Property saved to favourites" : "Property already in favourites",
      favorite,
      isFavorite: true,
    });
  } catch (error) {
    console.error("Add Favorite Error:", error);
    res.status(500).json({ error: "Error saving favourite property" });
  }
};

export const removeFavorite = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { propertyId } = req.params;

    if (!propertyId) {
      res.status(400).json({ error: "propertyId is required." });
      return;
    }

    const deleted = await Favorite.destroy({
      where: {
        userId: req.user.id,
        propertyId: Number(propertyId),
      },
    });

    res.json({
      message: "Property removed from favourites",
      isFavorite: false,
      deletedCount: deleted,
    });
  } catch (error) {
    console.error("Remove Favorite Error:", error);
    res.status(500).json({ error: "Error removing favourite property" });
  }
};

export const getFavorites = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const favorites = await Favorite.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    res.json(favorites);
  } catch (error) {
    console.error("Get Favorites Error:", error);
    res.status(500).json({ error: "Error fetching saved favourites" });
  }
};

export const getFavoriteIds = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.json([]);
      return;
    }

    const favorites = await Favorite.findAll({
      where: { userId: req.user.id },
      attributes: ["propertyId"],
    });

    const ids = favorites.map((f) => f.propertyId);
    res.json(ids);
  } catch (error) {
    console.error("Get Favorite IDs Error:", error);
    res.json([]);
  }
};
