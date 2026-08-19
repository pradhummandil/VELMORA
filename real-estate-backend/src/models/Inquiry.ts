import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./User";
import { Property } from "./Property";

@Table({ tableName: "inquiries", timestamps: true })
export class Inquiry extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  propertyId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  propertyTitle!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  propertyLocation?: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @BelongsTo(() => User, "userId")
  user?: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  ownerId?: number;

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
    type: DataType.TEXT,
    allowNull: false,
  })
  message!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "new",
  })
  status!: "new" | "contacted" | "in_progress" | "closed";
}
