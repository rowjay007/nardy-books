// services/userService.ts
import userRepository from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import env from "../config/env";
import AppError from "../utils/appError";

const register = async (username: string, email: string, password: string) => {
  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) throw new AppError("Email already in use", 400);

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
  if (!user) throw new AppError("Invalid email or password", 401);

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new AppError("Invalid email or password", 401);

  const token = jwt.sign({ id: user._id as string }, env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return { user, token };
};

const logout = () => {
    // Logout logic, usually handled by the client by removing the token
    //TODO implement logout logic
};

const requestPasswordReset = async (email: string) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) throw new AppError("User not found", 404);

  const token = crypto.randomBytes(20).toString("hex");
  const expires = new Date(Date.now() + 3600000); // 1 hour

  await userRepository.setResetPasswordToken(
    user._id as string,
    token,
    expires
  );

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

const verifyEmail = async (userId: string) => {
  const user = await userRepository.updateUser(userId, {
    isEmailVerified: true,
  });
  return user;
};

const resendVerificationEmail = async (userId: string) => {
  const user = await userRepository.findUserById(userId);
  if (!user) throw new AppError("User not found", 404);
    // Send verification email logic
    //TODO: Send email here
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
