import { Request, Response } from "express";
import BookService from "../services/bookService";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

class BookController {
  createBook = catchAsync(async (req: Request, res: Response) => {
    const book = await BookService.createBook(req.body);
    res.status(201).json(book);
  });

  getBookById = catchAsync(async (req: Request, res: Response) => {
    const book = await BookService.getBookById(req.params.id);
    if (!book) {
      throw new AppError("Book not found", 404);
    }
    res.status(200).json(book);
  });

  getAllBooks = catchAsync(async (req: Request, res: Response) => {
    const { books, total } = await BookService.getAllBooks(req.query);
    res.status(200).json({ total, books });
  });

  updateBookById = catchAsync(async (req: Request, res: Response) => {
    const book = await BookService.updateBookById(req.params.id, req.body);
    if (!book) {
      throw new AppError("Book not found", 404);
    }
    res.status(200).json(book);
  });

  deleteBookById = catchAsync(async (req: Request, res: Response) => {
    const book = await BookService.deleteBookById(req.params.id);
    if (!book) {
      throw new AppError("Book not found", 404);
    }
    res.status(200).json({ message: "Book deleted successfully" });
  });
}

export default new BookController();
