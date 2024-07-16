import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import * as AuthorService from "../services/authorService";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

/**
 * Controller function to create an author
 * @param {Request} req - Express request object with body containing author data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the created author data
 */
export const createAuthor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const author = await AuthorService.createAuthor(req.body);
    res.status(201).json({
      status: "success",
      data: {
        author,
      },
    });
  }
);

/**
 * Controller function to get an author by ID
 * @param {Request} req - Express request object with params containing author ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the author data
 */
export const getAuthorById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = new Types.ObjectId(req.params.id);
    const author = await AuthorService.getAuthorById(authorId);
    if (!author) {
      return next(new AppError("No author found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        author,
      },
    });
  }
);

/**
 * Controller function to get all authors
 * @param {Request} req - Express request object with query parameters for filtering, sorting, and pagination
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the authors data
 */
export const getAllAuthors = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      page = 1,
      limit = 10,
      sortBy = "name",
      sortOrder = "asc",
    } = req.query;

    const authorsData = await AuthorService.getAllAuthors(
      name as string,
      parseInt(page as string, 10),
      parseInt(limit as string, 10),
      sortBy as string,
      sortOrder as string
    );

    res.status(200).json({
      status: "success",
      data: {
        authors: authorsData.authors,
        total: authorsData.total,
        page: authorsData.page,
        limit: authorsData.limit,
      },
    });
  }
);

/**
 * Controller function to update an author by ID
 * @param {Request} req - Express request object with params containing author ID and body containing update data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the updated author data
 */
export const updateAuthorById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = new Types.ObjectId(req.params.id);
    const author = await AuthorService.updateAuthorById(authorId, req.body);
    if (!author) {
      return next(new AppError("No author found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        author,
      },
    });
  }
);

/**
 * Controller function to delete an author by ID
 * @param {Request} req - Express request object with params containing author ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object indicating successful deletion
 */
export const deleteAuthorById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = new Types.ObjectId(req.params.id);
    const author = await AuthorService.deleteAuthorById(authorId);
    if (!author) {
      return next(new AppError("No author found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      message: "Author deleted successfully",
      data: null,
    });
  }
);

/**
 * Controller function to add a book to an author
 * @param {Request} req - Express request object with params containing author ID and book ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the updated author data
 */
export const addBookToAuthor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = new Types.ObjectId(req.params.authorId);
    const bookId = new Types.ObjectId(req.params.bookId);
    const author = await AuthorService.addBookToAuthor(authorId, bookId);
    if (!author) {
      return next(new AppError("No author found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        author,
      },
    });
  }
);
