import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./User";

export type SearchAlertFrequency = "instant" | "daily" | "weekly";

@Table({
  tableName: "saved_searches",
  timestamps: true,
  indexes: [
    { fields: ["userId"] },
    { fields: ["alertEnabled"] },
  ],
})
export class SavedSearch extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @BelongsTo(() => User, "userId")
  user?: User;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue("criteria");
      if (!rawValue) return {};
      try {
        return typeof rawValue === "string" ? JSON.parse(rawValue) : rawValue;
      } catch {
        return {};
      }
    },
    set(val: Record<string, any>) {
      this.setDataValue("criteria", val ? JSON.stringify(val) : "{}");
    },
  })
  criteria!: Record<string, any>;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  alertEnabled!: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "daily",
    validate: {
      isIn: [["instant", "daily", "weekly"]],
    },
  })
  frequency!: SearchAlertFrequency;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  lastNotifiedAt?: Date;
}
