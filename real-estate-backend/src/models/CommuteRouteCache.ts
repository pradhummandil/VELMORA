import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "commute_routes_cache",
  timestamps: true,
  indexes: [
    { fields: ["originHash"] },
    { fields: ["destinationHash"] },
    { fields: ["cachedUntil"] },
  ],
})
export class CommuteRouteCache extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  originHash!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  destinationHash!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  originAddress!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  destinationAddress!: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  distanceKm!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  durationMinutes!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "driving",
  })
  transitMode!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  cachedUntil!: Date;
}
