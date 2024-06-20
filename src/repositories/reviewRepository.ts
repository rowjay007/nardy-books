import Review from "../models/reviewModel";
import { Types } from "mongoose";

export const createReview = async (reviewData: any) => {
  const review = new Review(reviewData);
  await review.save();
  return review;
};

export const getReviewById = async (reviewId: Types.ObjectId) => {
  return Review.findById(reviewId).populate("reviewer book");
};

export const getAllReviews = async (
  filter: Record<string, any>,
  page: number,
  limit: number,
  sort: Record<string, "asc" | "desc">
) => {
  return Review.find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("reviewer book");
};

export const updateReviewById = async (
  reviewId: Types.ObjectId,
  updateData: any
) => {
  return Review.findByIdAndUpdate(reviewId, updateData, { new: true }).populate(
    "reviewer book"
  );
};

export const deleteReviewById = async (reviewId: Types.ObjectId) => {
  return Review.findByIdAndDelete(reviewId);
};
