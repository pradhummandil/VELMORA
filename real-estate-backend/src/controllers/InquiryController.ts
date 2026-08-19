import { Response } from "express";
import { Op } from "sequelize";
import { Inquiry } from "../models/Inquiry";
import { Property } from "../models/Property";
import { User } from "../models/User";
import { AuthRequest } from "../middleware/authMiddleware";
import { EmailService } from "../services/emailService";

export const createInquiry = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Please log in to submit a property inquiry." });
      return;
    }

    const {
      propertyId,
      propertyTitle,
      propertyLocation,
      name,
      email,
      phone,
      message,
    } = req.body;

    if (!propertyTitle || !name || !email || !phone || !message) {
      res.status(400).json({ error: "All inquiry fields (name, email, phone, message, property) are required." });
      return;
    }

    let ownerId: number | undefined;
    let agentId: number | undefined;
    let recipientEmail: string | undefined;

    // Check if property exists in DB
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

    // Create inquiry record in PostgreSQL
    const inquiry = await Inquiry.create({
      propertyId: String(propertyId || "custom"),
      propertyTitle,
      propertyLocation: propertyLocation || "India",
      userId: req.user.id,
      ownerId,
      agentId,
      name,
      email,
      phone,
      message,
      status: "new",
    });

    // Server-side email notification dispatch
    const emailResult = await EmailService.sendInquiryNotification({
      inquiryId: inquiry.id,
      propertyTitle,
      propertyLocation,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      message,
      submittedAt: inquiry.createdAt,
      recipientEmail,
    });

    res.status(201).json({
      message: "Your inquiry has been sent to the property advisor.",
      inquiry,
      emailDelivery: emailResult.delivered,
      emailWarning: !emailResult.delivered
        ? "Your inquiry was recorded, but we couldn't send the notification email. Our team can still access your request."
        : undefined,
    });
  } catch (error) {
    console.error("Create Inquiry Error:", error);
    res.status(500).json({ error: "We couldn't send your inquiry. Please try again." });
  }
};

export const getMyInquiries = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const inquiries = await Inquiry.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    res.json(inquiries);
  } catch (error) {
    console.error("Get My Inquiries Error:", error);
    res.status(500).json({ error: "Error fetching inquiries" });
  }
};

export const getReceivedInquiries = async (req: AuthRequest, res: Response): Promise<void> => {
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

    const inquiries = await Inquiry.findAll({
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

    res.json(inquiries);
  } catch (error) {
    console.error("Get Received Inquiries Error:", error);
    res.status(500).json({ error: "Error fetching client inquiries" });
  }
};

export const updateInquiryStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["new", "contacted", "in_progress", "closed"];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ error: "Invalid status value." });
      return;
    }

    const inquiry = await Inquiry.findByPk(id);
    if (!inquiry) {
      res.status(404).json({ error: "Inquiry not found" });
      return;
    }

    const user = await User.findByPk(req.user.id);
    const isOwner = inquiry.ownerId === req.user.id;
    const isAgent = inquiry.agentId === req.user.id;
    const isAdmin = user?.role === "admin";

    if (!isOwner && !isAgent && !isAdmin) {
      res.status(403).json({ error: "Unauthorized to update this inquiry" });
      return;
    }

    inquiry.status = status;
    await inquiry.save();

    res.json({ message: "Inquiry status updated", inquiry });
  } catch (error) {
    console.error("Update Inquiry Status Error:", error);
    res.status(500).json({ error: "Error updating inquiry status" });
  }
};
