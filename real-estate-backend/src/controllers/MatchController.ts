import { Request, Response } from "express";
import { Property } from "../models/Property";
import { Locality } from "../models/Locality";
import { MatchEngine, MatchCriteria, ScoredPropertyMatch } from "../services/match/MatchEngine";
import { Op } from "sequelize";

/**
 * Public/User: Calculate deterministic property matches based on multi-factor preferences
 */
export const calculateMatches = async (req: Request, res: Response): Promise<void> => {
  try {
    const criteria: MatchCriteria = req.body || {};

    // 1. Build server-side candidate query to limit memory load
    const where: any = {};

    if (criteria.goal && typeof criteria.goal === "string" && criteria.goal !== "all") {
      where.listingPurpose = { [Op.iLike]: `%${criteria.goal.trim()}%` };
    }

    if (criteria.city && typeof criteria.city === "string" && criteria.city.trim().length > 0) {
      where.city = { [Op.iLike]: `%${criteria.city.trim()}%` };
    }

    // Maximum 25 candidate properties to score and rank
    const candidates = await Property.findAll({
      where,
      order: [["createdAt", "DESC"]],
      limit: 25,
    });

    if (candidates.length === 0) {
      res.json({
        count: 0,
        matches: [],
        message: "No residences match your initial criteria. Try broadening your budget or location parameters.",
      });
      return;
    }

    // 2. Fetch localities for candidates in a single batch
    const candidateLocalities = Array.from(
      new Set(candidates.map((p) => p.locality).filter((l): l is string => Boolean(l)))
    );

    const localityRecords = await Locality.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.in]: candidateLocalities } },
          { slug: { [Op.in]: candidateLocalities.map((l) => l.toLowerCase().replace(/[^a-z0-9]+/g, "-")) } },
        ],
      },
    });

    const localityMap = new Map<string, Locality>();
    for (const loc of localityRecords) {
      localityMap.set(loc.name.toLowerCase(), loc);
      localityMap.set(loc.slug.toLowerCase(), loc);
    }

    // 3. Score candidates using MatchEngine
    const matchEngine = new MatchEngine();
    const scoredMatches: ScoredPropertyMatch[] = [];

    for (const property of candidates) {
      const locKey = (property.locality || "").toLowerCase().trim();
      const locality = localityMap.get(locKey) || null;

      const scored = await matchEngine.scoreProperty(property, locality, criteria);
      scoredMatches.push(scored);
    }

    // 4. Sort by overallScore DESC
    scoredMatches.sort((a, b) => b.overallScore - a.overallScore);

    // 5. Assign badges to top matches
    if (scoredMatches.length > 0 && scoredMatches[0].overallScore >= 75) {
      scoredMatches[0].badge = "Best Overall Match";
    }

    // Identify Best Commute if commute factor was active
    const commuteMatches = scoredMatches.filter(
      (m) => m.commuteResult && m.commuteResult.durationMinutes && m.commuteResult.durationMinutes > 0
    );
    if (commuteMatches.length > 0) {
      commuteMatches.sort(
        (a, b) => (a.commuteResult?.durationMinutes || 999) - (b.commuteResult?.durationMinutes || 999)
      );
      if (commuteMatches[0] !== scoredMatches[0]) {
        commuteMatches[0].badge = "Best Commute";
      }
    }

    // Identify Best Value (lowest pricePerSqft among top 5)
    const topCandidates = scoredMatches.slice(0, 5);
    const valueCandidate = topCandidates
      .filter((m) => m.property.pricePerSqft && Number(m.property.pricePerSqft) > 0)
      .sort((a, b) => Number(a.property.pricePerSqft) - Number(b.property.pricePerSqft))[0];

    if (valueCandidate && !valueCandidate.badge) {
      valueCandidate.badge = "Best Value";
    }

    res.json({
      count: scoredMatches.length,
      matches: scoredMatches,
    });
  } catch (error) {
    console.error("Calculate Matches Error:", error);
    res.status(500).json({ error: "Error calculating property matches" });
  }
};
