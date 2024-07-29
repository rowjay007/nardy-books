import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import * as BookService from "../services/bookService";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

/**
 * Controller function to create a book
 * @param {Request} req - Express request object with body containing book data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function for error handling
 * @returns {Promise<void>} - Returns a JSON object with the created book data
 * @throws {AppError} - Throws 400 if there is a bad request
 */
export const createBook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const book = await BookService.createBook(req.body);
  res.status(201).json(book);
});

/**
 * Controller function to get a book by ID
 * @param {Request} req - Express request object with params containing book ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function for error handling
 * @returns {Promise<void>} - Returns a JSON object with the book data
 * @throws {AppError} - Throws 404 if the book is not found
 */
export const getBookById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const bookId = new Types.ObjectId(req.params.id);
  const book = await BookService.getBookById(bookId);

  if (!book) {
    return next(new AppError("Book not found", 404));
  }

  res.status(200).json(book);
});

/**
 * Controller function to get all books
 * @param {Request} req - Express request object with query parameters for filtering, sorting, and pagination
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function for error handling
 * @returns {Promise<void>} - Returns a JSON object with the books data
 * @throws {AppError} - Throws 400 if there is an error in fetching books
 */
export const getAllBooks = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { books, total } = await BookService.getAllBooks(req.query);
  res.status(200).json({ total, books });
});

/**
 * Controller function to update a book by ID
 * @param {Request} req - Express request object with params containing book ID and body containing update data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function for error handling
 * @returns {Promise<void>} - Returns a JSON object with the updated book data
 * @throws {AppError} - Throws 404 if the book is not found or 400 for update errors
 */
export const updateBookById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const book = await BookService.updateBookById(new Types.ObjectId(id), req.body);

  if (!book) {
    return next(new AppError("Book not found", 404));
  }

  res.status(200).json(book);
});

/**
 * Controller function to delete a book by ID
 * @param {Request} req - Express request object with params containing book ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function for error handling
 * @returns {Promise<void>} - Returns a JSON object indicating successful deletion
 * @throws {AppError} - Throws 404 if the book is not found or 400 for deletion errors
 */
export const deleteBookById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  await BookService.deleteBookById(new Types.ObjectId(req.params.id));
  res.status(200).json({ message: "Book deleted successfully" });
});

/**
 * Controller function to add a subscription to a book
 * @param {Request} req - Express request object with path parameter for book ID and body containing subscription ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function for error handling
 * @returns {Promise<void>} - Returns a JSON object with the updated book data
 * @throws {AppError} - Throws 404 if the book is not found or 400 for invalid IDs
 */
export const addSubscriptionToBook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;
  const { subscriptionId } = req.body;

  if (!bookId || !subscriptionId) {
    return next(new AppError("Invalid ID", 400));
  }

  const updatedBook = await BookService.addSubscriptionToBook(bookId, subscriptionId);

  if (!updatedBook) {
    return next(new AppError("Book not found", 404));
  }

  res.status(200).json(updatedBook);
});

/**
 * Controller function to remove a subscription from a book
 * @param {Request} req - Express request object with path parameter for book ID and body containing subscription ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function for error handling
 * @returns {Promise<void>} - Returns a JSON object with the updated book data
 * @throws {AppError} - Throws 404 if the book is not found or 400 for invalid IDs
 */
export const removeSubscriptionFromBook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;
  const { subscriptionId } = req.body;

  if (!bookId || !subscriptionId) {
    return next(new AppError("Invalid ID", 400));
  }

  const updatedBook = await BookService.removeSubscriptionFromBook(bookId, subscriptionId);

  if (!updatedBook) {
    return next(new AppError("Book not found", 404));
  }

  res.status(200).json(updatedBook);
});
