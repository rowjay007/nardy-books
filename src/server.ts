import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";

dotenv.config();

const mongoUri = process.env.MONGO_URI?.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD || ""
);

const env = process.env.NODE_ENV || "development";
const serverPort =
  env === "production" ? process.env.PROD_PORT : process.env.DEV_PORT;

const mongooseOptions = {
  useNewUrlParser: true,
} as mongoose.ConnectOptions;

mongoose
  .connect(mongoUri || "", mongooseOptions)
  .then(() => {
    console.log("✅ Connected to MongoDB 🚀");

    app.listen(serverPort, () => {
      console.log(`🚀 Server is listening on port ${serverPort}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error connecting to MongoDB:", error);

    // Add more robust error handling here, e.g., terminate the application or take appropriate action
    process.exit(1);
  });

process.on("unhandledRejection", (reason, promise) => {
  console.error("🔥 Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("💥 Uncaught Exception:", error);
  process.exit(1);
});
