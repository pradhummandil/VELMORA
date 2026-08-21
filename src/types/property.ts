export interface PropertyScoreBreakdown {
  connectivity?: number;
  schools?: number;
  healthcare?: number;
  lifestyle?: number;
  investment?: number;
  [key: string]: any;
}

export interface PropertyRecord {
  id: number;
  title: string;
  description?: string;
  price: number;
  pricePerSqft?: number;
  listingPurpose: "buy" | "rent" | "commercial" | "investment" | string;
  propertyType: string;
  status?: string;
  bedrooms?: string | number;
  bathrooms?: string | number;
  area?: number;
  floor?: number;
  totalFloors?: number;
  parking?: string;
  furnishing?: string;
  location: string;
  locality?: string;
  city: string;
  state?: string;
  address?: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
  amenities?: string[];
  images?: string[];
  developer?: string;
  projectId?: string;
  reraNumber?: string;
  reraStatus: "pending" | "verified" | "exempt" | "not_applicable" | string;
  reraAuthority?: string;
  reraRegistrationUrl?: string;
  reraVerifiedAt?: string;
  constructionStatus?: "ready_to_move" | "under_construction" | "new_launch" | string;
  possessionStatus?: string;
  addressScore: number;
  scoreBreakdown?: PropertyScoreBreakdown;
  verifiedBadges?: string[];
  ownerId?: number;
  agentId?: number;
  agencyId?: number;
  agent?: {
    id: number;
    name: string;
    phoneNumber?: string;
    about?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
