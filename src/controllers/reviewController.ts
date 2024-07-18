import { Request, Response, NextFunction } from "express";
import * as ReviewService from "../services/reviewService";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

/**
 * Controller function to create a review
 * @param req Express request object with body containing review data
 * @param res Express response object
 * @param next Express next function
 * @returns Returns a JSON object with the review data
 * @returns {status: "success", data: {review}}
 */
export const createReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const review = await ReviewService.createReview(req.body);
    res.status(201).json({
      status: "success",
      data: {
        review,
      },
    });
  }
);

/**
 * Controller function by ID to get a review
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 * @returns Returns a JSON object with the review data
 */
export const getReviewById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviewId = req.params?.id;
    if (!reviewId) {
      return next(new AppError("No review ID provided", 400));
    }
    const review = await ReviewService.getReviewById(reviewId);
    if (!review) {
      return next(new AppError("No review found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        review,
      },
    });
  }
);

/**
 * Controller function to get all reviews
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 * @returns Returns a JSON object with the review data
 */
export const getAllReviews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const sortQuery = (req.query.sort as string)?.split(",") || [];
    const filter = req.query.filter
      ? JSON.parse(req.query.filter as string)
      : {};
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const sortObject: Record<string, "asc" | "desc"> = {};

    if (sortQuery.length === 2) {
      const [sortField, sortDirection] = sortQuery;
      sortObject[sortField] = sortDirection.toLowerCase() as "asc" | "desc";
    } else if (sortQuery.length > 0) {
      return next(new AppError("Invalid sort query parameters", 400));
    }

    const reviews = await ReviewService.getAllReviews(
      filter,
      page,
      limit,
      sortObject
    );

    res.status(200).json({
      status: "success",
      data: {
        reviews,
      },
    });
  }
);

/**
 * Controller function to update a review by ID
 * @param req Express request object with body containing review data
 * @param res Express response object
 * @param next Express next function
 * @returns Returns a JSON object with the review data
 */
export const updateReviewById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviewId = req.params?.id;
    if (!reviewId) {
      return next(new AppError("No review ID provided", 400));
    }
    const review = await ReviewService.updateReviewById(reviewId, req.body);
    if (!review) {
      return next(new AppError("No review found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        review,
      },
    });
  }
);

/**
 * Controller function to delete a review by ID
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 * @returns Returns a JSON object with the review data
 */
export const deleteReviewById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviewId = req.params?.id;
    if (!reviewId) {
      return next(new AppError("No review ID provided", 400));
    }
    const isDeleted = await ReviewService.deleteReviewById(reviewId);
    if (!isDeleted) {
      return next(new AppError("No review found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      message: "Review successfully deleted",
      data: null,
    });
  }
);
