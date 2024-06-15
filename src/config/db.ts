import mongoose from "mongoose";
import env from "./env";
import logger from "./logger";

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI, {
    });
    logger.info("MongoDB connected successfully");
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error connecting to MongoDB: ${error.message}`);
    } else {
      logger.error("Error connecting to MongoDB: An unknown error occurred");
    }
    process.exit(1);
  }
};

export default connectDB;
