import { Request, Response, NextFunction } from "express";
import * as PublisherService from "../services/publisherService";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { Types } from "mongoose";

/**
 * Convert a string to a MongoDB ObjectId
 * @param {string} id - The ID to convert
 * @returns {Types.ObjectId} - The converted ObjectId
 * @throws {AppError} - Throws an error if the ID format is invalid
 */
const convertToObjectId = (id: string) => {
  try {
    return new Types.ObjectId(id);
  } catch (error) {
    throw new AppError("Invalid ID format", 400);
  }
};

/**
 * Controller function to create a publisher
 * @param {Request} req - Express request object with body containing publisher data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the publisher data
 */
export const createPublisher = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const publisher = await PublisherService.createPublisher(req.body);
    res.status(201).json({
      status: "success",
      data: {
        publisher,
      },
    });
  }
);

/**
 * Controller function to get a publisher by ID
 * @param {Request} req - Express request object with params containing publisher ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the publisher data
 */
export const getPublisherById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const publisherId = convertToObjectId(req.params.id);
    const publisher = await PublisherService.getPublisherById(publisherId);
    if (!publisher) {
      return next(new AppError("No publisher found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        publisher,
      },
    });
  }
);

/**
 * Controller function to get all publishers
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the publishers data
 */
export const getAllPublishers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const publishers = await PublisherService.getAllPublishers(
        {},
        page,
        limit,
        {}
      );

      res.status(200).json({
        status: "success",
        data: {
          publishers,
        },
      });
    } catch (error) {
      next(new AppError("Unable to fetch publishers", 500));
    }
  }
);

/**
 * Controller function to update a publisher by ID
 * @param {Request} req - Express request object with params containing publisher ID and body containing update data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the updated publisher data
 */
export const updatePublisherById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const publisherId = convertToObjectId(req.params.id);
    const publisher = await PublisherService.updatePublisherById(
      publisherId,
      req.body
    );
    if (!publisher) {
      return next(new AppError("No publisher found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        publisher,
      },
    });
  }
);

/**
 * Controller function to delete a publisher by ID
 * @param {Request} req - Express request object with params containing publisher ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object indicating successful deletion
 */
export const deletePublisherById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const publisherId = convertToObjectId(req.params.id);
    const publisherDeleted = await PublisherService.deletePublisherById(
      publisherId
    );
    if (!publisherDeleted) {
      return next(new AppError("No publisher found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      message: "Publisher successfully deleted",
      data: null,
    });
  }
);

/**
 * Controller function to add a book to a publisher
 * @param {Request} req - Express request object with params containing publisher ID and book ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the updated publisher data
 */
export const addBookToPublisher = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const publisherId = convertToObjectId(req.params.publisherId);
    const bookId = convertToObjectId(req.params.bookId);

    const publisher = await PublisherService.addBookToPublisher(
      publisherId,
      bookId
    );

    if (!publisher) {
      return next(new AppError("No publisher found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        publisher,
      },
    });
  }
);
