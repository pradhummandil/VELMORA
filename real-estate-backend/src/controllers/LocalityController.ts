import { Request, Response } from "express";
import { Locality } from "../models/Locality";
import { PriceTrend } from "../models/PriceTrend";
import { Property } from "../models/Property";
import { Op } from "sequelize";
import { AuthRequest } from "../middleware/authMiddleware";

/**
 * Public: Get list of active localities
 */
export const getLocalities = async (req: Request, res: Response): Promise<void> => {
  try {
    const { city, search } = req.query;
    const where: any = {};

    if (city && typeof city === "string" && city.trim().length > 0) {
      where.city = { [Op.iLike]: `%${city.trim()}%` };
    }

    if (search && typeof search === "string" && search.trim().length > 0) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search.trim()}%` } },
        { city: { [Op.iLike]: `%${search.trim()}%` } },
      ];
    }

    const localities = await Locality.findAll({
      where,
      order: [["name", "ASC"]],
    });

    // Compute active properties count for each locality
    const results = await Promise.all(
      localities.map(async (loc) => {
        const propertyCount = await Property.count({
          where: {
            [Op.or]: [
              { locality: { [Op.iLike]: `%${loc.name}%` } },
              { location: { [Op.iLike]: `%${loc.name}%` } },
            ],
          },
        });

        return {
          id: loc.id,
          name: loc.name,
          slug: loc.slug,
          city: loc.city,
          state: loc.state,
          latitude: loc.latitude,
          longitude: loc.longitude,
          avgPriceSqft: loc.avgPriceSqft ? Number(loc.avgPriceSqft) : null,
          rentalYield: loc.rentalYield ? Number(loc.rentalYield) : null,
          localityScore: loc.localityScore || null,
          connectivityScore: loc.connectivityScore || null,
          lifestyleScore: loc.lifestyleScore || null,
          schoolsCount: loc.schoolsCount || null,
          hospitalsCount: loc.hospitalsCount || null,
          activePropertiesCount: propertyCount,
        };
      })
    );

    res.json({
      count: results.length,
      localities: results,
    });
  } catch (error) {
    console.error("Get Localities Error:", error);
    res.status(500).json({ error: "Error fetching localities" });
  }
};

/**
 * Public: Get single locality by slug with price trends and real active properties
 */
export const getLocalityBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;

    const locality = await Locality.findOne({
      where: {
        [Op.or]: [
          { slug: slug.toLowerCase() },
          { name: { [Op.iLike]: slug.replace(/-/g, " ") } },
        ],
      },
      include: [
        {
          model: PriceTrend,
          as: "priceTrends",
          required: false,
        },
      ],
      order: [[{ model: PriceTrend, as: "priceTrends" }, "year", "ASC"], [{ model: PriceTrend, as: "priceTrends" }, "quarter", "ASC"]],
    });

    if (!locality) {
      res.status(404).json({ error: "Locality not found" });
      return;
    }

    // Fetch active properties in this locality
    const properties = await Property.findAll({
      where: {
        [Op.or]: [
          { locality: { [Op.iLike]: `%${locality.name}%` } },
          { location: { [Op.iLike]: `%${locality.name}%` } },
        ],
      },
      order: [["createdAt", "DESC"]],
      limit: 20,
    });

    // Calculate actual observed property pricing metrics if properties exist
    const pricesWithArea = properties
      .map((p) => {
        if (p.pricePerSqft && p.pricePerSqft > 0) return Number(p.pricePerSqft);
        if (p.price && p.area && p.area > 0) return Math.round(Number(p.price) / Number(p.area));
        return null;
      })
      .filter((v): v is number => v !== null && v > 0);

    const observedMinPriceSqft = pricesWithArea.length > 0 ? Math.min(...pricesWithArea) : null;
    const observedMaxPriceSqft = pricesWithArea.length > 0 ? Math.max(...pricesWithArea) : null;
    const observedAvgPriceSqft =
      pricesWithArea.length > 0
        ? Math.round(pricesWithArea.reduce((a, b) => a + b, 0) / pricesWithArea.length)
        : null;

    res.json({
      locality: {
        id: locality.id,
        name: locality.name,
        slug: locality.slug,
        city: locality.city,
        state: locality.state,
        pincode: locality.pincode,
        latitude: locality.latitude,
        longitude: locality.longitude,
        avgPriceSqft: locality.avgPriceSqft ? Number(locality.avgPriceSqft) : observedAvgPriceSqft,
        observedMinPriceSqft,
        observedMaxPriceSqft,
        rentalYield: locality.rentalYield ? Number(locality.rentalYield) : null,
        localityScore: locality.localityScore || null,
        connectivityScore: locality.connectivityScore || null,
        lifestyleScore: locality.lifestyleScore || null,
        schoolsCount: locality.schoolsCount || null,
        hospitalsCount: locality.hospitalsCount || null,
        description: locality.description || null,
        highlights: locality.highlights || [],
        priceTrends: locality.priceTrends || [],
        lastUpdated: locality.updatedAt,
      },
      properties,
    });
  } catch (error) {
    console.error("Get Locality By Slug Error:", error);
    res.status(500).json({ error: "Error fetching locality intelligence" });
  }
};

/**
 * Admin: Create or update a locality
 */
export const createOrUpdateLocality = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!data.name || !data.city) {
      res.status(400).json({ error: "Locality name and city are required." });
      return;
    }

    const slug = data.slug || `${data.name}-${data.city}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    let locality: Locality | null = null;
    if (id) {
      locality = await Locality.findByPk(id);
    }

    if (locality) {
      await locality.update({
        ...data,
        slug,
      });
    } else {
      locality = await Locality.create({
        ...data,
        slug,
      });
    }

    res.json({
      message: "Locality record saved successfully.",
      locality,
    });
  } catch (error) {
    console.error("Save Locality Error:", error);
    res.status(500).json({ error: "Error saving locality record" });
  }
};
