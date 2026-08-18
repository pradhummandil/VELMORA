import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "users" })
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
}
