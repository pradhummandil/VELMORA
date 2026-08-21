import { Response } from "express";
import { SavedSearch, SearchAlertFrequency } from "../models/SavedSearch";
import { AuthRequest } from "../middleware/authMiddleware";

/**
 * User: Get all saved searches for authenticated user
 */
export const getSavedSearches = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const searches = await SavedSearch.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    res.json({
      count: searches.length,
      searches,
    });
  } catch (error) {
    console.error("Get Saved Searches Error:", error);
    res.status(500).json({ error: "Error fetching saved searches" });
  }
};

/**
 * User: Get a single saved search
 */
export const getSavedSearchById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { id } = req.params;
    const search = await SavedSearch.findOne({
      where: { id, userId: req.user.id },
    });

    if (!search) {
      res.status(404).json({ error: "Saved search not found" });
      return;
    }

    res.json({ search });
  } catch (error) {
    console.error("Get Saved Search Detail Error:", error);
    res.status(500).json({ error: "Error fetching saved search details" });
  }
};

/**
 * User: Create a new saved search
 */
export const createSavedSearch = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { name, criteria, alertEnabled = false, frequency = "daily" } = req.body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      res.status(400).json({ error: "Search name is required" });
      return;
    }

    const validFrequencies: SearchAlertFrequency[] = ["instant", "daily", "weekly"];
    const resolvedFrequency = validFrequencies.includes(frequency) ? frequency : "daily";

    const savedSearch = await SavedSearch.create({
      userId: req.user.id,
      name: name.trim(),
      criteria: criteria || {},
      alertEnabled: Boolean(alertEnabled),
      frequency: resolvedFrequency,
    });

    res.status(201).json({
      message: "Search preference saved successfully",
      savedSearch,
    });
  } catch (error) {
    console.error("Create Saved Search Error:", error);
    res.status(500).json({ error: "Error saving search" });
  }
};

/**
 * User: Update an existing saved search
 */
export const updateSavedSearch = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { id } = req.params;
    const { name, criteria, alertEnabled, frequency } = req.body;

    const search = await SavedSearch.findOne({
      where: { id, userId: req.user.id },
    });

    if (!search) {
      res.status(404).json({ error: "Saved search not found" });
      return;
    }

    const updatePayload: any = {};
    if (name !== undefined) updatePayload.name = String(name).trim();
    if (criteria !== undefined) updatePayload.criteria = criteria;
    if (alertEnabled !== undefined) updatePayload.alertEnabled = Boolean(alertEnabled);
    if (frequency !== undefined) {
      const validFrequencies: SearchAlertFrequency[] = ["instant", "daily", "weekly"];
      if (validFrequencies.includes(frequency)) {
        updatePayload.frequency = frequency;
      }
    }

    await search.update(updatePayload);

    res.json({
      message: "Saved search updated successfully",
      savedSearch: search,
    });
  } catch (error) {
    console.error("Update Saved Search Error:", error);
    res.status(500).json({ error: "Error updating saved search" });
  }
};

/**
 * User: Delete a saved search
 */
export const deleteSavedSearch = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { id } = req.params;
    const search = await SavedSearch.findOne({
      where: { id, userId: req.user.id },
    });

    if (!search) {
      res.status(404).json({ error: "Saved search not found" });
      return;
    }

    await search.destroy();

    res.json({ message: "Saved search deleted successfully" });
  } catch (error) {
    console.error("Delete Saved Search Error:", error);
    res.status(500).json({ error: "Error deleting saved search" });
  }
};
