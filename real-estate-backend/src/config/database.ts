import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../../database.sqlite"),
  models: [User],
  logging: false, // Disable SQL logging for cleaner output
});
