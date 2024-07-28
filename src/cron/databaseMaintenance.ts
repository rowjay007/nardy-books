import mongoose from "mongoose";
import logger from "../config/logger";

export async function performDatabaseMaintenance() {
  try {
    const maintenanceTasks = [
      mongoose.connection.db.command({ compact: "books" }),
      mongoose.connection.db.command({ compact: "users" }),
      mongoose.connection.db.command({ repairDatabase: 1 }),
    ];

    await Promise.all(maintenanceTasks);

    logger.info("Database maintenance completed successfully");
  } catch (error) {
    logger.error("Error performing database maintenance:", error);
  }
}
