import { Request, Response } from "express";
import { Types } from "mongoose";
import * as BookService from "../services/bookService";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

/**
 * Controller function to create a book
 * @param {Request} req - Express request object with body containing book data
 * @param {Response} res - Express response object
 * @returns {Promise<void>} - Returns a JSON object with the created book data
 * @throws {AppError} - Throws 400 if there is a bad request
 */
export const createBook = catchAsync(async (req: Request, res: Response) => {
  try {
    const book = await BookService.createBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    throw new AppError("Error creating book", 400);
  }
});

/**
 * Controller function to get a book by ID
 * @param {Request} req - Express request object with params containing book ID
 * @param {Response} res - Express response object
 * @param {Function} next - Express next function for error handling
 * @returns {Promise<void>} - Returns a JSON object with the book data
 * @throws {AppError} - Throws 404 if the book is not found
 */
export const getBookById = async (req: Request, res: Response, next: any) => {
  try {
    const bookId = new Types.ObjectId(req.params.id);
    const book = await BookService.getBookById(bookId);

    if (!book) {
      return next(new AppError("Book not found", 404));
    }

    res.status(200).json(book);
  } catch (error) {
    next(new AppError("Error fetching book", 400));
  }
};

/**
 * Controller function to get all books
 * @param {Request} req - Express request object with query parameters for filtering, sorting, and pagination
 * @param {Response} res - Express response object
 * @returns {Promise<void>} - Returns a JSON object with the books data
 * @throws {AppError} - Throws 400 if there is an error in fetching books
 */
export const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  try {
    const { books, total } = await BookService.getAllBooks(req.query);
    res.status(200).json({ total, books });
  } catch (error) {
    throw new AppError("Error fetching books", 400);
  }
});

/**
 * Controller function to update a book by ID
 * @param {Request} req - Express request object with params containing book ID and body containing update data
 * @param {Response} res - Express response object
 * @returns {Promise<void>} - Returns a JSON object with the updated book data
 * @throws {AppError} - Throws 404 if the book is not found or 400 for update errors
 */
export const updateBookById = catchAsync(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const book = await BookService.updateBookById(
        new Types.ObjectId(id),
        req.body
      );

      if (!book) {
        throw new AppError("Book not found", 404);
      }

      res.status(200).json(book);
    } catch (error) {
      throw new AppError("Error updating book", 400);
    }
  }
);

/**
 * Controller function to delete a book by ID
 * @param {Request} req - Express request object with params containing book ID
 * @param {Response} res - Express response object
 * @returns {Promise<void>} - Returns a JSON object indicating successful deletion
 * @throws {AppError} - Throws 404 if the book is not found or 400 for deletion errors
 */
export const deleteBookById = catchAsync(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await BookService.deleteBookById(new Types.ObjectId(id));
      res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
      throw new AppError("Error deleting book", 400);
    }
  }
);


/**
 * Controller function to add a subscription to a book
 * @param {Request} req - Express request object with body containing book ID and subscription ID
 * @param {Response} res - Express response object
 * @returns {Promise<void>} - Returns a JSON object with the updated book data
 * @throws {AppError} - Throws 404 if the book is not found or 400 for invalid IDs
 */
export const addSubscriptionToBook = catchAsync(async (req: Request, res: Response) => {
  try {
    const { bookId, subscriptionId } = req.body;
    const updatedBook = await BookService.addSubscriptionToBook(bookId, subscriptionId);

    if (!updatedBook) {
      throw new AppError("Book not found", 404);
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    if (error instanceof AppError && error.statusCode === 400) {
      throw new AppError("Invalid ID", 400);
    }
    throw new AppError("Error adding subscription", 400);
  }
});

/**
 * Controller function to remove a subscription from a book
 * @param {Request} req - Express request object with body containing book ID and subscription ID
 * @param {Response} res - Express response object
 * @returns {Promise<void>} - Returns a JSON object with the updated book data
 * @throws {AppError} - Throws 404 if the book is not found or 400 for invalid IDs
 */
export const removeSubscriptionFromBook = catchAsync(async (req: Request, res: Response) => {
  try {
    const { bookId, subscriptionId } = req.body;
    const updatedBook = await BookService.removeSubscriptionFromBook(bookId, subscriptionId);

    if (!updatedBook) {
      throw new AppError("Book not found", 404);
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    if (error instanceof AppError && error.statusCode === 400) {
      throw new AppError("Invalid ID", 400);
    }
    throw new AppError("Error removing subscription", 400);
  }
});

