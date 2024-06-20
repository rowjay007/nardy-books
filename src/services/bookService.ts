import { Types } from "mongoose";
import * as BookRepository from "../repositories/bookRepository";
import { IBook } from "../models/bookModel";

export const createBook = async (bookData: Partial<IBook>): Promise<IBook> =>
  BookRepository.createBook(bookData);

export const getBookById = async (id: Types.ObjectId): Promise<IBook | null> =>
  BookRepository.findBookById(id);

export const getAllBooks = async (
  queryParams: any
): Promise<{ books: IBook[]; total: number }> =>
  BookRepository.findAllBooks(queryParams);

export const updateBookById = async (
  id: Types.ObjectId,
  bookData: Partial<IBook>
): Promise<IBook | null> => BookRepository.updateBookById(id, bookData);

export const deleteBookById = async (
  id: Types.ObjectId
): Promise<IBook | null> => BookRepository.deleteBookById(id);
