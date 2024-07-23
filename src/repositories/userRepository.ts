import User, { IUser } from "../models/userModel";
import AppError from "../utils/appError";

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  const user = new User(userData);
  await user.save();
  return user;
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email });
};

export const findUserById = async (id: string): Promise<IUser | null> => {
  return User.findById(id);
};

export const findUsers = async (
  filter: any,
  sort: any,
  limit: number,
  skip: number
): Promise<IUser[]> => {
  return User.find(filter).sort(sort).limit(limit).skip(skip);
};

export const updateUser = async (
  id: string,
  updateData: Partial<IUser>
): Promise<IUser | null> => {
  return User.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const result = await User.findByIdAndDelete(id);
  return result !== null;
};

export const setResetPasswordToken = async (
  id: string,
  token: string,
  expires: Date
): Promise<IUser> => {
  const user = await User.findById(id);
  if (!user) throw new AppError("User not found", 404);
  user.resetPasswordToken = token;
  user.resetPasswordExpires = expires;
  await user.save();
  return user;
};

export const findByResetPasswordToken = async (
  token: string
): Promise<IUser | null> => {
  return User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() },
  });
};

export const setRefreshToken = async (
  id: string,
  refreshToken: string
): Promise<IUser> => {
  const user = await User.findById(id);
  if (!user) throw new AppError("User not found", 404);
  user.refreshToken = refreshToken;
  await user.save();
  return user;
};

export const removeRefreshToken = async (id: string): Promise<IUser> => {
  const user = await User.findById(id);
  if (!user) throw new AppError("User not found", 404);
  user.refreshToken = undefined;
  await user.save();
  return user;
};
