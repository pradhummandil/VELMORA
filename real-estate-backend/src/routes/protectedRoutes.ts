import { Router, Response } from "express";
import { Op } from "sequelize";
import { User } from "../models/User"; 
import { Property } from "../models/Property";
import { Inquiry } from "../models/Inquiry";
import { ViewingRequest } from "../models/ViewingRequest";
import { Favorite } from "../models/Favorite";
import { authenticateUser, AuthRequest } from "../middleware/authMiddleware"; 

const router = Router();

// 📌 GET PROFILE
router.get("/profile", authenticateUser, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "role", "firstName", "lastName", "phoneNumber", "about"],
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const userObj = user.toJSON();
    if (!userObj.role) {
      userObj.role = "user";
    }

    res.json(userObj);
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    res.status(500).json({ error: "Something went wrong fetching profile" });
  }
});

// 📌 UPDATE PROFILE
router.put("/profile", authenticateUser, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { name, firstName, lastName, phoneNumber, about } = req.body;

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
    if (about !== undefined) updateData.about = about;

    await User.update(updateData, { where: { id: req.user.id } });

    const updatedUser = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "role", "firstName", "lastName", "phoneNumber", "about"],
    });

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({ error: "Something went wrong updating profile" });
  }
});

// 📌 DASHBOARD REAL STATS
router.get("/dashboard/stats", authenticateUser, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const userId = req.user.id;
    const user = await User.findByPk(userId);
    const role = user?.role || "user";

    // 1. Properties count
    let myPropertiesCount = 0;
    if (role === "property_owner") {
      myPropertiesCount = await Property.count({ where: { ownerId: userId } });
    } else if (role === "agent") {
      myPropertiesCount = await Property.count({
        where: {
          [Op.or]: [{ ownerId: userId }, { agentId: userId }],
        },
      });
    } else {
      myPropertiesCount = await Property.count({ where: { ownerId: userId } });
    }

    // 2. Inquiries count
    let activeInquiriesCount = 0;
    if (role === "user") {
      activeInquiriesCount = await Inquiry.count({ where: { userId } });
    } else if (role === "property_owner") {
      activeInquiriesCount = await Inquiry.count({ where: { ownerId: userId } });
    } else if (role === "agent") {
      activeInquiriesCount = await Inquiry.count({
        where: {
          [Op.or]: [{ ownerId: userId }, { agentId: userId }],
        },
      });
    }

    // 3. Viewing Requests / Tours count
    let scheduledToursCount = 0;
    if (role === "user") {
      scheduledToursCount = await ViewingRequest.count({ where: { userId } });
    } else if (role === "property_owner") {
      scheduledToursCount = await ViewingRequest.count({ where: { ownerId: userId } });
    } else if (role === "agent") {
      scheduledToursCount = await ViewingRequest.count({
        where: {
          [Op.or]: [{ ownerId: userId }, { agentId: userId }],
        },
      });
    }

    // 4. Saved Favorites count
    const savedFavouritesCount = await Favorite.count({ where: { userId } });

    // 5. Saved Searches count
    const { SavedSearch } = await import("../models/SavedSearch");
    const savedSearchesCount = await SavedSearch.count({ where: { userId } });

    res.json({
      role,
      myProperties: myPropertiesCount,
      activeInquiries: activeInquiriesCount,
      scheduledTours: scheduledToursCount,
      savedFavourites: savedFavouritesCount,
      savedSearches: savedSearchesCount,
      portfolioViews: 0,
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ error: "Error fetching dashboard statistics" });
  }
});

export default router;
