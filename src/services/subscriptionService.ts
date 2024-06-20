import * as subscriptionRepository from "../repositories/subscriptionRepository";
import { ISubscription } from "../models/subscriptionModel";

export const createSubscription = async (subscriptionData: ISubscription) => {
  return await subscriptionRepository.createSubscription(subscriptionData);
};

export const getSubscriptions = async (
  filter: Record<string, any>,
  sort: Record<string, any>,
  page: number,
  limit: number
) => {
  return await subscriptionRepository.getSubscriptions(
    filter,
    sort,
    page,
    limit
  );
};

export const getSubscriptionById = async (id: string) => {
  return await subscriptionRepository.getSubscriptionById(id);
};

export const updateSubscription = async (
  id: string,
  subscriptionData: ISubscription
) => {
  return await subscriptionRepository.updateSubscription(id, subscriptionData);
};

export const deleteSubscription = async (id: string) => {
  return await subscriptionRepository.deleteSubscription(id);
};
