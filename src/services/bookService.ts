import { Types } from "mongoose";
import * as BookRepository from "../repositories/bookRepository";
import { IBook } from "../models/bookModel";
import cache from "../utils/cache";

import { CACHE_TTL_SECONDS } from "../utils/cache";

export const createBook = async (bookData: Partial<IBook>): Promise<IBook> =>
  BookRepository.createBook(bookData);

export const getBookById = async (
  id: Types.ObjectId
): Promise<IBook | null> => {
  const cacheKey = `book_${id.toString()}`;
  let book: IBook | any = cache.get<IBook>(cacheKey);

  if (book === undefined) {
    const fetchedBook = await BookRepository.findBookById(id);
    if (fetchedBook) {
      book = fetchedBook;
      cache.set(cacheKey, book, CACHE_TTL_SECONDS);
    } else {
      book = null;
    }
  }

  return book;
};

export const getAllBooks = async (
  queryParams: any
): Promise<{ books: IBook[]; total: number }> => {
  const cacheKey = `allBooks_${JSON.stringify(queryParams)}`;
  let cachedData = cache.get<{ books: IBook[]; total: number }>(cacheKey);

  if (!cachedData) {
    cachedData = await BookRepository.findAllBooks(queryParams);
    cache.set(cacheKey, cachedData, CACHE_TTL_SECONDS);
  }

  return cachedData;
};

export const updateBookById = async (
  id: Types.ObjectId,
  bookData: Partial<IBook>
): Promise<IBook | null> => BookRepository.updateBookById(id, bookData);

export const deleteBookById = async (
  id: Types.ObjectId
): Promise<IBook | null> => BookRepository.deleteBookById(id);
