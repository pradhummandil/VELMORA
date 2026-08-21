import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Property } from "./Property";
import { User } from "./User";

@Table({
  tableName: "rera_verification_audits",
  timestamps: true,
  indexes: [
    { fields: ["propertyId"] },
    { fields: ["adminId"] },
  ],
})
export class ReraVerificationAudit extends Model {
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
    allowNull: false,
  })
  previousStatus!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  newStatus!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  adminId?: number;

  @BelongsTo(() => User)
  admin?: User;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  authority?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  officialUrl?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "manual_admin_review",
  })
  verificationMethod!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  notes?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  verifiedAt?: Date;
}
