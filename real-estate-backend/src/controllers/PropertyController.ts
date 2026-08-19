import { Response } from "express";
import { Op } from "sequelize";
import { Property } from "../models/Property";
import { User } from "../models/User";
import { AuthRequest } from "../middleware/authMiddleware";

export const createProperty = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const {
      title,
      description,
      price,
      location,
      city,
      address,
      propertyType,
      status,
      bedrooms,
      bathrooms,
      area,
      amenities,
      images,
      agentId,
    } = req.body;

    if (!title || !price || !location) {
      res.status(400).json({ error: "Title, price, and location are required." });
      return;
    }

    const property = await Property.create({
      title,
      description,
      price: Number(price),
      location,
      city: city || location.split(",").pop()?.trim() || "Mumbai",
      address,
      propertyType: propertyType || "Apartment",
      status: status || "For Sale",
      bedrooms: bedrooms ? String(bedrooms) : undefined,
      bathrooms: bathrooms ? String(bathrooms) : undefined,
      area: area ? Number(area) : undefined,
      amenities: Array.isArray(amenities) ? amenities : [],
      images: Array.isArray(images) ? images : [],
      ownerId: req.user.id,
      agentId: agentId ? Number(agentId) : undefined,
    });

    // 📌 Business Rule: Auto-promote 'user' to 'property_owner' upon successful property creation
    const user = await User.findByPk(req.user.id);
    let promoted = false;
    if (user && user.role === "user") {
      user.role = "property_owner";
      await user.save();
      promoted = true;
    }

    res.status(201).json({
      message: "Property created successfully!",
      property,
      userRole: user?.role || "property_owner",
      roleUpdated: promoted,
    });
  } catch (error) {
    console.error("Create Property Error:", error);
    res.status(500).json({ error: "Error creating property listing" });
  }
};

export const getAllProperties = async (req: any, res: Response): Promise<void> => {
  try {
    const { city, location, propertyType, minPrice, maxPrice, search, limit = 50, page = 1 } = req.query;

    const whereClause: any = {};

    if (city) {
      whereClause.city = { [Op.iLike]: `%${city}%` };
    }

    if (location) {
      whereClause[Op.or] = [
        { location: { [Op.iLike]: `%${location}%` } },
        { city: { [Op.iLike]: `%${location}%` } },
        { address: { [Op.iLike]: `%${location}%` } },
      ];
    }

    if (propertyType && propertyType !== "all") {
      whereClause.propertyType = propertyType;
    }

    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price[Op.gte] = Number(minPrice);
      if (maxPrice) whereClause.price[Op.lte] = Number(maxPrice);
    }

    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { location: { [Op.iLike]: `%${search}%` } },
        { city: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows } = await Property.findAndCountAll({
      where: whereClause,
      limit: Number(limit),
      offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["id", "name", "email", "phoneNumber"],
        },
        {
          model: User,
          as: "agent",
          attributes: ["id", "name", "email", "phoneNumber"],
        },
      ],
    });

    res.json({
      total: count,
      page: Number(page),
      totalPages: Math.ceil(count / Number(limit)),
      properties: rows,
    });
  } catch (error) {
    console.error("Get Properties Error:", error);
    res.status(500).json({ error: "Error fetching properties" });
  }
};

export const getPropertyById = async (req: any, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id, {
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["id", "name", "email", "phoneNumber", "about"],
        },
        {
          model: User,
          as: "agent",
          attributes: ["id", "name", "email", "phoneNumber", "about"],
        },
      ],
    });

    if (!property) {
      res.status(404).json({ error: "Property not found" });
      return;
    }

    res.json(property);
  } catch (error) {
    console.error("Get Property By ID Error:", error);
    res.status(500).json({ error: "Error fetching property details" });
  }
};

export const getMyListings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const userId = req.user.id;
    const properties = await Property.findAll({
      where: {
        [Op.or]: [{ ownerId: userId }, { agentId: userId }],
      },
      order: [["createdAt", "DESC"]],
    });

    res.json(properties);
  } catch (error) {
    console.error("Get My Listings Error:", error);
    res.status(500).json({ error: "Error fetching your listings" });
  }
};

export const updateProperty = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { id } = req.params;
    const property = await Property.findByPk(id);

    if (!property) {
      res.status(404).json({ error: "Property not found" });
      return;
    }

    const user = await User.findByPk(req.user.id);
    const isOwner = property.ownerId === req.user.id;
    const isAssignedAgent = property.agentId === req.user.id;
    const isAdmin = user?.role === "admin";

    if (!isOwner && !isAssignedAgent && !isAdmin) {
      res.status(403).json({ error: "You are not authorized to update this property." });
      return;
    }

    const updatableFields = [
      "title",
      "description",
      "price",
      "location",
      "city",
      "address",
      "propertyType",
      "status",
      "bedrooms",
      "bathrooms",
      "area",
      "amenities",
      "images",
    ];

    const updatePayload: any = {};
    for (const field of updatableFields) {
      if (req.body[field] !== undefined) {
        updatePayload[field] = req.body[field];
      }
    }

    await property.update(updatePayload);

    res.json({ message: "Property updated successfully", property });
  } catch (error) {
    console.error("Update Property Error:", error);
    res.status(500).json({ error: "Error updating property" });
  }
};

export const deleteProperty = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { id } = req.params;
    const property = await Property.findByPk(id);

    if (!property) {
      res.status(404).json({ error: "Property not found" });
      return;
    }

    const user = await User.findByPk(req.user.id);
    const isOwner = property.ownerId === req.user.id;
    const isAdmin = user?.role === "admin";

    if (!isOwner && !isAdmin) {
      res.status(403).json({ error: "You are not authorized to delete this property." });
      return;
    }

    await property.destroy();

    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Delete Property Error:", error);
    res.status(500).json({ error: "Error deleting property" });
  }
};
