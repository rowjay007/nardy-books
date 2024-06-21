import dotenv from "dotenv";

dotenv.config();

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || "",
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/nardy-books",
  JWT_SECRET: process.env.JWT_SECRET || "",
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
  PAYSTACK_TEST_SECRET_KEY: process.env.PAYSTACK_TEST_SECRET_KEY || "",
  FLUTTERWAVE_TEST_SECRET_KEY: process.env.FLUTTERWAVE_TEST_SECRET_KEY || "",
};

export default env;

