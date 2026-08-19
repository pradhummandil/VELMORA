import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./User";

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
    type: DataType.STRING,
    allowNull: false,
  })
  location!: string;

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
  address?: string;

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
}
