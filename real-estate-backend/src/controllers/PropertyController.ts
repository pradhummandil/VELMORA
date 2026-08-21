import { Request, Response } from "express";
import { Op } from "sequelize";
import { Property, ListingPurpose, ReraStatus, ConstructionStatus } from "../models/Property";
import { Locality } from "../models/Locality";
import { User } from "../models/User";
import { AuthRequest } from "../middleware/authMiddleware";
import { LocationService } from "../services/LocationService";

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
      pricePerSqft,
      listingPurpose = "buy",
      location,
      locality,
      city,
      state,
      address,
      pincode,
      latitude,
      longitude,
      placeId,
      propertyType,
      status,
      bedrooms,
      bathrooms,
      area,
      floor,
      totalFloors,
      parking,
      furnishing,
      amenities,
      images,
      developer,
      projectId,
      reraNumber,
      reraStatus = "pending",
      reraAuthority,
      reraRegistrationUrl,
      constructionStatus = "ready_to_move",
      possessionStatus,
      agentId,
      agencyId,
    } = req.body;

    if (!title || !price || !location) {
      res.status(400).json({ error: "Title, price, and location are required." });
      return;
    }

    // Validate listing purpose
    const validPurposes: ListingPurpose[] = ["buy", "rent", "commercial", "investment"];
    const resolvedPurpose: ListingPurpose = validPurposes.includes(listingPurpose) ? listingPurpose : "buy";

    // Validate RERA status
    const validReraStatuses: ReraStatus[] = ["pending", "verified", "exempt", "not_applicable"];
    const resolvedReraStatus: ReraStatus = validReraStatuses.includes(reraStatus) ? reraStatus : "pending";

    // Validate Construction status
    const validConstructionStatuses: ConstructionStatus[] = ["ready_to_move", "under_construction", "new_launch"];
    const resolvedConstructionStatus: ConstructionStatus = validConstructionStatuses.includes(constructionStatus)
      ? constructionStatus
      : "ready_to_move";

    // Calculate pricePerSqft if missing and area is available
    const parsedPrice = Number(price);
    const parsedArea = area ? Number(area) : undefined;
    let resolvedPricePerSqft = pricePerSqft ? Number(pricePerSqft) : undefined;
    if (!resolvedPricePerSqft && parsedArea && parsedArea > 0 && parsedPrice > 0) {
      resolvedPricePerSqft = Math.round(parsedPrice / parsedArea);
    }

    // Location normalization & server-side geocoding
    let resolvedLat = latitude !== undefined && latitude !== null ? Number(latitude) : undefined;
    let resolvedLng = longitude !== undefined && longitude !== null ? Number(longitude) : undefined;
    let resolvedLocality = locality ? String(locality).trim() : undefined;
    let resolvedCity = city ? String(city).trim() : location.split(",").pop()?.trim() || "Mumbai";
    let resolvedState = state ? String(state).trim() : undefined;
    let resolvedPincode = pincode ? String(pincode).trim() : undefined;

    try {
      const normalized = await LocationService.normalizeAndGeocode({
        address: address ? String(address).trim() : undefined,
        locality: resolvedLocality,
        city: resolvedCity,
        state: resolvedState,
        pincode: resolvedPincode,
        placeId: placeId ? String(placeId).trim() : undefined,
      });

      if (normalized) {
        if (resolvedLat === undefined || isNaN(resolvedLat)) resolvedLat = normalized.latitude;
        if (resolvedLng === undefined || isNaN(resolvedLng)) resolvedLng = normalized.longitude;
        if (!resolvedLocality && normalized.locality) resolvedLocality = normalized.locality;
        if (!resolvedCity && normalized.city) resolvedCity = normalized.city;
        if (!resolvedState && normalized.state) resolvedState = normalized.state;
        if (!resolvedPincode && normalized.pincode) resolvedPincode = normalized.pincode;
      }
    } catch (normErr: any) {
      console.warn("Location normalization notice on create:", normErr.message);
    }

    const property = await Property.create({
      title: String(title).trim(),
      description: description ? String(description).trim() : undefined,
      price: parsedPrice,
      pricePerSqft: resolvedPricePerSqft,
      listingPurpose: resolvedPurpose,
      location: String(location).trim(),
      locality: resolvedLocality,
      city: resolvedCity,
      state: resolvedState,
      address: address ? String(address).trim() : undefined,
      pincode: resolvedPincode,
      latitude: resolvedLat,
      longitude: resolvedLng,
      propertyType: propertyType ? String(propertyType).trim() : "Apartment",
      status: status ? String(status).trim() : "For Sale",
      bedrooms: bedrooms !== undefined && bedrooms !== null ? String(bedrooms) : undefined,
      bathrooms: bathrooms !== undefined && bathrooms !== null ? String(bathrooms) : undefined,
      area: parsedArea,
      floor: floor !== undefined && floor !== null ? Number(floor) : undefined,
      totalFloors: totalFloors !== undefined && totalFloors !== null ? Number(totalFloors) : undefined,
      parking: parking ? String(parking).trim() : undefined,
      furnishing: furnishing ? String(furnishing).trim() : undefined,
      amenities: Array.isArray(amenities) ? amenities : [],
      images: Array.isArray(images) ? images : [],
      developer: developer ? String(developer).trim() : undefined,
      projectId: projectId ? String(projectId).trim() : undefined,
      reraNumber: reraNumber ? String(reraNumber).trim() : undefined,
      reraStatus: resolvedReraStatus,
      reraAuthority: reraAuthority ? String(reraAuthority).trim() : undefined,
      reraRegistrationUrl: reraRegistrationUrl ? String(reraRegistrationUrl).trim() : undefined,
      constructionStatus: resolvedConstructionStatus,
      possessionStatus: possessionStatus ? String(possessionStatus).trim() : undefined,
      addressScore: 0,
      scoreBreakdown: {},
      verifiedBadges: [],
      ownerId: req.user.id,
      agentId: agentId ? Number(agentId) : undefined,
      agencyId: agencyId ? Number(agencyId) : undefined,
    });

    // Auto-promote 'user' to 'property_owner' upon successful property creation
    const user = await User.findByPk(req.user.id);
    let promoted = false;
    if (user && user.role === "user") {
      user.role = "property_owner";
      await user.save();
      promoted = true;
    }

    // Evaluate active saved search notifications asynchronously
    const { SavedSearchMatcher } = await import("../services/notification/SavedSearchMatcher");
    SavedSearchMatcher.evaluateNewProperty(property).catch((e) =>
      console.warn("SavedSearch matching notice:", e.message)
    );

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
    const {
      city,
      locality,
      location,
      propertyType,
      listingPurpose,
      bedrooms,
      reraStatus,
      constructionStatus,
      minPrice,
      maxPrice,
      minScore,
      search,
      limit = 50,
      page = 1,
    } = req.query;

    const whereClause: any = {};

    if (city) {
      whereClause.city = { [Op.iLike]: `%${city}%` };
    }

    if (locality) {
      whereClause.locality = { [Op.iLike]: `%${locality}%` };
    }

    if (location) {
      whereClause[Op.or] = [
        { location: { [Op.iLike]: `%${location}%` } },
        { locality: { [Op.iLike]: `%${location}%` } },
        { city: { [Op.iLike]: `%${location}%` } },
        { address: { [Op.iLike]: `%${location}%` } },
      ];
    }

    if (propertyType && propertyType !== "all") {
      whereClause.propertyType = propertyType;
    }

    if (listingPurpose && listingPurpose !== "all") {
      whereClause.listingPurpose = listingPurpose;
    }

    if (bedrooms && bedrooms !== "all") {
      whereClause.bedrooms = String(bedrooms);
    }

    if (reraStatus && reraStatus !== "all") {
      whereClause.reraStatus = reraStatus;
    }

    if (constructionStatus && constructionStatus !== "all") {
      whereClause.constructionStatus = constructionStatus;
    }

    if (minScore) {
      whereClause.addressScore = { [Op.gte]: Number(minScore) };
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
        { locality: { [Op.iLike]: `%${search}%` } },
        { city: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
        { developer: { [Op.iLike]: `%${search}%` } },
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
          attributes: ["id", "name"],
        },
        {
          model: User,
          as: "agent",
          attributes: ["id", "name", "phoneNumber", "about"],
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
      "pricePerSqft",
      "listingPurpose",
      "location",
      "locality",
      "city",
      "state",
      "address",
      "pincode",
      "latitude",
      "longitude",
      "propertyType",
      "status",
      "bedrooms",
      "bathrooms",
      "area",
      "floor",
      "totalFloors",
      "parking",
      "furnishing",
      "amenities",
      "images",
      "developer",
      "projectId",
      "reraNumber",
      "reraAuthority",
      "reraRegistrationUrl",
      "constructionStatus",
      "possessionStatus",
      "agentId",
      "agencyId",
    ];

    const adminOnlyFields = ["reraStatus", "reraVerifiedAt", "addressScore", "scoreBreakdown", "verifiedBadges"];

    const updatePayload: any = {};
    for (const field of updatableFields) {
      if (req.body[field] !== undefined) {
        updatePayload[field] = req.body[field];
      }
    }

    if (isAdmin) {
      for (const field of adminOnlyFields) {
        if (req.body[field] !== undefined) {
          updatePayload[field] = req.body[field];
        }
      }
    }

    // Auto update pricePerSqft if price and area change and pricePerSqft is not explicitly sent
    const newPrice = updatePayload.price !== undefined ? Number(updatePayload.price) : property.price;
    const newArea = updatePayload.area !== undefined ? Number(updatePayload.area) : property.area;
    if (updatePayload.pricePerSqft === undefined && newPrice && newArea && newArea > 0) {
      updatePayload.pricePerSqft = Math.round(newPrice / newArea);
    }

    // Only re-geocode if address/locality/pincode/city actually changed
    const addressChanged =
      (updatePayload.address !== undefined && updatePayload.address !== property.address) ||
      (updatePayload.locality !== undefined && updatePayload.locality !== property.locality) ||
      (updatePayload.city !== undefined && updatePayload.city !== property.city) ||
      (updatePayload.pincode !== undefined && updatePayload.pincode !== property.pincode) ||
      req.body.placeId;

    if (addressChanged && updatePayload.latitude === undefined && updatePayload.longitude === undefined) {
      try {
        const normalized = await LocationService.normalizeAndGeocode({
          address: updatePayload.address || property.address,
          locality: updatePayload.locality || property.locality,
          city: updatePayload.city || property.city,
          state: updatePayload.state || property.state,
          pincode: updatePayload.pincode || property.pincode,
          placeId: req.body.placeId,
        });

        if (normalized) {
          updatePayload.latitude = normalized.latitude;
          updatePayload.longitude = normalized.longitude;
          if (!updatePayload.locality && normalized.locality) updatePayload.locality = normalized.locality;
          if (!updatePayload.city && normalized.city) updatePayload.city = normalized.city;
          if (!updatePayload.state && normalized.state) updatePayload.state = normalized.state;
          if (!updatePayload.pincode && normalized.pincode) updatePayload.pincode = normalized.pincode;
        }
      } catch (normErr: any) {
        console.warn("Location normalization notice on update:", normErr.message);
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

/**
 * Public: Compare up to 4 properties by ID with decision intelligence metrics
 */
export const compareProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.query;

    if (!ids) {
      res.status(400).json({ error: "Property IDs are required for comparison (e.g. ?ids=1,2,3)" });
      return;
    }

    let parsedIds: number[] = [];
    if (typeof ids === "string") {
      parsedIds = ids
        .split(",")
        .map((s) => Number(s.trim()))
        .filter((n) => !isNaN(n) && n > 0);
    } else if (Array.isArray(ids)) {
      parsedIds = ids
        .map((s) => Number(String(s).trim()))
        .filter((n) => !isNaN(n) && n > 0);
    }

    // Deduplicate and limit to maximum 4 properties
    const uniqueIds = Array.from(new Set(parsedIds)).slice(0, 4);

    if (uniqueIds.length === 0) {
      res.status(400).json({ error: "No valid property IDs provided for comparison." });
      return;
    }

    const properties = await Property.findAll({
      where: { id: { [Op.in]: uniqueIds } },
      attributes: [
        "id",
        "title",
        "description",
        "price",
        "pricePerSqft",
        "listingPurpose",
        "location",
        "locality",
        "city",
        "state",
        "address",
        "pincode",
        "propertyType",
        "bedrooms",
        "bathrooms",
        "area",
        "floor",
        "totalFloors",
        "parking",
        "furnishing",
        "amenities",
        "images",
        "developer",
        "projectId",
        "reraNumber",
        "reraStatus",
        "reraAuthority",
        "reraRegistrationUrl",
        "reraVerifiedAt",
        "constructionStatus",
        "possessionStatus",
        "addressScore",
        "scoreBreakdown",
        "latitude",
        "longitude",
      ],
    });

    // Preserve requested ordering
    const orderedProperties = uniqueIds
      .map((id) => properties.find((p) => p.id === id))
      .filter((p): p is Property => Boolean(p));

    // Fetch localities for price benchmarks and living indices
    const localityNames = orderedProperties
      .map((p) => p.locality)
      .filter((l): l is string => Boolean(l));

    const localities = localityNames.length > 0
      ? await Locality.findAll({
          where: {
            name: { [Op.in]: localityNames },
          },
        })
      : [];

    const localityMap = new Map<string, Locality>();
    for (const loc of localities) {
      localityMap.set(loc.name.toLowerCase(), loc);
    }

    // Evaluate smart comparison decision badges
    let bestValueId: number | null = null;
    let lowestRate = Infinity;

    let bestAddressId: number | null = null;
    let highestAddressScore = -1;

    let bestLifestyleId: number | null = null;
    let highestLifestyle = -1;

    for (const p of orderedProperties) {
      const rate =
        p.pricePerSqft && Number(p.pricePerSqft) > 0
          ? Number(p.pricePerSqft)
          : p.price && p.area && Number(p.area) > 0
          ? Math.round(Number(p.price) / Number(p.area))
          : null;

      if (rate && rate < lowestRate) {
        lowestRate = rate;
        bestValueId = p.id;
      }

      if (p.addressScore && p.addressScore > highestAddressScore) {
        highestAddressScore = p.addressScore;
        bestAddressId = p.id;
      }

      const loc = localityMap.get((p.locality || "").toLowerCase());
      const lifeScore = loc?.lifestyleScore || loc?.connectivityScore || 0;
      if (lifeScore > highestLifestyle && lifeScore >= 75) {
        highestLifestyle = lifeScore;
        bestLifestyleId = p.id;
      }
    }

    const comparativeResults = orderedProperties.map((p) => {
      const loc = localityMap.get((p.locality || "").toLowerCase());
      const calculatedRate =
        p.pricePerSqft && Number(p.pricePerSqft) > 0
          ? Number(p.pricePerSqft)
          : p.price && p.area && Number(p.area) > 0
          ? Math.round(Number(p.price) / Number(p.area))
          : null;

      let decisionBadge: string | null = null;
      if (p.id === bestValueId && lowestRate < Infinity) {
        decisionBadge = "Best Value";
      } else if (p.id === bestAddressId && highestAddressScore >= 70) {
        decisionBadge = "Best Address";
      } else if (p.id === bestLifestyleId && highestLifestyle >= 75) {
        decisionBadge = "Best Lifestyle";
      }

      return {
        ...p.toJSON(),
        pricePerSqft: calculatedRate,
        localityData: loc
          ? {
              name: loc.name,
              avgPriceSqft: loc.avgPriceSqft ? Number(loc.avgPriceSqft) : null,
              rentalYield: loc.rentalYield ? Number(loc.rentalYield) : null,
              connectivityScore: loc.connectivityScore || null,
              lifestyleScore: loc.lifestyleScore || null,
              schoolsCount: loc.schoolsCount || null,
              hospitalsCount: loc.hospitalsCount || null,
            }
          : null,
        decisionBadge,
      };
    });

    res.json({
      count: comparativeResults.length,
      properties: comparativeResults,
    });
  } catch (error) {
    console.error("Compare Properties Error:", error);
    res.status(500).json({ error: "Error comparing properties" });
  }
};

