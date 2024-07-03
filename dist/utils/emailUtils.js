"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="2978fea8-bbd7-522f-a879-08a86f73f3f4")}catch(e){}}();

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetPasswordEmail = exports.sendVerificationEmail = exports.sendWelcomeEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = __importDefault(require("../config/env"));
const transporter = nodemailer_1.default.createTransport({
    host: env_1.default.EMAIL_HOST,
    port: Number(env_1.default.EMAIL_PORT),
    auth: {
        user: env_1.default.EMAIL_USERNAME,
        pass: env_1.default.EMAIL_PASSWORD,
    },
});
const templates = {
    welcome: (to, username, verificationLink) => ({
        from: env_1.default.EMAIL_USERNAME,
        to,
        subject: "Welcome to Our Application!",
        html: `
      <p>Dear ${username},</p>
      <p>Welcome to our application! Please click the following link to verify your email:</p>
      <a href="${verificationLink}">${verificationLink}</a>
      <p>Best regards,<br/>Your Application Team</p>
    `,
    }),
    verification: (to, verificationLink) => ({
        from: env_1.default.EMAIL_USERNAME,
        to,
        subject: "Email Verification",
        html: `
      <p>Dear User,</p>
      <p>Please click the following link to verify your email:</p>
      <a href="${verificationLink}">${verificationLink}</a>
      <p>Best regards,<br/>Your Application Team</p>
    `,
    }),
    resetPassword: (to, resetLink) => ({
        from: env_1.default.EMAIL_USERNAME,
        to,
        subject: "Reset Your Password",
        html: `
      <p>Dear User,</p>
      <p>We received a request to reset your password. Please click the following link to reset it:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>If you did not request this, you can safely ignore this email.</p>
      <p>Best regards,<br/>Your Application Team</p>
    `,
    }),
};
const sendWelcomeEmail = (to, username, verificationLink) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, subject, html } = templates.welcome(to, username, verificationLink);
    yield transporter.sendMail({ from, to, subject, html });
});
exports.sendWelcomeEmail = sendWelcomeEmail;
const sendVerificationEmail = (to, verificationLink) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, subject, html } = templates.verification(to, verificationLink);
    yield transporter.sendMail({ from, to, subject, html });
});
exports.sendVerificationEmail = sendVerificationEmail;
const sendResetPasswordEmail = (to, resetLink) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, subject, html } = templates.resetPassword(to, resetLink);
    yield transporter.sendMail({ from, to, subject, html });
});
exports.sendResetPasswordEmail = sendResetPasswordEmail;
//# sourceMappingURL=emailUtils.js.map
//# debugId=2978fea8-bbd7-522f-a879-08a86f73f3f4
