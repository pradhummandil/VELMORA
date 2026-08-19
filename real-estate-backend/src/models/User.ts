import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Property } from "./Property";
import { Inquiry } from "./Inquiry";
import { ViewingRequest } from "./ViewingRequest";
import { Favorite } from "./Favorite";

@Table({ tableName: "users", timestamps: true })
export class User extends Model {
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
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  termsAccepted!: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "user",
  })
  role!: "user" | "agent" | "property_owner" | "admin";

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  firstName?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastName?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phoneNumber?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  about?: string;

  @HasMany(() => Property, "ownerId")
  ownedProperties?: Property[];

  @HasMany(() => Inquiry, "userId")
  inquiries?: Inquiry[];

  @HasMany(() => ViewingRequest, "userId")
  viewingRequests?: ViewingRequest[];

  @HasMany(() => Favorite, "userId")
  favorites?: Favorite[];
}
