import app from "./app";
import {connectDB} from "./config/db";
import env from "./config/env";
import logger from "./config/logger";
import Sentry from "./config/sentry";

const PORT = env.PORT || 3000;

connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      logger.info(`Server running in ${env.NODE_ENV} mode on port ${PORT}`);
    });

    process.on("SIGINT", () => {
      logger.info("SIGINT received: Shutting down gracefully");
      server.close(() => {
        logger.info("Server closed");
        process.exit(0);
      });
    });

    process.on("unhandledRejection", (err: any) => {
      Sentry.captureException(err);
      logger.error(`Unhandled Rejection: ${err.message}`);
      server.close(() => process.exit(1));
    });

    process.on("uncaughtException", (err: any) => {
      Sentry.captureException(err);
      logger.error(`Uncaught Exception: ${err.message}`);
      server.close(() => process.exit(1));
    });
  })
  .catch((err) => {
    Sentry.captureException(err);
    logger.error(`Error connecting to database: ${err.message}`);
  });
