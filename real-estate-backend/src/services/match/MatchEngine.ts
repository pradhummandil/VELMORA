import { Property } from "../../models/Property";
import { Locality } from "../../models/Locality";
import { GoogleRouteProvider } from "../providers/GoogleRouteProvider";
import { RouteResult } from "../providers/RouteProvider";

export interface MatchWeights {
  budget: number;
  location: number;
  property: number;
  lifestyle: number;
  commute: number;
  trust: number;
  locality: number;
}

export const DEFAULT_WEIGHTS: MatchWeights = {
  budget: 0.20,
  location: 0.20,
  property: 0.15,
  lifestyle: 0.15,
  commute: 0.15,
  trust: 0.05,
  locality: 0.10,
};

export interface MatchCriteria {
  goal?: string;
  minBudget?: number;
  maxBudget?: number;
  city?: string;
  preferredLocalities?: string[];
  bhk?: string | number | (string | number)[];
  propertyTypes?: string[];
  workplace?: {
    address?: string;
    lat?: number;
    lng?: number;
  };
  maxCommuteMinutes?: number;
  commuteMode?: "driving" | "transit" | "walking" | "bicycling";
  priorities?: {
    connectivity?: number;
    schools?: number;
    healthcare?: number;
    lifestyle?: number;
    investment?: number;
  };
}

export interface ScoreBreakdown {
  budget: number;
  location: number;
  property: number;
  lifestyle: number;
  commute: number | null;
  trust: number;
  locality: number;
}

export interface ScoredPropertyMatch {
  property: Property;
  overallScore: number;
  scoreBreakdown: ScoreBreakdown;
  whyItMatches: string[];
  tradeoffs: string[];
  badge?: "Best Overall Match" | "Best Value" | "Best Commute" | "Best for Investment" | null;
  commuteResult?: RouteResult | null;
}

export class MatchEngine {
  private weights: MatchWeights;
  private routeProvider: GoogleRouteProvider;

  constructor(weights: MatchWeights = DEFAULT_WEIGHTS) {
    this.weights = weights;
    this.routeProvider = new GoogleRouteProvider();
  }

  /**
   * Score a candidate property against user match criteria
   */
  async scoreProperty(
    property: Property,
    locality: Locality | null,
    criteria: MatchCriteria
  ): Promise<ScoredPropertyMatch> {
    const whyItMatches: string[] = [];
    const tradeoffs: string[] = [];

    // 1. Budget Fit
    const budgetScore = this.calculateBudgetFit(property, criteria, whyItMatches, tradeoffs);

    // 2. Location Fit
    const locationScore = this.calculateLocationFit(property, criteria, whyItMatches, tradeoffs);

    // 3. Property Fit (BHK, Type, Purpose)
    const propertyScore = this.calculatePropertyFit(property, criteria, whyItMatches, tradeoffs);

    // 4. Lifestyle Fit
    const lifestyleScore = this.calculateLifestyleFit(property, locality, criteria, whyItMatches, tradeoffs);

    // 5. Trust Fit (RERA status)
    const trustScore = this.calculateTrustFit(property, whyItMatches, tradeoffs);

    // 6. Locality / Address Score
    const localityScore = this.calculateLocalityFit(property, locality);

    // 7. Commute Fit (Optional)
    let commuteScore: number | null = null;
    let commuteResult: RouteResult | null = null;

    if (criteria.workplace && (criteria.workplace.address || (criteria.workplace.lat && criteria.workplace.lng))) {
      const commuteData = await this.calculateCommuteFit(property, criteria);
      if (commuteData) {
        commuteScore = commuteData.score;
        commuteResult = commuteData.route;
        if (commuteData.reason) whyItMatches.push(commuteData.reason);
        if (commuteData.tradeoff) tradeoffs.push(commuteData.tradeoff);
      }
    }

    // Weighted Overall Score Calculation
    let totalWeight = 0;
    let weightedSum = 0;

    weightedSum += budgetScore * this.weights.budget;
    totalWeight += this.weights.budget;

    weightedSum += locationScore * this.weights.location;
    totalWeight += this.weights.location;

    weightedSum += propertyScore * this.weights.property;
    totalWeight += this.weights.property;

    weightedSum += lifestyleScore * this.weights.lifestyle;
    totalWeight += this.weights.lifestyle;

    weightedSum += trustScore * this.weights.trust;
    totalWeight += this.weights.trust;

    weightedSum += localityScore * this.weights.locality;
    totalWeight += this.weights.locality;

    if (commuteScore !== null) {
      weightedSum += commuteScore * this.weights.commute;
      totalWeight += this.weights.commute;
    }

    const overallScore = Math.min(100, Math.max(1, Math.round(weightedSum / totalWeight)));

    return {
      property,
      overallScore,
      scoreBreakdown: {
        budget: budgetScore,
        location: locationScore,
        property: propertyScore,
        lifestyle: lifestyleScore,
        commute: commuteScore,
        trust: trustScore,
        locality: localityScore,
      },
      whyItMatches: Array.from(new Set(whyItMatches)).slice(0, 5),
      tradeoffs: Array.from(new Set(tradeoffs)).slice(0, 4),
      badge: null,
      commuteResult,
    };
  }

  private calculateBudgetFit(
    property: Property,
    criteria: MatchCriteria,
    why: string[],
    tradeoffs: string[]
  ): number {
    const price = Number(property.price);
    if (!price || isNaN(price) || price <= 0) return 50;

    const min = criteria.minBudget || 0;
    const max = criteria.maxBudget || Infinity;

    if (price >= min && price <= max) {
      why.push(`Within your listed budget range`);
      return 100;
    }

    if (price < min && min > 0) {
      const diffPct = ((min - price) / min) * 100;
      if (diffPct <= 20) {
        why.push(`High value: ${diffPct.toFixed(0)}% below minimum budget`);
        return 95;
      }
      return Math.max(60, Math.round(90 - diffPct));
    }

    if (price > max && max < Infinity) {
      const diffPct = ((price - max) / max) * 100;
      if (diffPct <= 10) {
        tradeoffs.push(`Slightly above budget threshold (+${diffPct.toFixed(0)}%)`);
        return 75;
      }
      tradeoffs.push(`Exceeds maximum budget by ${diffPct.toFixed(0)}%`);
      return Math.max(10, Math.round(75 - diffPct * 1.2));
    }

    return 80;
  }

  private calculateLocationFit(
    property: Property,
    criteria: MatchCriteria,
    why: string[],
    tradeoffs: string[]
  ): number {
    const propertyLocality = (property.locality || "").toLowerCase().trim();
    const propertyCity = (property.city || "").toLowerCase().trim();
    const desiredCity = (criteria.city || "").toLowerCase().trim();

    const preferredLocalities = (criteria.preferredLocalities || []).map((l) => l.toLowerCase().trim());

    if (preferredLocalities.length > 0) {
      const matched = preferredLocalities.some(
        (pref) => propertyLocality.includes(pref) || pref.includes(propertyLocality)
      );
      if (matched) {
        why.push(`Located in preferred micro-market: ${property.locality}`);
        return 100;
      }
    }

    if (desiredCity && propertyCity.includes(desiredCity)) {
      why.push(`Situated in ${property.city}`);
      return 80;
    }

    tradeoffs.push(`Outside primary preferred micro-markets`);
    return 40;
  }

  private calculatePropertyFit(
    property: Property,
    criteria: MatchCriteria,
    why: string[],
    tradeoffs: string[]
  ): number {
    let score = 70;

    // BHK Fit
    if (criteria.bhk !== undefined && criteria.bhk !== null) {
      const desiredBhks = Array.isArray(criteria.bhk)
        ? criteria.bhk.map(String)
        : [String(criteria.bhk)];

      const propertyBhk = String(property.bedrooms || "").trim();

      if (desiredBhks.includes(propertyBhk)) {
        score += 20;
        why.push(`${property.bedrooms} BHK requested layout`);
      } else {
        score -= 15;
        tradeoffs.push(`${property.bedrooms || "Custom"} BHK layout vs ${desiredBhks.join("/")} BHK preference`);
      }
    }

    // Property Type Fit
    if (criteria.propertyTypes && criteria.propertyTypes.length > 0) {
      const propType = (property.propertyType || "").toLowerCase();
      const matches = criteria.propertyTypes.some((t) => propType.includes(t.toLowerCase()));
      if (matches) {
        score += 10;
      } else {
        score -= 10;
      }
    }

    return Math.min(100, Math.max(10, score));
  }

  private calculateLifestyleFit(
    property: Property,
    locality: Locality | null,
    criteria: MatchCriteria,
    why: string[],
    tradeoffs: string[]
  ): number {
    if (!criteria.priorities) return 75;

    const priorities = criteria.priorities;
    let points = 0;
    let count = 0;

    if (priorities.connectivity && priorities.connectivity >= 4) {
      const conn = locality?.connectivityScore || 70;
      points += conn;
      count++;
      if (conn >= 80) why.push(`Strong micro-market connectivity (${conn}/100)`);
    }

    if (priorities.schools && priorities.schools >= 4) {
      const schools = locality?.schoolsCount || 0;
      const schoolScore = schools > 5 ? 90 : schools > 0 ? 75 : 50;
      points += schoolScore;
      count++;
      if (schools > 5) why.push(`Proximity to ${schools} established schools`);
    }

    if (priorities.lifestyle && priorities.lifestyle >= 4) {
      const life = locality?.lifestyleScore || 70;
      points += life;
      count++;
    }

    if (priorities.healthcare && priorities.healthcare >= 4) {
      const hosp = locality?.hospitalsCount || 0;
      points += hosp > 3 ? 90 : hosp > 0 ? 75 : 50;
      count++;
    }

    if (count === 0) return 75;
    return Math.min(100, Math.max(20, Math.round(points / count)));
  }

  private calculateTrustFit(
    property: Property,
    why: string[],
    tradeoffs: string[]
  ): number {
    if (property.reraStatus === "verified") {
      why.push("✓ RERA Verified regulatory compliance");
      return 100;
    }
    if (property.reraStatus === "exempt" || property.reraStatus === "not_applicable") {
      return 85;
    }
    tradeoffs.push("RERA registration review pending");
    return 60;
  }

  private calculateLocalityFit(property: Property, locality: Locality | null): number {
    if (locality?.localityScore && locality.localityScore > 0) {
      return locality.localityScore;
    }
    if (property.addressScore && property.addressScore > 0) {
      return property.addressScore;
    }
    return 65;
  }

  private async calculateCommuteFit(
    property: Property,
    criteria: MatchCriteria
  ): Promise<{ score: number; route: RouteResult | null; reason?: string; tradeoff?: string } | null> {
    if (!criteria.workplace) return null;

    let origin: any = null;
    if (property.latitude && property.longitude) {
      origin = { lat: Number(property.latitude), lng: Number(property.longitude) };
    } else if (property.address || property.location) {
      origin = `${property.address || property.location}, ${property.city}`;
    }

    let destination: any = null;
    if (criteria.workplace.lat && criteria.workplace.lng) {
      destination = { lat: Number(criteria.workplace.lat), lng: Number(criteria.workplace.lng) };
    } else if (criteria.workplace.address) {
      destination = criteria.workplace.address;
    }

    if (!origin || !destination) return null;

    try {
      const route = await this.routeProvider.getRoute(
        origin,
        destination,
        criteria.commuteMode || "driving"
      );

      if (!route) return null;

      const duration = route.durationMinutes;
      const maxAllowed = criteria.maxCommuteMinutes || 45;

      let score = 70;
      let reason: string | undefined;
      let tradeoff: string | undefined;

      if (duration <= 20) {
        score = 100;
        reason = `Rapid ~${duration} min commute to ${criteria.workplace.address || "destination"}`;
      } else if (duration <= 30) {
        score = 85;
        reason = `Convenient ~${duration} min commute to destination`;
      } else if (duration <= maxAllowed) {
        score = 70;
        reason = `Within requested commute limit (~${duration} min)`;
      } else {
        const excess = duration - maxAllowed;
        score = Math.max(15, Math.round(65 - excess * 2));
        tradeoff = `Estimated commute of ~${duration} min exceeds ${maxAllowed} min preference`;
      }

      return { score, route, reason, tradeoff };
    } catch {
      return null;
    }
  }
}
