import { Request, Response } from "express";
import Book from "../models/book.model";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

export const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const books = await Book.find();
  res.status(200).json({ books });
});

export const createBook = catchAsync(async (req: Request, res: Response) => {
  const {
    title,
    author,
    ISBN,
    genre,
    description,
    publicationDate,
    language,
    coverImageURL,
  } = req.body;

  const newBook = await Book.create({
    title,
    author,
    ISBN,
    genre,
    description,
    publicationDate,
    language,
    coverImageURL,
  });

  res.status(201).json({ book: newBook });
});

export const getBookById = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;

  const book = await Book.findById(bookId);
  if (!book) {
    throw new AppError("Book not found", 404);
  }

  res.status(200).json({ book });
});

export const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const {
    title,
    author,
    ISBN,
    genre,
    description,
    publicationDate,
    language,
    coverImageURL,
  } = req.body;

  const updatedBook = await Book.findByIdAndUpdate(
    bookId,
    {
      title,
      author,
      ISBN,
      genre,
      description,
      publicationDate,
      language,
      coverImageURL,
    },
    { new: true }
  );

  if (!updatedBook) {
    throw new AppError("Book not found", 404);
  }

  res.status(200).json({ book: updatedBook });
});

export const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.params;

  const deletedBook = await Book.findByIdAndDelete(bookId);

  if (!deletedBook) {
    throw new AppError("Book not found", 404);
  }

  res.status(204).json();
});

export const searchBooks = catchAsync(async (req: Request, res: Response) => {
  const { query } = req.query;

  const books = await Book.find({
    $or: [{ title: { $regex: query, $options: "i" } }],
  });

  res.status(200).json({ books });
});
