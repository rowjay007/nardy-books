import { Request, Response, NextFunction } from "express";
import * as ReviewService from "../services/reviewService";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

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

export const getReviewById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const review = await ReviewService.getReviewById(req.params.id);
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

export const getAllReviews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const sortQuery = req.query.sort as string[];
    const filter = req.query.filter
      ? JSON.parse(req.query.filter as string)
      : {};
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const sortObject: Record<string, "asc" | "desc"> = {};

    if (Array.isArray(sortQuery) && sortQuery.length === 2) {
      const sortField = sortQuery[0];
      const sortDirection = sortQuery[1].toLowerCase() as "asc" | "desc";
      sortObject[sortField] = sortDirection;
    } else {
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

export const updateReviewById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const review = await ReviewService.updateReviewById(
      req.params.id,
      req.body
    );
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

export const deleteReviewById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const review = await ReviewService.deleteReviewById(req.params.id);
    if (!review) {
      return next(new AppError("No review found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
