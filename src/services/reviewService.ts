import * as ReviewRepository from "../repositories/reviewRepository";
import { Types } from "mongoose";

export const createReview = async (reviewData: any) => {
  return ReviewRepository.createReview(reviewData);
};

export const getReviewById = async (reviewId: string) => {
  const id = new Types.ObjectId(reviewId);
  return ReviewRepository.getReviewById(id);
};

export const getAllReviews = async (
  filter: Record<string, any>,
  page: number,
  limit: number,
  sort: Record<string, "asc" | "desc">
) => {
  return ReviewRepository.getAllReviews(filter, page, limit, sort);
};

export const updateReviewById = async (reviewId: string, updateData: any) => {
  const id = new Types.ObjectId(reviewId);
  return ReviewRepository.updateReviewById(id, updateData);
};

export const deleteReviewById = async (reviewId: string) => {
  const id = new Types.ObjectId(reviewId);
  return ReviewRepository.deleteReviewById(id);
};
