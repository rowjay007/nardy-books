import { SessionModel } from "../models/sessionModel";
import logger from "../config/logger";

export const deleteExpiredSessions = async (): Promise<void> => {
  try {
    const now = new Date();
    const result = await SessionModel.deleteMany({ expiresAt: { $lt: now } });
    logger.info(`Deleted ${result.deletedCount} expired sessions`);
  } catch (error) {
    logger.error("Failed to delete expired sessions", error);
    throw new Error("Failed to delete expired sessions");
  }
};
