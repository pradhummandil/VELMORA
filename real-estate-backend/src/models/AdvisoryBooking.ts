import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./User";
import { Property } from "./Property";

export type AdvisoryType = "talk_to_advisor" | "investment_review" | "property_brief" | "private_tour";
export type AdvisoryStatus = "new" | "assigned" | "completed";

@Table({
  tableName: "advisory_bookings",
  timestamps: true,
  indexes: [
    { fields: ["userId"] },
    { fields: ["propertyId"] },
    { fields: ["status"] },
  ],
})
export class AdvisoryBooking extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @BelongsTo(() => User, "userId")
  user?: User;

  @ForeignKey(() => Property)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  propertyId?: number;

  @BelongsTo(() => Property, "propertyId")
  property?: Property;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "talk_to_advisor",
    validate: {
      isIn: [["talk_to_advisor", "investment_review", "property_brief", "private_tour"]],
    },
  })
  advisoryType!: AdvisoryType;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  budgetRange?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  timePreference?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "new",
    validate: {
      isIn: [["new", "assigned", "completed"]],
    },
  })
  status!: AdvisoryStatus;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  notes?: string;
}
