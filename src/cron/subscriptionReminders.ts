import { addDays } from "date-fns";
import logger from "../config/logger";
import User from "../models/userModel";
import { sendEmail } from "../utils/emailUtils";

export async function sendSubscriptionReminders() {
  try {
    const expirationDate = addDays(new Date(), 7);
    const users = await User.find({
      "subscription.expiresAt": { $lt: expirationDate, $gte: new Date() },
    });

    for (const user of users) {
      if (user.subscription && user.subscription.expiresAt) {
        try {
          await sendEmail({
            to: user.email,
            subject: "Your subscription is expiring soon",
            text: `Dear ${user.name}, your subscription will expire on ${user.subscription.expiresAt}. Please renew to continue enjoying our services.`,
          });
        } catch (emailError) {
          if (emailError instanceof Error) {
            logger.error(
              `Error sending email to ${user.email}: ${emailError.message}`
            );
          } else {
            logger.error(
              `Unexpected error sending email to ${user.email}: ${String(
                emailError
              )}`
            );
          }
        }
      }
    }
    logger.info(`Sent subscription reminders to ${users.length} users`);
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error sending subscription reminders:", error.message);
    } else {
      logger.error(
        "Unexpected error sending subscription reminders:",
        String(error)
      );
    }
  }
}
