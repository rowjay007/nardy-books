import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/userModel";
import * as userRepository from "../repositories/userRepository";
import AppError from "../utils/appError";
import env from "../config/env";
import cache, { CACHE_TTL_SECONDS } from "../utils/cache";
import {
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../utils/emailUtils";

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ id: userId }, env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, env.REFRESH_TOKEN_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRATION,
  });
};

export const register = async (
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

  cache.flushAll();

  return user;
};

export const login = async (email: string, password: string) => {
  if (!email.includes("@") || !email.split("@")[1].includes(".")) {
    throw new AppError("Invalid email format", 400);
  }

  const user = await userRepository.findUserByEmail(email);
  if (!user) throw new AppError("Invalid email or password", 401);

  if (!user.isEmailVerified) {
    throw new AppError("Email not verified", 401);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new AppError("Invalid email or password", 401);

  const accessToken = generateAccessToken(user._id as string);
  const refreshToken = generateRefreshToken(user._id as string);

  await userRepository.setRefreshToken(user._id as string, refreshToken);

  return { user, accessToken, refreshToken };
};

export const logout = async (userId: string) => {
  await userRepository.removeRefreshToken(userId);
  cache.flushAll();
};

export const requestPasswordReset = async (email: string) => {
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

export const resetPassword = async (token: string, newPassword: string) => {
  const user = await userRepository.findByResetPasswordToken(token);
  if (!user) throw new AppError("Invalid or expired token", 400);

  user.password = newPassword; 
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  cache.flushAll();

  return user;
};

export const changePassword = async (
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

  user.password = newPassword;
  await user.save();

  cache.flushAll();

  return user;
};

export const verifyEmail = async (
  verificationToken: string
): Promise<IUser> => {
  const user = await User.findOneAndUpdate(
    { verificationToken },
    { $set: { isEmailVerified: true, verificationToken: undefined } },
    { new: true }
  );

  if (!user) {
    throw new AppError("Invalid verification token.", 400);
  }

  cache.flushAll();

  return user;
};

export const resendVerificationEmail = async (userId: string) => {
  const user = await userRepository.findUserById(userId);
  if (!user) throw new AppError("User not found", 404);

  const verificationToken = crypto.randomBytes(32).toString("hex");
  user.verificationToken = verificationToken;
  await user.save();

  const verificationLink = `${env.EMAIL_VERIFICATION_URL}/verify-email/${verificationToken}`;
  await sendVerificationEmail(user.email, verificationLink);

  cache.flushAll();
};

export const getUserById = async (userId: string): Promise<IUser | null> => {
  const cacheKey = `user_${userId}`;
  let user = cache.get<IUser | null>(cacheKey);

  if (user === undefined) {
    user = await userRepository.findUserById(userId);
    if (user) {
      cache.set(cacheKey, user, CACHE_TTL_SECONDS);
    }
  }

  return user;
};

export const getAllUsers = async (
  filter: any,
  sort: any,
  limit: number,
  skip: number
) => {
  const cacheKey = `allUsers_${JSON.stringify({ filter, sort, limit, skip })}`;
  let users = cache.get<IUser[]>(cacheKey);

  if (!users) {
    users = await userRepository.findUsers(filter, sort, limit, skip);
    cache.set(cacheKey, users, CACHE_TTL_SECONDS);
  }

  return users;
};

export const updateUser = async (
  userId: string,
  updateData: Partial<IUser>
): Promise<IUser> => {
  const user = await userRepository.updateUser(userId, updateData);
  if (!user) throw new AppError("User not found", 404);
  cache.flushAll();
  return user;
};

export const deleteUser = async (userId: string): Promise<boolean> => {
  const result = await userRepository.deleteUser(userId);
  cache.flushAll();
  return result;
};

export const getCurrentUser = async (userId: string): Promise<IUser | null> => {
  return userRepository.findUserById(userId);
};

export const updateCurrentUser = async (
  userId: string,
  updateData: Partial<IUser>
): Promise<IUser> => {
  const user = await userRepository.updateUser(userId, updateData);
  if (!user) throw new AppError("User not found", 404);
  return user;
};

export const deleteCurrentUser = async (userId: string): Promise<boolean> => {
  return userRepository.deleteUser(userId);
};
