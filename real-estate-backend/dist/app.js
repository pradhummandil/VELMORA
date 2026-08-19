"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const protectedRoutes_1 = __importDefault(require("./routes/protectedRoutes"));
exports.app = (0, express_1.default)();
const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
    : ["http://localhost:3000", "http://127.0.0.1:3000", "https://velmora.in"];
exports.app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
            return callback(null, true);
        }
        return callback(new Error("CORS policy violation"));
    },
    credentials: true,
}));
exports.app.use(express_1.default.json());
// Public health check endpoint for Render and uptime monitoring
exports.app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        service: "velmora-api",
    });
});
// Application API routes
exports.app.use("/api/auth", authRoutes_1.default);
exports.app.use("/api", protectedRoutes_1.default);
