import User, { IUser } from "../models/userModel";
import { Types } from "mongoose";

const createUser = async (userData: Partial<IUser>) => {
  const user = new User(userData);
  await user.save();
  return user;
};

const findUserByEmail = async (email: string) => {
  return User.findOne({ email });
};

const findUserById = async (id: string) => {
  return User.findById(new Types.ObjectId(id));
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
  return User.findByIdAndUpdate(new Types.ObjectId(id), updateData, {
    new: true,
  });
};

const deleteUser = async (id: string) => {
  return User.findByIdAndDelete(new Types.ObjectId(id));
};

const setResetPasswordToken = async (
  id: string,
  token: string,
  expires: Date
) => {
  const user = await User.findById(new Types.ObjectId(id));
  if (user) {
    user.resetPasswordToken = token;
    user.resetPasswordExpires = expires;
    await user.save();
  }
  return user;
};

const findByResetPasswordToken = async (token: string) => {
  return User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() },
  });
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
};
