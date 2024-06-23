import Subscription, { ISubscription } from "../models/subscriptionModel";
import { Types } from "mongoose";
import AppError from "../utils/appError";

export const createSubscription = async (subscriptionData: ISubscription) => {
  const subscription = new Subscription(subscriptionData);
  return await subscription.save();
};

export const getSubscriptions = async (
  filter: Record<string, any>,
  sort: Record<string, any>,
  page: number,
  limit: number
) => {
  const options = {
    populate: "users",
    sort,
    skip: (page - 1) * limit,
    limit,
  };

  return await Subscription.find(filter, null, options);
};

export const getSubscriptionById = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) throw new AppError("Invalid ID", 400);
  return await Subscription.findById(id).populate("users");
};

export const updateSubscription = async (
  id: string,
  subscriptionData: ISubscription
) => {
  if (!Types.ObjectId.isValid(id)) throw new AppError("Invalid ID", 400);
  return await Subscription.findByIdAndUpdate(id, subscriptionData, {
    new: true,
    runValidators: true,
  });
};

export const deleteSubscription = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) throw new AppError("Invalid ID", 400);
  return await Subscription.findByIdAndDelete(id);
};
