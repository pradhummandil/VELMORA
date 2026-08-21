import { Request, Response } from "express";
import { Locality } from "../models/Locality";
import { PriceTrend } from "../models/PriceTrend";
import { Property } from "../models/Property";
import { Op } from "sequelize";

/**
 * Public: Get historical price trends for a locality with QoQ / YoY movement
 */
export const getPriceTrendsByLocality = async (req: Request, res: Response): Promise<void> => {
  try {
    const { localityId } = req.params;

    const locality = await Locality.findByPk(localityId);
    if (!locality) {
      res.status(404).json({ error: "Locality not found" });
      return;
    }

    const trends = await PriceTrend.findAll({
      where: { localityId },
      order: [["year", "ASC"], ["quarter", "ASC"]],
    });

    if (trends.length === 0) {
      res.json({
        localityId: locality.id,
        localityName: locality.name,
        available: false,
        message: "Historical market trend data is not available yet.",
        trends: [],
      });
      return;
    }

    // Calculate YoY / QoQ movement where chronological points exist
    const analyzedTrends = trends.map((trend, idx) => {
      let qoqChangePct: number | null = null;
      let yoyChangePct: number | null = null;

      if (idx > 0) {
        const prev = trends[idx - 1];
        const prevPrice = Number(prev.avgPriceSqft);
        const currPrice = Number(trend.avgPriceSqft);
        if (prevPrice > 0) {
          qoqChangePct = Number((((currPrice - prevPrice) / prevPrice) * 100).toFixed(2));
        }
      }

      // Find trend from same quarter in previous year
      const lastYearSameQuarter = trends.find(
        (t) => t.year === trend.year - 1 && t.quarter.toUpperCase() === trend.quarter.toUpperCase()
      );
      if (lastYearSameQuarter && Number(lastYearSameQuarter.avgPriceSqft) > 0) {
        const prevPrice = Number(lastYearSameQuarter.avgPriceSqft);
        const currPrice = Number(trend.avgPriceSqft);
        yoyChangePct = Number((((currPrice - prevPrice) / prevPrice) * 100).toFixed(2));
      }

      return {
        id: trend.id,
        year: trend.year,
        quarter: trend.quarter,
        avgPriceSqft: Number(trend.avgPriceSqft),
        rentalRangeMin: trend.rentalRangeMin ? Number(trend.rentalRangeMin) : null,
        rentalRangeMax: trend.rentalRangeMax ? Number(trend.rentalRangeMax) : null,
        source: trend.source || "verified_internal",
        qoqChangePct,
        yoyChangePct,
        period: `${trend.quarter.toUpperCase()} ${trend.year}`,
      };
    });

    const latest = analyzedTrends[analyzedTrends.length - 1];

    res.json({
      localityId: locality.id,
      localityName: locality.name,
      available: true,
      latestBenchmark: latest.avgPriceSqft,
      latestPeriod: latest.period,
      source: latest.source,
      trends: analyzedTrends,
    });
  } catch (error) {
    console.error("Get Price Trends Error:", error);
    res.status(500).json({ error: "Error fetching price trend analytics" });
  }
};

/**
 * Public: Get property price per sq.ft vs locality benchmark comparison
 */
export const getPropertyMarketComparison = async (req: Request, res: Response): Promise<void> => {
  try {
    const { propertyId } = req.params;

    const property = await Property.findByPk(propertyId);
    if (!property) {
      res.status(404).json({ error: "Property not found" });
      return;
    }

    // Determine property rate per sq.ft
    let propertyPriceSqft: number | null = property.pricePerSqft ? Number(property.pricePerSqft) : null;
    if (!propertyPriceSqft && property.price && property.area && Number(property.area) > 0) {
      propertyPriceSqft = Math.round(Number(property.price) / Number(property.area));
    }

    if (!propertyPriceSqft || propertyPriceSqft <= 0) {
      res.json({
        propertyId: property.id,
        benchmarkAvailable: false,
        message: "Property price per sq.ft is unavailable for comparison.",
      });
      return;
    }

    // Match locality
    let locality: Locality | null = null;
    if (property.locality) {
      locality = await Locality.findOne({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `%${property.locality.trim()}%` } },
            { slug: property.locality.toLowerCase().replace(/[^a-z0-9]+/g, "-") },
          ],
        },
      });
    }

    if (!locality && property.city) {
      locality = await Locality.findOne({
        where: {
          city: { [Op.iLike]: `%${property.city.trim()}%` },
        },
      });
    }

    if (!locality || !locality.avgPriceSqft || Number(locality.avgPriceSqft) <= 0) {
      res.json({
        propertyId: property.id,
        propertyPriceSqft,
        benchmarkAvailable: false,
        message: "Verified locality pricing benchmark is not available yet.",
      });
      return;
    }

    const localityBenchmark = Number(locality.avgPriceSqft);
    const variancePct = Number((((propertyPriceSqft - localityBenchmark) / localityBenchmark) * 100).toFixed(1));

    let comparativeNarrative = `Listed on par with the ${locality.name} locality benchmark.`;
    if (variancePct > 0.5) {
      comparativeNarrative = `Listed at ${variancePct}% above the ${locality.name} locality benchmark.`;
    } else if (variancePct < -0.5) {
      comparativeNarrative = `Listed at ${Math.abs(variancePct)}% below the ${locality.name} locality benchmark.`;
    }

    res.json({
      propertyId: property.id,
      propertyPriceSqft,
      localityId: locality.id,
      localityName: locality.name,
      localitySlug: locality.slug,
      localityBenchmark,
      variancePct,
      comparativeNarrative,
      benchmarkAvailable: true,
      lastUpdated: locality.updatedAt,
    });
  } catch (error) {
    console.error("Get Property Market Comparison Error:", error);
    res.status(500).json({ error: "Error calculating market benchmark comparison" });
  }
};
