import * as ReviewRepository from "../repositories/reviewRepository";
import { Types } from "mongoose";
import cache, { CACHE_TTL_SECONDS } from "../utils/cache";

export const createReview = async (reviewData: any) => {
  const review = await ReviewRepository.createReview(reviewData);
  cache.flushAll(); 
  return review;
};

export const getReviewById = async (reviewId: string) => {
  const cacheKey = `review_${reviewId}`;
  const id = new Types.ObjectId(reviewId);
  let review = cache.get<any>(cacheKey);

  if (!review) {
    review = await ReviewRepository.getReviewById(id);
    if (review) {
      cache.set(cacheKey, review, CACHE_TTL_SECONDS);
    }
  }

  return review;
};

export const getAllReviews = async (
  filter: Record<string, any>,
  page: number,
  limit: number,
  sort: Record<string, "asc" | "desc">
) => {
  const cacheKey = `allReviews_${JSON.stringify({
    filter,
    page,
    limit,
    sort,
  })}`;
  let reviews = cache.get<any[]>(cacheKey);

  if (!reviews) {
    reviews = await ReviewRepository.getAllReviews(filter, page, limit, sort);
    cache.set(cacheKey, reviews, CACHE_TTL_SECONDS);
  }

  return reviews;
};

export const updateReviewById = async (reviewId: string, updateData: any) => {
  const id = new Types.ObjectId(reviewId);
  const review = await ReviewRepository.updateReviewById(id, updateData);
  if (review) {
    cache.flushAll(); 
  }
  return review;
};
export const deleteReviewById = async (reviewId: string): Promise<boolean> => {
  const id = new Types.ObjectId(reviewId);
  const result = await ReviewRepository.deleteReviewById(id);
  cache.flushAll();
  return result !== null;
};
