import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "location_cache",
  timestamps: true,
  indexes: [
    { unique: true, fields: ["queryKey"] },
    { fields: ["placeId"] },
    { fields: ["expiresAt"] },
  ],
})
export class LocationCache extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  queryKey!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "google",
  })
  provider!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  formattedAddress!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  placeId?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  locality?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  city?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  district?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  state?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: "India",
  })
  country?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  pincode?: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  latitude!: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  longitude!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue("rawComponents");
      if (!rawValue) return null;
      try {
        return typeof rawValue === "string" ? JSON.parse(rawValue) : rawValue;
      } catch {
        return null;
      }
    },
    set(val: any) {
      this.setDataValue("rawComponents", val ? JSON.stringify(val) : null);
    },
  })
  rawComponents?: any;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expiresAt!: Date;
}
