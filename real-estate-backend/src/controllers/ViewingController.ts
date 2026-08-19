import { Response } from "express";
import { Op } from "sequelize";
import { ViewingRequest } from "../models/ViewingRequest";
import { Property } from "../models/Property";
import { User } from "../models/User";
import { AuthRequest } from "../middleware/authMiddleware";
import { EmailService } from "../services/emailService";

export const createViewingRequest = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Please log in to schedule a property tour." });
      return;
    }

    const {
      propertyId,
      propertyTitle,
      propertyLocation,
      name,
      email,
      phone,
      preferredDate,
      preferredTime,
      message,
    } = req.body;

    if (!propertyTitle || !name || !email || !phone || !preferredDate || !preferredTime) {
      res.status(400).json({ error: "Name, email, phone, preferred date, and preferred time are required." });
      return;
    }

    let ownerId: number | undefined;
    let agentId: number | undefined;
    let recipientEmail: string | undefined;

    if (propertyId && !isNaN(Number(propertyId))) {
      const dbProp = await Property.findByPk(Number(propertyId), {
        include: [
          { model: User, as: "owner", attributes: ["id", "email"] },
          { model: User, as: "agent", attributes: ["id", "email"] },
        ],
      });

      if (dbProp) {
        ownerId = dbProp.ownerId;
        agentId = dbProp.agentId;
        recipientEmail = dbProp.agent?.email || dbProp.owner?.email;
      }
    }

    const viewing = await ViewingRequest.create({
      propertyId: String(propertyId || "custom"),
      propertyTitle,
      propertyLocation: propertyLocation || "India",
      userId: req.user.id,
      ownerId,
      agentId,
      name,
      email,
      phone,
      preferredDate,
      preferredTime,
      message,
      status: "requested",
    });

    const emailResult = await EmailService.sendViewingNotification({
      viewingId: viewing.id,
      propertyTitle,
      propertyLocation,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      preferredDate,
      preferredTime,
      message,
      submittedAt: viewing.createdAt,
      recipientEmail,
    });

    res.status(201).json({
      message: "Your property tour request has been scheduled successfully!",
      viewing,
      emailDelivery: emailResult.delivered,
      emailWarning: !emailResult.delivered
        ? "Your viewing request was recorded, but we couldn't send the notification email. Our team will contact you shortly."
        : undefined,
    });
  } catch (error) {
    console.error("Create Viewing Request Error:", error);
    res.status(500).json({ error: "Error scheduling property tour. Please try again." });
  }
};

export const getMyViewings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const viewings = await ViewingRequest.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    res.json(viewings);
  } catch (error) {
    console.error("Get My Viewings Error:", error);
    res.status(500).json({ error: "Error fetching viewing requests" });
  }
};

export const getReceivedViewings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const userId = req.user.id;
    const user = await User.findByPk(userId);

    let whereClause: any = {};
    if (user?.role === "admin") {
      whereClause = {};
    } else {
      whereClause = {
        [Op.or]: [{ ownerId: userId }, { agentId: userId }],
      };
    }

    const viewings = await ViewingRequest.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email", "phoneNumber"],
        },
      ],
    });

    res.json(viewings);
  } catch (error) {
    console.error("Get Received Viewings Error:", error);
    res.status(500).json({ error: "Error fetching assigned viewing requests" });
  }
};

export const updateViewingStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["requested", "confirmed", "rescheduled", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ error: "Invalid viewing status value." });
      return;
    }

    const viewing = await ViewingRequest.findByPk(id);
    if (!viewing) {
      res.status(404).json({ error: "Viewing request not found" });
      return;
    }

    const user = await User.findByPk(req.user.id);
    const isOwner = viewing.ownerId === req.user.id;
    const isAgent = viewing.agentId === req.user.id;
    const isRequester = viewing.userId === req.user.id;
    const isAdmin = user?.role === "admin";

    // Requester can only cancel
    if (isRequester && !isOwner && !isAgent && !isAdmin) {
      if (status !== "cancelled") {
        res.status(403).json({ error: "You can only cancel your viewing request." });
        return;
      }
    } else if (!isOwner && !isAgent && !isAdmin && !isRequester) {
      res.status(403).json({ error: "Unauthorized to update this viewing request." });
      return;
    }

    viewing.status = status;
    await viewing.save();

    res.json({ message: `Viewing request status updated to ${status}`, viewing });
  } catch (error) {
    console.error("Update Viewing Status Error:", error);
    res.status(500).json({ error: "Error updating viewing status" });
  }
};
