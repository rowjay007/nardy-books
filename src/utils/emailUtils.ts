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

export async function sendResetPasswordEmail(
  email: string,
  token: string
): Promise<void> {
  const mailOptions = {
    from: "example@gmail.com",
    to: email,
    subject: "Reset Your Password",
    text: `Use this token to reset your password: ${token}`,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendVerificationEmail(
  email: string,
  verificationLink: string
): Promise<void> {
  const mailOptions = {
    from: env.EMAIL_USERNAME,
    to: email,
    subject: "Verify Your Email Address",
    text: `Click ${verificationLink} to verify your email address.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to:", email);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
}

// Other email utility functions as needed

export default transporter;
