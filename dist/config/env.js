"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="840cb056-6775-5dde-9244-ae694c866f04")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || "",
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/nardy-books",
    JWT_SECRET: process.env.JWT_SECRET || "",
    LOG_LEVEL: process.env.LOG_LEVEL || "info",
    PAYSTACK_TEST_SECRET_KEY: process.env.PAYSTACK_TEST_SECRET_KEY || "",
    FLUTTERWAVE_TEST_SECRET_KEY: process.env.FLUTTERWAVE_TEST_SECRET_KEY || "",
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || "",
    EMAIL_USERNAME: process.env.EMAIL_USERNAME || "",
    EMAIL_HOST: process.env.EMAIL_HOST || "",
    EMAIL_PORT: process.env.EMAIL_PORT || "",
    EMAIL_ADDRESS: process.env.EMAIL_ADDRESS || "",
    EMAIL_VERIFICATION_URL: process.env.EMAIL_VERIFICATION_URL || "",
    RESET_PASSWORD_URL: process.env.RESET_PASSWORD_URL || "",
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "",
    REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION || "",
    SEND_WELCOME_EMAIL: process.env.SEND_WELCOME_EMAIL || "",
    SENTRY_DSN: process.env.SENTRY_DSN || "",
};
exports.default = env;
//# sourceMappingURL=env.js.map
//# debugId=840cb056-6775-5dde-9244-ae694c866f04
