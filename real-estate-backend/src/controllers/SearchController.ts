import { Request, Response } from "express";
import { Op } from "sequelize";
import { Property } from "../models/Property";
import { User } from "../models/User";

export const searchProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      north,
      south,
      east,
      west,
      city,
      locality,
      query,
      search,
      purpose,
      listingPurpose,
      minPrice,
      maxPrice,
      bhk,
      bedrooms,
      propertyType,
      reraOnly,
      minScore,
      sortBy = "newest",
      page = 1,
      limit = 20,
    } = req.query;

    const parsedPage = Math.max(1, Number(page) || 1);
    const parsedLimit = Math.min(50, Math.max(1, Number(limit) || 20));
    const offset = (parsedPage - 1) * parsedLimit;

    const whereClause: any = {};

    // 1. Geographic Viewport Bounds
    let hasViewport = false;
    let boundsCenter: { lat: number; lng: number } | null = null;

    if (north !== undefined && south !== undefined && east !== undefined && west !== undefined) {
      const n = Number(north);
      const s = Number(south);
      const e = Number(east);
      const w = Number(west);

      if (isNaN(n) || isNaN(s) || isNaN(e) || isNaN(w)) {
        res.status(400).json({ error: "Viewport coordinates (north, south, east, west) must be valid numbers." });
        return;
      }

      if (s > n || s < -90 || n > 90 || w < -180 || e > 180) {
        res.status(400).json({ error: "Invalid viewport boundaries." });
        return;
      }

      hasViewport = true;
      boundsCenter = {
        lat: Number(((n + s) / 2).toFixed(6)),
        lng: Number(((e + w) / 2).toFixed(6)),
      };

      if (w <= e) {
        whereClause[Op.and] = [
          ...(whereClause[Op.and] || []),
          { latitude: { [Op.between]: [s, n] } },
          { longitude: { [Op.between]: [w, e] } },
        ];
      } else {
        // Antimeridian crossing
        whereClause[Op.and] = [
          ...(whereClause[Op.and] || []),
          { latitude: { [Op.between]: [s, n] } },
          {
            [Op.or]: [
              { longitude: { [Op.gte]: w } },
              { longitude: { [Op.lte]: e } },
            ],
          },
        ];
      }
    }

    // 2. City & Locality Filters
    if (city && typeof city === "string" && city.trim() && city.toLowerCase() !== "all") {
      whereClause.city = { [Op.iLike]: `%${city.trim()}%` };
    }

    if (locality && typeof locality === "string" && locality.trim() && locality.toLowerCase() !== "all") {
      whereClause.locality = { [Op.iLike]: `%${locality.trim()}%` };
    }

    // 3. Text Query Search
    const searchText = (query || search) as string | undefined;
    if (searchText && typeof searchText === "string" && searchText.trim()) {
      const cleanSearch = searchText.trim();
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${cleanSearch}%` } },
        { location: { [Op.iLike]: `%${cleanSearch}%` } },
        { locality: { [Op.iLike]: `%${cleanSearch}%` } },
        { city: { [Op.iLike]: `%${cleanSearch}%` } },
        { address: { [Op.iLike]: `%${cleanSearch}%` } },
        { state: { [Op.iLike]: `%${cleanSearch}%` } },
        { pincode: { [Op.iLike]: `%${cleanSearch}%` } },
        { developer: { [Op.iLike]: `%${cleanSearch}%` } },
        { description: { [Op.iLike]: `%${cleanSearch}%` } },
      ];
    }

    // 4. Listing Purpose (Buy, Rent, Commercial, Investment)
    const activePurpose = (purpose || listingPurpose) as string | undefined;
    if (activePurpose && activePurpose.toLowerCase() !== "all") {
      whereClause.listingPurpose = activePurpose.toLowerCase();
    }

    // 5. Price Range
    if (minPrice !== undefined || maxPrice !== undefined) {
      const pMin = minPrice ? Math.max(0, Number(minPrice)) : undefined;
      const pMax = maxPrice ? Math.max(0, Number(maxPrice)) : undefined;

      if ((pMin && isNaN(pMin)) || (pMax && isNaN(pMax))) {
        res.status(400).json({ error: "minPrice and maxPrice must be valid numbers." });
        return;
      }

      whereClause.price = {};
      if (pMin !== undefined) whereClause.price[Op.gte] = pMin;
      if (pMax !== undefined) whereClause.price[Op.lte] = pMax;
    }

    // 6. BHK / Bedrooms
    const activeBhk = (bhk || bedrooms) as string | undefined;
    if (activeBhk && activeBhk.toLowerCase() !== "all") {
      if (activeBhk.includes("+") || activeBhk === "5") {
        const minBhk = parseInt(activeBhk, 10) || 4;
        whereClause.bedrooms = { [Op.gte]: String(minBhk) };
      } else {
        whereClause.bedrooms = String(activeBhk);
      }
    }

    // 7. Property Type
    if (propertyType && typeof propertyType === "string" && propertyType.toLowerCase() !== "all") {
      whereClause.propertyType = { [Op.iLike]: `%${propertyType.trim()}%` };
    }

    // 8. RERA Verification Only
    if (reraOnly === "true" || reraOnly === "1") {
      whereClause.reraStatus = "verified";
    }

    // 9. Minimum Address Score
    if (minScore !== undefined && !isNaN(Number(minScore))) {
      whereClause.addressScore = { [Op.gte]: Math.max(0, Number(minScore)) };
    }

    // 10. Sorting
    let order: any = [["createdAt", "DESC"]];
    if (sortBy === "price_asc") {
      order = [["price", "ASC"]];
    } else if (sortBy === "price_desc") {
      order = [["price", "DESC"]];
    } else if (sortBy === "score_desc") {
      order = [["addressScore", "DESC"], ["createdAt", "DESC"]];
    }

    const { count, rows } = await Property.findAndCountAll({
      where: whereClause,
      limit: parsedLimit,
      offset,
      order,
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
        "reraStatus",
        "reraAuthority",
        "constructionStatus",
        "possessionStatus",
        "addressScore",
        "scoreBreakdown",
        "verifiedBadges",
        "createdAt",
      ],
      include: [
        {
          model: User,
          as: "agent",
          attributes: ["id", "name", "phoneNumber"],
        },
      ],
    });

    // Extract lightweight markers for map
    const markers = rows
      .filter((p) => p.latitude !== null && p.longitude !== null && !isNaN(Number(p.latitude)) && !isNaN(Number(p.longitude)))
      .map((p) => ({
        id: p.id,
        title: p.title,
        price: Number(p.price),
        latitude: Number(p.latitude),
        longitude: Number(p.longitude),
        listingPurpose: p.listingPurpose,
        propertyType: p.propertyType,
        bedrooms: p.bedrooms,
        addressScore: p.addressScore,
        reraStatus: p.reraStatus,
        locality: p.locality,
        city: p.city,
        thumb: Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : null,
      }));

    res.json({
      total: count,
      page: parsedPage,
      totalPages: Math.ceil(count / parsedLimit),
      hasViewport,
      boundsCenter: boundsCenter || (markers.length > 0 ? { lat: markers[0].latitude, lng: markers[0].longitude } : { lat: 19.015, lng: 72.815 }),
      properties: rows,
      markers,
    });
  } catch (error) {
    console.error("Property Search Error:", error);
    res.status(500).json({ error: "Error executing property search" });
  }
};
