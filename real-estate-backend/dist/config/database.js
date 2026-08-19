"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("../models/User");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const databaseUrl = process.env.USE_SQLITE === "true" ? undefined : process.env.DATABASE_URL;
exports.sequelize = databaseUrl
    ? new sequelize_typescript_1.Sequelize(databaseUrl, {
        models: [User_1.User],
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
        models: [User_1.User],
        logging: false,
    });
