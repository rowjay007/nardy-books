import { Request, Response } from "express";
import Review from "../models/review.model";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

// Get all reviews for a specific book
export const getReviewsByBookId = catchAsync(
  async (req: Request, res: Response) => {
    const { bookId } = req.params;

    const reviews = await Review.find({ book: bookId });
    res.status(200).json({ reviews });
  }
);

// Create a new review for a specific book
export const createReview = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const { userId } = req; // Assuming userId is attached to the request by authentication middleware
  const { text, rating } = req.body;

  const newReview = await Review.create({
    user: userId,
    book: bookId,
    text,
    rating,
  });

  res.status(201).json({ review: newReview });
});

// Update a review
export const updateReview = catchAsync(async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const { text, rating } = req.body;

  const updatedReview = await Review.findByIdAndUpdate(
    reviewId,
    { text, rating },
    { new: true }
  );

  if (!updatedReview) {
    throw new AppError("Review not found", 404);
  }

  res.status(200).json({ review: updatedReview });
});

// Delete a review
export const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const { reviewId } = req.params;

  const deletedReview = await Review.findByIdAndDelete(reviewId);

  if (!deletedReview) {
    throw new AppError("Review not found", 404);
  }

  res.status(204).json();
});
