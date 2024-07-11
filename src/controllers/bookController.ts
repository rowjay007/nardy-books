import { Request, Response } from "express";
import { Types } from "mongoose";
import * as BookService from "../services/bookService";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

export const createBook = catchAsync(async (req: Request, res: Response) => {
  const book = await BookService.createBook(req.body);
  res.status(201).json(book);
});

export const getBookById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await BookService.getBookById(new Types.ObjectId(id));
  if (!book) {
    throw new AppError("Book not found", 404);
  }
  res.status(200).json(book);
});

export const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const { books, total } = await BookService.getAllBooks(req.query);
  res.status(200).json({ total, books });
});

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

export const deleteBookById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await BookService.deleteBookById(new Types.ObjectId(id));
    res.status(200).json({ message: "Book deleted successfully" });
  }
);
//TODO: add successfully deleted messages
