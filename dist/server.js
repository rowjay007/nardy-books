"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="8191e049-f9ad-531a-8027-27c4199e6810")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
const env_1 = __importDefault(require("./config/env"));
const logger_1 = __importDefault(require("./config/logger"));
const sentry_1 = __importDefault(require("./config/sentry"));
const PORT = env_1.default.PORT || 3000;
(0, db_1.default)()
    .then(() => {
    const server = app_1.default.listen(PORT, () => {
        logger_1.default.info(`Server running in ${env_1.default.NODE_ENV} mode on port ${PORT}`);
    });
    process.on("SIGINT", () => {
        logger_1.default.info("SIGINT received: Shutting down gracefully");
        server.close(() => {
            logger_1.default.info("Server closed");
            process.exit(0);
        });
    });
    process.on("unhandledRejection", (err) => {
        sentry_1.default.captureException(err);
        logger_1.default.error(`Unhandled Rejection: ${err.message}`);
        server.close(() => process.exit(1));
    });
    process.on("uncaughtException", (err) => {
        sentry_1.default.captureException(err);
        logger_1.default.error(`Uncaught Exception: ${err.message}`);
        server.close(() => process.exit(1));
    });
})
    .catch((err) => {
    sentry_1.default.captureException(err);
    logger_1.default.error(`Error connecting to database: ${err.message}`);
});
//# sourceMappingURL=server.js.map
//# debugId=8191e049-f9ad-531a-8027-27c4199e6810
