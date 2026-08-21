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
const propertyRoutes_1 = __importDefault(require("./routes/propertyRoutes"));
const inquiryRoutes_1 = __importDefault(require("./routes/inquiryRoutes"));
const viewingRoutes_1 = __importDefault(require("./routes/viewingRoutes"));
const favoriteRoutes_1 = __importDefault(require("./routes/favoriteRoutes"));
const locationRoutes_1 = __importDefault(require("./routes/locationRoutes"));
const searchRoutes_1 = __importDefault(require("./routes/searchRoutes"));
const reraRoutes_1 = __importDefault(require("./routes/reraRoutes"));
const adminReraRoutes_1 = __importDefault(require("./routes/adminReraRoutes"));
const marketRoutes_1 = __importDefault(require("./routes/marketRoutes"));
const savedSearchRoutes_1 = __importDefault(require("./routes/savedSearchRoutes"));
exports.app = (0, express_1.default)();
const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
    : [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://velmora.in",
        "https://velmora-house.vercel.app",
    ];
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
exports.app.use("/api/locations", locationRoutes_1.default);
exports.app.use("/api/market", marketRoutes_1.default);
exports.app.use("/api/search", searchRoutes_1.default);
exports.app.use("/api/rera", reraRoutes_1.default);
exports.app.use("/api/admin/rera", adminReraRoutes_1.default);
exports.app.use("/api/properties", propertyRoutes_1.default);
exports.app.use("/api/inquiries", inquiryRoutes_1.default);
exports.app.use("/api/viewings", viewingRoutes_1.default);
exports.app.use("/api/favorites", favoriteRoutes_1.default);
exports.app.use("/api/saved-searches", savedSearchRoutes_1.default);
exports.app.use("/api", protectedRoutes_1.default);
