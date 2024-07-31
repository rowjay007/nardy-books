import { Types } from "mongoose";
import * as BookRepository from "../repositories/bookRepository";
import { IBook } from "../models/bookModel";
import cache, { CACHE_TTL_SECONDS } from "../utils/cache";
import AppError from "../utils/appError";


export const createBook = async (bookData: Partial<IBook>): Promise<IBook> => {
  try {
    const book = await BookRepository.createBook(bookData);
    cache.flushAll();
    return book;
  } catch (error) {
    throw new AppError("Error creating book", 400);
  }
};

export const getBookById = async (
  id: Types.ObjectId
): Promise<IBook | null> => {
  const cacheKey = `book_${id.toString()}`;
  let book: IBook | any = cache.get<IBook>(cacheKey);

  if (book === undefined) {
    try {
      const fetchedBook = await BookRepository.findBookById(id);
      if (fetchedBook) {
        book = fetchedBook;
        cache.set(cacheKey, book, CACHE_TTL_SECONDS);
      } else {
        book = null;
      }
    } catch (error) {
      throw new AppError("Error fetching book", 400);
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
    try {
      cachedData = await BookRepository.findAllBooks(queryParams);
      cache.set(cacheKey, cachedData, CACHE_TTL_SECONDS);
    } catch (error) {
      throw new AppError("Error fetching books", 400);
    }
  }

  return cachedData;
};


export const updateBookById = async (
  id: Types.ObjectId,
  bookData: Partial<IBook>
): Promise<IBook | null> => {
  try {
    const book = await BookRepository.updateBookById(id, bookData);
    if (book) {
      cache.flushAll(); 
    }
    return book;
  } catch (error) {
    throw new AppError("Error updating book", 400);
  }
};


export const deleteBookById = async (
  id: Types.ObjectId
): Promise<IBook | null> => {
  try {
    const book = await BookRepository.deleteBookById(id);
    if (book) {
      cache.flushAll(); 
    }
    return book;
  } catch (error) {
    throw new AppError("Error deleting book", 400);
  }
};


export const addSubscriptionToBook = async (
  bookId: string,
  subscriptionId: string
) => {
  if (
    !Types.ObjectId.isValid(bookId) ||
    !Types.ObjectId.isValid(subscriptionId)
  ) {
    throw new AppError("Invalid ID", 400);
  }

  try {
    const updatedBook = await BookRepository.addSubscriptionToBook(
      bookId,
      subscriptionId
    );
    cache.flushAll(); 
    return updatedBook;
  } catch (error) {
    throw new AppError("Error adding subscription", 400);
  }
};

/**
 * Remove a subscription from a book
 * @param {string} bookId - ID of the book
 * @param {string} subscriptionId - ID of the subscription
 * @returns {Promise<IBook | null>} - Returns the updated book if found, else null
 * @throws {AppError} - Throws 400 if there's an error removing the subscription or invalid ID
 */
export const removeSubscriptionFromBook = async (
  bookId: string,
  subscriptionId: string
) => {
  if (
    !Types.ObjectId.isValid(bookId) ||
    !Types.ObjectId.isValid(subscriptionId)
  ) {
    throw new AppError("Invalid ID", 400);
  }

  try {
    const updatedBook = await BookRepository.removeSubscriptionFromBook(
      bookId,
      subscriptionId
    );
    cache.flushAll(); 
    return updatedBook;
  } catch (error) {
    throw new AppError("Error removing subscription", 400);
  }
};
