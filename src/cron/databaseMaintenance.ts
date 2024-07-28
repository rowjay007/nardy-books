import mongoose from "mongoose";
import logger from "../config/logger";

export async function performDatabaseMaintenance() {
  try {
    await mongoose.connection.db.command({ compact: "books" });
      await mongoose.connection.db.command({ compact: "users" });
      await mongoose.connection.db.command({ repairDatabase: 1 });


    logger.info("Database maintenance completed successfully");
  } catch (error) {
    logger.error("Error performing database maintenance:", error);
  }
}
