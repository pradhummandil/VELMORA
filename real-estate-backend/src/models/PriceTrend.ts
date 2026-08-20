import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Locality } from "./Locality";

@Table({
  tableName: "price_trends",
  timestamps: true,
  indexes: [
    { fields: ["localityId"] },
    { fields: ["year", "quarter"] },
  ],
})
export class PriceTrend extends Model {
  @ForeignKey(() => Locality)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  localityId!: number;

  @BelongsTo(() => Locality, "localityId")
  locality?: Locality;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  quarter!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  year!: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  avgPriceSqft!: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  rentalRangeMin?: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  rentalRangeMax?: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  source?: string;
}
