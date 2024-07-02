import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import env from "../config/env";
import User, { IUser } from "../models/userModel";
import userRepository from "../repositories/userRepository";
import AppError from "../utils/appError";
import {
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../utils/emailUtils";

const generateAccessToken = (userId: string) => {
  return jwt.sign({ id: userId }, env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, env.REFRESH_TOKEN_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRATION,
  });
};

const register = async (
  username: string,
  email: string,
  password: string
): Promise<IUser> => {
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const user = new User({
    username,
    email,
    password,
    verificationToken,
  });
  await user.save();

  const verificationLink = `${env.EMAIL_VERIFICATION_URL}/${verificationToken}`;
  await Promise.all([
    sendWelcomeEmail(email, username, verificationLink),
    sendVerificationEmail(email, verificationLink),
  ]);

  return user;
};



const login = async (email: string, password: string) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) throw new AppError("Invalid email or password", 401);

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new AppError("Invalid email or password", 401);

  const accessToken = generateAccessToken(user._id as string);
  const refreshToken = generateRefreshToken(user._id as string);

  await userRepository.setRefreshToken(user._id as string, refreshToken);

  return { user, accessToken, refreshToken };
};

const logout = async (userId: string) => {
  await userRepository.removeRefreshToken(userId);
};

const requestPasswordReset = async (email: string) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) throw new AppError("User not found", 404);

  const token = crypto.randomBytes(20).toString("hex");
  const expires = new Date(Date.now() + 3600000);

  await userRepository.setResetPasswordToken(
    user._id as string,
    token,
    expires
  );

  const resetLink = `${env.RESET_PASSWORD_URL}/reset-password/${token}`;
  await sendResetPasswordEmail(email, resetLink);

  return token;
};


const resetPassword = async (token: string, newPassword: string) => {
  const user = await userRepository.findByResetPasswordToken(token);
  if (!user) throw new AppError("Invalid or expired token", 400);

  user.password = await bcrypt.hash(newPassword, 12);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  return user;
};

const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
  const user = await userRepository.findUserById(userId);
  if (!user) throw new AppError("User not found", 404);

  const isPasswordCorrect = await bcrypt.compare(
    currentPassword,
    user.password
  );
  if (!isPasswordCorrect)
    throw new AppError("Current password is incorrect", 401);

  user.password = await bcrypt.hash(newPassword, 12);
  await user.save();
  return user;
};

const verifyEmail = async (verificationToken: string): Promise<IUser> => {
  const user = await User.findOneAndUpdate(
    { verificationToken },
    { $set: { isEmailVerified: true, verificationToken: undefined } },
    { new: true }
  );

  if (!user) {
    throw new AppError("Invalid verification token.", 400);
  }

  return user;
};

const resendVerificationEmail = async (userId: string) => {
  const user = await userRepository.findUserById(userId);
  if (!user) throw new AppError("User not found", 404);

  const verificationToken = crypto.randomBytes(32).toString("hex");
  user.verificationToken = verificationToken;
  await user.save();

  const verificationLink = `${process.env.EMAIL_VERIFICATION_URL}/verify-email/${verificationToken}`;
  await sendVerificationEmail(user.email, verificationLink);
};

const getUserById = async (userId: string) => {
  const user = await userRepository.findUserById(userId);
  return user;
};

const getAllUsers = async (
  filter: any,
  sort: any,
  limit: number,
  skip: number
) => {
  const users = await userRepository.findUsers(filter, sort, limit, skip);
  return users;
};

const updateUser = async (userId: string, updateData: any) => {
  const user = await userRepository.updateUser(userId, updateData);
  return user;
};

const deleteUser = async (userId: string) => {
  await userRepository.deleteUser(userId);
};

export default {
  register,
  login,
  logout,
  requestPasswordReset,
  resetPassword,
  changePassword,
  verifyEmail,
  resendVerificationEmail,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
