import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";
import { Property } from "../models/Property";
import { Inquiry } from "../models/Inquiry";
import { ViewingRequest } from "../models/ViewingRequest";
import { Favorite } from "../models/Favorite";
import { Locality } from "../models/Locality";
import { SavedSearch } from "../models/SavedSearch";
import { AdvisoryBooking } from "../models/AdvisoryBooking";
import { PriceTrend } from "../models/PriceTrend";
import { CommuteRouteCache } from "../models/CommuteRouteCache";
import { LocationCache } from "../models/LocationCache";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const databaseUrl = process.env.USE_SQLITE === "true" ? undefined : process.env.DATABASE_URL;

const models = [
  User,
  Property,
  Inquiry,
  ViewingRequest,
  Favorite,
  Locality,
  SavedSearch,
  AdvisoryBooking,
  PriceTrend,
  CommuteRouteCache,
  LocationCache,
];

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
