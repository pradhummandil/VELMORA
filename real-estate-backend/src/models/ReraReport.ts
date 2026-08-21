import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Property } from "./Property";

@Table({
  tableName: "rera_reports",
  timestamps: true,
  indexes: [
    { fields: ["propertyId"] },
    { fields: ["status"] },
  ],
})
export class ReraReport extends Model {
  @ForeignKey(() => Property)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  propertyId!: number;

  @BelongsTo(() => Property)
  property?: Property;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  reporterName?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  reporterEmail?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "incorrect_rera_number",
  })
  issueType!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  details!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "pending_review",
  })
  status!: string;
}
