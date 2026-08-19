import express, { Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import protectedRoutes from "./routes/protectedRoutes";
import propertyRoutes from "./routes/propertyRoutes";
import inquiryRoutes from "./routes/inquiryRoutes";
import viewingRoutes from "./routes/viewingRoutes";
import favoriteRoutes from "./routes/favoriteRoutes";

export const app = express();

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://velmora.in",
      "https://velmora-house.vercel.app",
    ];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
        return callback(null, true);
      }
      return callback(new Error("CORS policy violation"));
    },
    credentials: true,
  })
);

app.use(express.json());

// Public health check endpoint for Render and uptime monitoring
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    service: "velmora-api",
  });
});

// Application API routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/viewings", viewingRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api", protectedRoutes);
