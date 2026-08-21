"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("../models/User");
const Property_1 = require("../models/Property");
const Inquiry_1 = require("../models/Inquiry");
const ViewingRequest_1 = require("../models/ViewingRequest");
const Favorite_1 = require("../models/Favorite");
const Locality_1 = require("../models/Locality");
const SavedSearch_1 = require("../models/SavedSearch");
const AdvisoryBooking_1 = require("../models/AdvisoryBooking");
const PriceTrend_1 = require("../models/PriceTrend");
const CommuteRouteCache_1 = require("../models/CommuteRouteCache");
const LocationCache_1 = require("../models/LocationCache");
const ReraVerificationAudit_1 = require("../models/ReraVerificationAudit");
const ReraReport_1 = require("../models/ReraReport");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const databaseUrl = process.env.USE_SQLITE === "true" ? undefined : process.env.DATABASE_URL;
const models = [
    User_1.User,
    Property_1.Property,
    Inquiry_1.Inquiry,
    ViewingRequest_1.ViewingRequest,
    Favorite_1.Favorite,
    Locality_1.Locality,
    SavedSearch_1.SavedSearch,
    AdvisoryBooking_1.AdvisoryBooking,
    PriceTrend_1.PriceTrend,
    CommuteRouteCache_1.CommuteRouteCache,
    LocationCache_1.LocationCache,
    ReraVerificationAudit_1.ReraVerificationAudit,
    ReraReport_1.ReraReport,
];
exports.sequelize = databaseUrl
    ? new sequelize_typescript_1.Sequelize(databaseUrl, {
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
    : new sequelize_typescript_1.Sequelize({
        dialect: "sqlite",
        storage: process.env.DB_STORAGE || path_1.default.join(__dirname, "../../database.sqlite"),
        models,
        logging: false,
    });
