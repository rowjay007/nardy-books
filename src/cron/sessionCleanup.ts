import { SessionModel } from "../models/sessionModel";
import logger from "../config/logger";

export async function cleanupSessions() {
  const now = new Date();
  logger.info(`Starting session cleanup at ${now.toISOString()}`);

  try {
    const result = await SessionModel.deleteMany({
      expiresAt: { $lt: now },
    });
    logger.info(`Cleaned up ${result.deletedCount} expired sessions`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Error cleaning up sessions:", error.message);
    } else {
      logger.error("Unknown error cleaning up sessions");
    }
  }
}
