import * as subscriptionRepository from "../repositories/subscriptionRepository";
import { ISubscription } from "../models/subscriptionModel";
import cache, { CACHE_TTL_SECONDS } from "../utils/cache";

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

export const getSubscriptionById = async (id: string): Promise<ISubscription | null> => {
  const cacheKey = `subscription_${id}`;
  let subscription: ISubscription | null = cache.get<ISubscription | null>(cacheKey) ?? null;

  if (subscription === null) {
    subscription = await subscriptionRepository.getSubscriptionById(id);
    if (subscription) {
      cache.set(cacheKey, subscription, CACHE_TTL_SECONDS);
    }
  }

  return subscription;
};

export const updateSubscription = async (
  id: string,
  subscriptionData: ISubscription
) => {
  const updatedSubscription = await subscriptionRepository.updateSubscription(
    id,
    subscriptionData
  );

  if (updatedSubscription) {
    const cacheKey = `subscription_${id}`;
    cache.set(cacheKey, updatedSubscription, CACHE_TTL_SECONDS);
  }

  return updatedSubscription;
};

export const deleteSubscription = async (id: string) => {
  const deletedSubscription = await subscriptionRepository.deleteSubscription(
    id
  );

  if (deletedSubscription) {
    const cacheKey = `subscription_${id}`;
    cache.del(cacheKey);
  }

  return deletedSubscription;
};
