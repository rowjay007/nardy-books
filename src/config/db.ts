import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import env from "./env";
import logger from "./logger";

let mongoServer: MongoMemoryServer | null = null;

const connectDB = async () => {
  if (process.env.NODE_ENV === "test") {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri);
  } else {
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
  }
};

const closeDB = async () => {
  if (process.env.NODE_ENV === "test" && mongoServer !== null) {
    await mongoose.disconnect();
    await mongoServer.stop();
  } else {
    await mongoose.disconnect();
  }
};

export { connectDB, closeDB };
