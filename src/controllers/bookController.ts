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
 */
export const createBook = catchAsync(async (req: Request, res: Response) => {
  const book = await BookService.createBook(req.body);
  res.status(201).json(book);
});

/**
 * Controller function to get a book by ID
 * @param {Request} req - Express request object with params containing book ID
 * @param {Response} res - Express response object
 * @returns {Promise<void>} - Returns a JSON object with the book data
 */
export const getBookById = async (req: Request, res: Response, next: any) => {
  const bookId = new Types.ObjectId(req.params.id);
  const book = await BookService.getBookById(bookId);

  if (!book) {
    return next(new AppError("Book not found", 404));
  }

  res.status(200).json(book);
};

/**
 * Controller function to get all books
 * @param {Request} req - Express request object with query parameters for filtering, sorting, and pagination
 * @param {Response} res - Express response object
 * @returns {Promise<void>} - Returns a JSON object with the books data
 */
export const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const { books, total } = await BookService.getAllBooks(req.query);
  res.status(200).json({ total, books });
});

/**
 * Controller function to update a book by ID
 * @param {Request} req - Express request object with params containing book ID and body containing update data
 * @param {Response} res - Express response object
 * @returns {Promise<void>} - Returns a JSON object with the updated book data
 */
export const updateBookById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const book = await BookService.updateBookById(
      new Types.ObjectId(id),
      req.body
    );
    if (!book) {
      throw new AppError("Book not found", 404);
    }
    res.status(200).json(book);
  }
);

/**
 * Controller function to delete a book by ID
 * @param {Request} req - Express request object with params containing book ID
 * @param {Response} res - Express response object
 * @returns {Promise<void>} - Returns a JSON object indicating successful deletion
 */
export const deleteBookById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await BookService.deleteBookById(new Types.ObjectId(id));
    res.status(200).json({ message: "Book deleted successfully" });
  }
);
