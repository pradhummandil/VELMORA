import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./User";

@Table({
  tableName: "favorites",
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ["userId", "propertyId"],
    },
  ],
})
export class Favorite extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @BelongsTo(() => User, "userId")
  user?: User;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  propertyId!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue("propertyData");
      if (!rawValue) return null;
      try {
        return typeof rawValue === "string" ? JSON.parse(rawValue) : rawValue;
      } catch {
        return null;
      }
    },
    set(val: any) {
      this.setDataValue("propertyData", val ? JSON.stringify(val) : null);
    },
  })
  propertyData?: any;
}
