import dotenv from "dotenv";

dotenv.config();

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || "",
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/nardy-books",
  JWT_SECRET: process.env.JWT_SECRET || "",
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
};

export default env;
