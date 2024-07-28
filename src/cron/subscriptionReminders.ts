import User from "../models/userModel";
import { sendEmail } from "../utils/emailUtils";
import logger from "../config/logger";
import { addDays } from "date-fns";

export async function sendSubscriptionReminders() {
  try {
    const expirationDate = addDays(new Date(), 7);
    const users = await User.find({
      "subscription.expiresAt": { $lt: expirationDate, $gte: new Date() },
    });

    for (const user of users) {
      if (user.subscription && user.subscription.expiresAt) {
        await sendEmail({
          to: user.email,
          subject: "Your subscription is expiring soon",
          text: `Dear ${user.name}, your subscription will expire on ${user.subscription.expiresAt}. Please renew to continue enjoying our services.`,
        });
      }
    }
    logger.info(`Sent subscription reminders to ${users.length} users`);
  } catch (error) {
    logger.error("Error sending subscription reminders:", error);
  }
}
