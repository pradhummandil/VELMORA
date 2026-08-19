import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";
import { sequelize } from "./config/database";

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(async () => {
    console.log("📌 Database connection authenticated successfully!");
    await sequelize.sync();
    console.log("📌 Database synchronized successfully!");

    app.listen(PORT, () => {
      console.log(`🚀 VELMORA Backend running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Fatal Database connection error during startup:", error);
    process.exit(1);
  });

