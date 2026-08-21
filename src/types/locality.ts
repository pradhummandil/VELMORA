import { PropertyRecord } from "./property";

export interface LocalityPriceTrend {
  id: number;
  year: number;
  quarter: string;
  avgPriceSqft: number;
  rentalRangeMin?: number;
  rentalRangeMax?: number;
  source?: string;
  qoqChangePct?: number;
  yoyChangePct?: number;
  period: string;
}

export interface LocalityRecord {
  id: number;
  name: string;
  slug: string;
  city: string;
  state: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
  avgPriceSqft?: number;
  observedMinPriceSqft?: number;
  observedMaxPriceSqft?: number;
  rentalYield?: number;
  localityScore?: number;
  connectivityScore?: number;
  lifestyleScore?: number;
  schoolsCount?: number;
  hospitalsCount?: number;
  description?: string;
  highlights?: string[];
  priceTrends?: LocalityPriceTrend[];
  lastUpdated?: string;
}

export interface LocalityDetailResponse {
  locality: LocalityRecord;
  properties: PropertyRecord[];
}

export interface PropertyMarketComparison {
  propertyId: number;
  propertyPriceSqft: number;
  localityId?: number;
  localityName?: string;
  localitySlug?: string;
  localityBenchmark?: number;
  variancePct?: number;
  comparativeNarrative?: string;
  benchmarkAvailable: boolean;
  message?: string;
  lastUpdated?: string;
}
