"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = require("./app");
const database_1 = require("./config/database");
const PORT = process.env.PORT || 5000;
database_1.sequelize
    .authenticate()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("📌 Database connection authenticated successfully!");
    yield database_1.sequelize.sync();
    console.log("📌 Database synchronized successfully!");
    app_1.app.listen(PORT, () => {
        console.log(`🚀 VELMORA Backend running on port ${PORT}`);
    });
}))
    .catch((error) => {
    console.error("❌ Fatal Database connection error during startup:", error);
    process.exit(1);
});
