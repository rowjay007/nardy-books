import nodemailer from "nodemailer";
import env from "../config/env";

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: Number(env.EMAIL_PORT),
  auth: {
    user: env.EMAIL_USERNAME,
    pass: env.EMAIL_PASSWORD,
  },
});


const templates = {
  welcome: (to: string, username: string, verificationLink: string) => ({
    from: env.EMAIL_USERNAME,
    to,
    subject: "Welcome to Our Application!",
    html: `
      <p>Dear ${username},</p>
      <p>Welcome to our application! Please click the following link to verify your email:</p>
      <a href="${verificationLink}">${verificationLink}</a>
      <p>Best regards,<br/>Your Application Team</p>
    `,
  }),

  verification: (to: string, verificationLink: string) => ({
    from: env.EMAIL_USERNAME,
    to,
    subject: "Email Verification",
    html: `
      <p>Dear User,</p>
      <p>Please click the following link to verify your email:</p>
      <a href="${verificationLink}">${verificationLink}</a>
      <p>Best regards,<br/>Your Application Team</p>
    `,
  }),

  resetPassword: (to: string, resetLink: string) => ({
    from: env.EMAIL_USERNAME,
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

export const sendWelcomeEmail = async (
  to: string,
  username: string,
  verificationLink: string
): Promise<void> => {
  const { from, subject, html } = templates.welcome(
    to,
    username,
    verificationLink
  );
  await transporter.sendMail({ from, to, subject, html });
};

export const sendVerificationEmail = async (
  to: string,
  verificationLink: string
): Promise<void> => {
  const { from, subject, html } = templates.verification(to, verificationLink);
  await transporter.sendMail({ from, to, subject, html });
};

export const sendResetPasswordEmail = async (
  to: string,
  resetLink: string
): Promise<void> => {
  const { from, subject, html } = templates.resetPassword(to, resetLink);
  await transporter.sendMail({ from, to, subject, html });
};
