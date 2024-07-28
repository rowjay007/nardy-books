import { SessionModel } from "../models/sessionModel";
import logger from "../config/logger";

export async function cleanupSessions() {
  try {
    const result = await SessionModel.deleteMany({
      expiresAt: { $lt: new Date() },
    });
    logger.info(`Cleaned up ${result.deletedCount} expired sessions`);
  } catch (error) {
    logger.error("Error cleaning up sessions:", error);
  }
}
