import express, { Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import protectedRoutes from "./routes/protectedRoutes";

export const app = express();

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : ["http://localhost:3000", "http://127.0.0.1:3000", "https://velmora.in"];

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
app.use("/api", protectedRoutes);

