import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";
import { Property } from "../models/Property";
import { Inquiry } from "../models/Inquiry";
import { ViewingRequest } from "../models/ViewingRequest";
import { Favorite } from "../models/Favorite";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const databaseUrl = process.env.USE_SQLITE === "true" ? undefined : process.env.DATABASE_URL;

const models = [User, Property, Inquiry, ViewingRequest, Favorite];

export const sequelize = databaseUrl
  ? new Sequelize(databaseUrl, {
      models,
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
      models,
      logging: false,
    });
