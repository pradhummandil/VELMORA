import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { PriceTrend } from "./PriceTrend";

@Table({
  tableName: "localities",
  timestamps: true,
  indexes: [
    { unique: true, fields: ["slug"] },
    { fields: ["city"] },
    { fields: ["name"] },
    { fields: ["pincode"] },
  ],
})
export class Locality extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  slug!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "Maharashtra",
  })
  state!: string;

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
    type: DataType.BIGINT,
    allowNull: true,
  })
  avgPriceSqft?: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  rentalYield?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  localityScore?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  connectivityScore?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  lifestyleScore?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  schoolsCount?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  hospitalsCount?: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue("highlights");
      if (!rawValue) return [];
      try {
        return typeof rawValue === "string" ? JSON.parse(rawValue) : rawValue;
      } catch {
        return [];
      }
    },
    set(val: string[] | null) {
      this.setDataValue("highlights", val ? JSON.stringify(val) : null);
    },
  })
  highlights?: string[];

  @HasMany(() => PriceTrend, "localityId")
  priceTrends?: PriceTrend[];
}
