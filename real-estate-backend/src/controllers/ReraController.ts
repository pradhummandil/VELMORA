import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { Property, ReraStatus } from "../models/Property";
import { User } from "../models/User";
import { ReraVerificationAudit } from "../models/ReraVerificationAudit";
import { ReraReport } from "../models/ReraReport";
import { getAuthorityForState } from "../services/rera/ReraAuthorityDirectory";

/**
 * Public: Get verified RERA details for a property
 */
export const getPublicReraInfo = async (req: any, res: Response): Promise<void> => {
  try {
    const { propertyId } = req.params;
    const property = await Property.findByPk(propertyId, {
      attributes: [
        "id",
        "title",
        "state",
        "city",
        "locality",
        "developer",
        "projectId",
        "reraNumber",
        "reraStatus",
        "reraAuthority",
        "reraRegistrationUrl",
        "reraVerifiedAt",
      ],
    });

    if (!property) {
      res.status(404).json({ error: "Property not found" });
      return;
    }

    const stateAuthority = getAuthorityForState(property.state);

    res.json({
      propertyId: property.id,
      title: property.title,
      reraNumber: property.reraNumber || null,
      reraStatus: property.reraStatus || "pending",
      reraAuthority: property.reraAuthority || (stateAuthority ? stateAuthority.shortName : null),
      reraRegistrationUrl: property.reraRegistrationUrl || (stateAuthority ? stateAuthority.officialPortal : null),
      reraVerifiedAt: property.reraVerifiedAt || null,
      stateAuthority: stateAuthority || null,
    });
  } catch (error) {
    console.error("Get Public RERA Info Error:", error);
    res.status(500).json({ error: "Error fetching RERA trust information" });
  }
};

/**
 * Owner / Agent: Submit or update pending RERA information
 */
export const submitReraInfo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { id } = req.params;
    const { reraNumber, authority, reraRegistrationUrl, reraStatus } = req.body;

    const property = await Property.findByPk(id);
    if (!property) {
      res.status(404).json({ error: "Property not found" });
      return;
    }

    // Check ownership / authorization
    const user = await User.findByPk(req.user.id);
    const isAdmin = user?.role === "admin";
    const isOwnerOrAgent = property.ownerId === req.user.id || property.agentId === req.user.id;

    if (!isAdmin && !isOwnerOrAgent) {
      res.status(403).json({ error: "You are not authorized to update RERA information for this property." });
      return;
    }

    // Non-admin can NEVER set status to 'verified' or set verified timestamp
    let finalStatus: ReraStatus = "pending";
    if (isAdmin && (reraStatus === "verified" || reraStatus === "pending" || reraStatus === "exempt" || reraStatus === "not_applicable")) {
      finalStatus = reraStatus;
    } else if (reraStatus === "exempt" || reraStatus === "not_applicable") {
      finalStatus = reraStatus;
    }

    // Clean input values
    const cleanedNumber = typeof reraNumber === "string" ? reraNumber.trim() : property.reraNumber;
    const cleanedAuthority = typeof authority === "string" ? authority.trim() : property.reraAuthority;
    const cleanedUrl = typeof reraRegistrationUrl === "string" ? reraRegistrationUrl.trim() : property.reraRegistrationUrl;

    property.reraNumber = cleanedNumber;
    property.reraAuthority = cleanedAuthority;
    property.reraRegistrationUrl = cleanedUrl;
    property.reraStatus = finalStatus;

    if (!isAdmin) {
      property.reraVerifiedAt = undefined;
    }

    await property.save();

    res.json({
      message: "RERA information updated successfully. Submission is under verification review.",
      property: {
        id: property.id,
        reraNumber: property.reraNumber,
        reraStatus: property.reraStatus,
        reraAuthority: property.reraAuthority,
        reraRegistrationUrl: property.reraRegistrationUrl,
        reraVerifiedAt: property.reraVerifiedAt,
      },
    });
  } catch (error) {
    console.error("Submit RERA Info Error:", error);
    res.status(500).json({ error: "Error submitting RERA information" });
  }
};

/**
 * Public: Report incorrect RERA / project information
 */
export const reportIncorrectRera = async (req: any, res: Response): Promise<void> => {
  try {
    const { propertyId, reporterName, reporterEmail, issueType, details } = req.body;

    if (!propertyId || !details) {
      res.status(400).json({ error: "Property ID and report details are required" });
      return;
    }

    const property = await Property.findByPk(propertyId);
    if (!property) {
      res.status(404).json({ error: "Property not found" });
      return;
    }

    const report = await ReraReport.create({
      propertyId: Number(propertyId),
      reporterName: reporterName ? String(reporterName).slice(0, 100) : null,
      reporterEmail: reporterEmail ? String(reporterEmail).slice(0, 150) : null,
      issueType: issueType || "incorrect_rera_number",
      details: String(details).slice(0, 2000),
      status: "pending_review",
    });

    res.status(201).json({
      message: "Thank you. Your report has been submitted to the VELMORA Compliance Desk for authoritative review.",
      reportId: report.id,
    });
  } catch (error) {
    console.error("Report RERA Error:", error);
    res.status(500).json({ error: "Error submitting RERA report" });
  }
};

/**
 * Admin: Get list of pending RERA properties
 */
export const getPendingReraModerations = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const properties = await Property.findAll({
      where: {
        reraStatus: "pending",
      },
      attributes: [
        "id",
        "title",
        "location",
        "city",
        "state",
        "developer",
        "reraNumber",
        "reraStatus",
        "reraAuthority",
        "reraRegistrationUrl",
        "createdAt",
      ],
      order: [["createdAt", "DESC"]],
      limit: 100,
    });

    res.json({
      count: properties.length,
      pendingProperties: properties,
    });
  } catch (error) {
    console.error("Get Pending RERA Moderations Error:", error);
    res.status(500).json({ error: "Error fetching pending RERA moderations" });
  }
};

/**
 * Admin: Get RERA moderation detail & audit history
 */
export const getReraModerationDetail = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { propertyId } = req.params;
    const property = await Property.findByPk(propertyId);

    if (!property) {
      res.status(404).json({ error: "Property not found" });
      return;
    }

    const audits = await ReraVerificationAudit.findAll({
      where: { propertyId },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "admin",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    const reports = await ReraReport.findAll({
      where: { propertyId },
      order: [["createdAt", "DESC"]],
    });

    const stateAuthority = getAuthorityForState(property.state);

    res.json({
      property,
      stateAuthority,
      audits,
      reports,
    });
  } catch (error) {
    console.error("Get RERA Moderation Detail Error:", error);
    res.status(500).json({ error: "Error fetching RERA moderation details" });
  }
};

/**
 * Admin: Authoritatively verify RERA registration
 */
export const verifyRera = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { propertyId } = req.params;
    const { authority, officialUrl, verificationMethod, notes } = req.body;

    const property = await Property.findByPk(propertyId);
    if (!property) {
      res.status(404).json({ error: "Property not found" });
      return;
    }

    const previousStatus = property.reraStatus || "pending";
    const verifiedTimestamp = new Date();

    property.reraStatus = "verified";
    property.reraVerifiedAt = verifiedTimestamp;
    if (authority) property.reraAuthority = String(authority).trim();
    if (officialUrl) property.reraRegistrationUrl = String(officialUrl).trim();

    await property.save();

    // Log in audit trail
    await ReraVerificationAudit.create({
      propertyId: property.id,
      previousStatus,
      newStatus: "verified",
      adminId: req.user.id,
      authority: property.reraAuthority,
      officialUrl: property.reraRegistrationUrl,
      verificationMethod: verificationMethod || "manual_admin_review",
      notes: notes || "Authoritatively verified against official state portal records.",
      verifiedAt: verifiedTimestamp,
    });

    res.json({
      message: "Property RERA registration successfully verified.",
      property: {
        id: property.id,
        reraNumber: property.reraNumber,
        reraStatus: property.reraStatus,
        reraAuthority: property.reraAuthority,
        reraRegistrationUrl: property.reraRegistrationUrl,
        reraVerifiedAt: property.reraVerifiedAt,
      },
    });
  } catch (error) {
    console.error("Verify RERA Error:", error);
    res.status(500).json({ error: "Error verifying RERA registration" });
  }
};

/**
 * Admin: Reject or set RERA status
 */
export const rejectOrUpdateReraStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { propertyId } = req.params;
    const { newStatus, notes } = req.body;

    const validStatuses: ReraStatus[] = ["pending", "exempt", "not_applicable"];
    const targetStatus: ReraStatus = validStatuses.includes(newStatus) ? newStatus : "pending";

    const property = await Property.findByPk(propertyId);
    if (!property) {
      res.status(404).json({ error: "Property not found" });
      return;
    }

    const previousStatus = property.reraStatus || "pending";
    property.reraStatus = targetStatus;
    property.reraVerifiedAt = undefined;

    await property.save();

    // Log audit
    await ReraVerificationAudit.create({
      propertyId: property.id,
      previousStatus,
      newStatus: targetStatus,
      adminId: req.user.id,
      authority: property.reraAuthority,
      officialUrl: property.reraRegistrationUrl,
      verificationMethod: "manual_admin_review",
      notes: notes || `RERA status updated to ${targetStatus}`,
      verifiedAt: null,
    });

    res.json({
      message: `Property RERA status updated to ${targetStatus}.`,
      property: {
        id: property.id,
        reraStatus: property.reraStatus,
        reraVerifiedAt: null,
      },
    });
  } catch (error) {
    console.error("Reject / Update RERA Status Error:", error);
    res.status(500).json({ error: "Error updating RERA status" });
  }
};
