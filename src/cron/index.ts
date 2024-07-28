import cron from "node-cron";
import logger from "../config/logger";
import env from "../config/env";

import { cleanupSessions } from "./sessionCleanup";
import { updateBookRankings } from "./bookRanking";
import { sendSubscriptionReminders } from "./subscriptionReminders";
import { generateReports } from "./reportGeneration";
import { syncExternalData } from "./externalSync";
import { performDatabaseMaintenance } from "./databaseMaintenance";

export function setupCronJobs() {
  if (!env.CRON_ENABLED) {
    logger.info("Cron jobs are disabled");
    return;
  }

  // Clean up expired sessions daily at 3:00 AM
  cron.schedule("0 3 * * *", () => {
    logger.info("Running session cleanup cron job");
    cleanupSessions();
  });

  // Update book rankings every hour
  cron.schedule("0 * * * *", () => {
    logger.info("Running book rankings update cron job");
    updateBookRankings();
  });

  // Send subscription reminders daily at 9:00 AM
  cron.schedule("0 9 * * *", () => {
    logger.info("Sending subscription reminders");
    sendSubscriptionReminders();
  });

  // Generate reports weekly on Monday at 1:00 AM
  cron.schedule("0 1 * * 1", () => {
    logger.info("Generating weekly reports");
    generateReports();
  });

  // Sync external data every 6 hours
  cron.schedule("0 */6 * * *", () => {
    logger.info("Syncing external data");
    syncExternalData();
  });

  // Perform database maintenance weekly on Sunday at 2:00 AM
  cron.schedule("0 2 * * 0", () => {
    logger.info("Performing database maintenance");
    performDatabaseMaintenance();
  });
}
