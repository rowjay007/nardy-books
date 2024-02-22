// book.controller.ts
import { Request, Response } from "express";
import Book from "../models/book.model";

export const getAllBooks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const books = await Book.find();
    res.status(200).json({ books });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error getting books:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

export const createBook = async (
  req: Request,
  res: Response
): Promise<void> => {
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

  try {
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating book:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

export const getBookById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { bookId } = req.params;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      res.status(404).json({ error: "Book not found" });
      return;
    }

    res.status(200).json({ book });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error getting book by ID:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};
