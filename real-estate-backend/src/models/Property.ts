import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { User } from "./User";
import { Inquiry } from "./Inquiry";
import { ViewingRequest } from "./ViewingRequest";
import { Favorite } from "./Favorite";
import { AdvisoryBooking } from "./AdvisoryBooking";

export type ListingPurpose = "buy" | "rent" | "commercial" | "investment";
export type ReraStatus = "pending" | "verified" | "exempt" | "not_applicable";
export type ConstructionStatus = "ready_to_move" | "under_construction" | "new_launch";

@Table({ tableName: "properties", timestamps: true })
export class Property extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description?: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  pricePerSqft?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "buy",
    validate: {
      isIn: [["buy", "rent", "commercial", "investment"]],
    },
  })
  listingPurpose!: ListingPurpose;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  locality?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "Mumbai",
  })
  city!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  state?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  pincode?: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
  })
  latitude?: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
  })
  longitude?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "Apartment",
  })
  propertyType!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "For Sale",
  })
  status!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bedrooms?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bathrooms?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  area?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  floor?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  totalFloors?: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  parking?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  furnishing?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue("amenities");
      if (!rawValue) return [];
      try {
        return typeof rawValue === "string" ? JSON.parse(rawValue) : rawValue;
      } catch {
        return [];
      }
    },
    set(val: string[] | null) {
      this.setDataValue("amenities", val ? JSON.stringify(val) : null);
    },
  })
  amenities?: string[];

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue("images");
      if (!rawValue) return [];
      try {
        return typeof rawValue === "string" ? JSON.parse(rawValue) : rawValue;
      } catch {
        return [];
      }
    },
    set(val: string[] | null) {
      this.setDataValue("images", val ? JSON.stringify(val) : null);
    },
  })
  images?: string[];

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  ownerId!: number;

  @BelongsTo(() => User, "ownerId")
  owner?: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  agentId?: number;

  @BelongsTo(() => User, "agentId")
  agent?: User;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  agencyId?: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  developer?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  projectId?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  reraNumber?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "pending",
    validate: {
      isIn: [["pending", "verified", "exempt", "not_applicable"]],
    },
  })
  reraStatus!: ReraStatus;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  reraAuthority?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  reraRegistrationUrl?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  reraVerifiedAt?: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "ready_to_move",
    validate: {
      isIn: [["ready_to_move", "under_construction", "new_launch"]],
    },
  })
  constructionStatus!: ConstructionStatus;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  possessionStatus?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  addressScore!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue("scoreBreakdown");
      if (!rawValue) return {};
      try {
        return typeof rawValue === "string" ? JSON.parse(rawValue) : rawValue;
      } catch {
        return {};
      }
    },
    set(val: Record<string, any> | null) {
      this.setDataValue("scoreBreakdown", val ? JSON.stringify(val) : null);
    },
  })
  scoreBreakdown?: Record<string, any>;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue("verifiedBadges");
      if (!rawValue) return [];
      try {
        return typeof rawValue === "string" ? JSON.parse(rawValue) : rawValue;
      } catch {
        return [];
      }
    },
    set(val: string[] | null) {
      this.setDataValue("verifiedBadges", val ? JSON.stringify(val) : null);
    },
  })
  verifiedBadges?: string[];

  @HasMany(() => Inquiry, "propertyId")
  inquiries?: Inquiry[];

  @HasMany(() => ViewingRequest, "propertyId")
  viewingRequests?: ViewingRequest[];

  @HasMany(() => Favorite, "propertyId")
  favorites?: Favorite[];

  @HasMany(() => AdvisoryBooking, "propertyId")
  advisoryBookings?: AdvisoryBooking[];
}
