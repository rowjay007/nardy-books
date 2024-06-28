import User, { IUser } from "../models/userModel";
import AppError from "../utils/appError";

const createUser = async (userData: Partial<IUser>) => {
  const user = new User(userData);
  await user.save();
  return user;
};

const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email });
};

const findUserById = async (id: string): Promise<IUser | null> => {
  return User.findById(id);
};

const findUsers = async (
  filter: any,
  sort: any,
  limit: number,
  skip: number
) => {
  return User.find(filter).sort(sort).limit(limit).skip(skip);
};

const updateUser = async (id: string, updateData: Partial<IUser>) => {
  const user = await User.findByIdAndUpdate(id, updateData, { new: true });
  if (!user) throw new AppError("User not found", 404);
  return user;
};

const deleteUser = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new AppError("User not found", 404);
  return user;
};

const setResetPasswordToken = async (
  id: string,
  token: string,
  expires: Date
) => {
  const user = await User.findById(id);
  if (!user) throw new AppError("User not found", 404);
  user.resetPasswordToken = token;
  user.resetPasswordExpires = expires;
  await user.save();
  return user;
};

const findByResetPasswordToken = async (
  token: string
): Promise<IUser | null> => {
  return User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() },
  });
};

const setRefreshToken = async (id: string, refreshToken: string) => {
  const user = await User.findById(id);
  if (!user) throw new AppError("User not found", 404);
  user.refreshToken = refreshToken;
  await user.save();
  return user;
};

const removeRefreshToken = async (id: string) => {
  const user = await User.findById(id);
  if (!user) throw new AppError("User not found", 404);
  user.refreshToken = undefined;
  await user.save();
  return user;
};

export default {
  createUser,
  findUserByEmail,
  findUserById,
  findUsers,
  updateUser,
  deleteUser,
  setResetPasswordToken,
  findByResetPasswordToken,
  setRefreshToken,
  removeRefreshToken,
};
