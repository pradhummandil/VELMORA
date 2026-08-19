import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

export const sequelize = databaseUrl
  ? new Sequelize(databaseUrl, {
      models: [User],
      dialect: "postgres",
      dialectOptions: process.env.NODE_ENV === "production" ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      } : {},
      logging: false,
    })
  : new Sequelize({
      dialect: "sqlite",
      storage: process.env.DB_STORAGE || path.join(__dirname, "../../database.sqlite"),
      models: [User],
      logging: false,
    });

