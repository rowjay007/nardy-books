// /services/userService.ts
import userRepository from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import env from "../config/env";
import { Types } from "mongoose";

const register = async (username: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await userRepository.createUser({
    username,
    email,
    password: hashedPassword,
  });
  return user;
};

const login = async (email: string, password: string) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { id: (user._id as Types.ObjectId).toString() },
    env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return { user, token };
};

const logout = () => {
    // TODO: Implement logout logic
    

};

const requestPasswordReset = async (email: string) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }

  const token = crypto.randomBytes(20).toString("hex");
  const expires = new Date(Date.now() + 3600000); // 1 hour

  await userRepository.setResetPasswordToken(
    (user._id as Types.ObjectId).toString(),
    token,
    expires
  );

  // Send email logic
  return token;
};

const resetPassword = async (token: string, newPassword: string) => {
  const user = await userRepository.findByResetPasswordToken(token);
  if (!user) {
    throw new Error("Invalid or expired token");
  }

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
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordCorrect = await bcrypt.compare(
    currentPassword,
    user.password
  );
  if (!isPasswordCorrect) {
    throw new Error("Current password is incorrect");
  }

  user.password = await bcrypt.hash(newPassword, 12);
  await user.save();
  return user;
};

const verifyEmail = async (userId: string) => {
  const user = await userRepository.updateUser(userId, {
    isEmailVerified: true,
  });
  return user;
};

const resendVerificationEmail = async (userId: string) => {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Send verification email logic
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
