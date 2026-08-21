import { PropertyRecord } from "./property";

export interface MatchPriorities {
  connectivity?: number;
  schools?: number;
  healthcare?: number;
  lifestyle?: number;
  investment?: number;
}

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
  priorities?: MatchPriorities;
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
  property: PropertyRecord;
  overallScore: number;
  scoreBreakdown: ScoreBreakdown;
  whyItMatches: string[];
  tradeoffs: string[];
  badge?: "Best Overall Match" | "Best Value" | "Best Commute" | "Best for Investment" | string | null;
  commuteResult?: {
    distanceKm: number;
    durationMinutes: number;
    originAddress?: string;
    destinationAddress?: string;
    status: string;
  } | null;
}

export interface MatchResponse {
  count: number;
  matches: ScoredPropertyMatch[];
  message?: string;
}
