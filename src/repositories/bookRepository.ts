import { Types } from "mongoose";
import Book, { IBook } from "../models/bookModel";
import AppError from "../utils/appError";

/**
 * Create a new book
 * @param {Partial<IBook>} bookData - Data to create the book
 * @returns {Promise<IBook>} - Returns the created book
 * @throws {AppError} - Throws 400 if there's an error creating the book
 */
export const createBook = async (bookData: Partial<IBook>): Promise<IBook> => {
  try {
    const book = new Book(bookData);
    return await book.save();
  } catch (error) {
    throw new AppError("Error creating book", 400);
  }
};

/**
 * Find a book by ID
 * @param {Types.ObjectId} id - ID of the book
 * @returns {Promise<IBook | null>} - Returns the book if found, else null
 * @throws {AppError} - Throws 400 if there's an error fetching the book
 */
export const findBookById = async (
  id: Types.ObjectId
): Promise<IBook | null> => {
  try {
    return await Book.findById(id)
      .populate("author publisher genre reviews")
      .exec();
  } catch (error) {
    throw new AppError("Error finding book by ID", 400);
  }
};

/**
 * Find all books with filtering, sorting, and pagination
 * @param {any} queryParams - Query parameters for filtering, sorting, and pagination
 * @returns {Promise<{ books: IBook[]; total: number }>} - Returns books and total count
 * @throws {AppError} - Throws 400 if there's an error fetching books
 */
export const findAllBooks = async (
  queryParams: any
): Promise<{ books: IBook[]; total: number }> => {
  const { sort, limit, page, ...filters } = queryParams;

  const sortOptions = sort ? sort.split(",").join(" ") : "title";
  const limitValue = limit ? parseInt(limit, 10) : 10;
  const skipValue = page ? (parseInt(page, 10) - 1) * limitValue : 0;

  try {
    const books = await Book.find(filters)
      .populate("author publisher genre reviews")
      .sort(sortOptions)
      .skip(skipValue)
      .limit(limitValue)
      .exec();
    const total = await Book.countDocuments(filters).exec();

    return { books, total };
  } catch (error) {
    throw new AppError("Error fetching books", 400);
  }
};

/**
 * Update a book by ID
 * @param {Types.ObjectId} id - ID of the book
 * @param {Partial<IBook>} bookData - Data to update the book
 * @returns {Promise<IBook | null>} - Returns the updated book if found, else null
 * @throws {AppError} - Throws 400 if there's an error updating the book
 */
export const updateBookById = async (
  id: Types.ObjectId,
  bookData: Partial<IBook>
): Promise<IBook | null> => {
  try {
    return await Book.findByIdAndUpdate(id, bookData, { new: true }).exec();
  } catch (error) {
    throw new AppError("Error updating book", 400);
  }
};

/**
 * Delete a book by ID
 * @param {Types.ObjectId} id - ID of the book
 * @returns {Promise<IBook | null>} - Returns the deleted book if found, else null
 * @throws {AppError} - Throws 400 if there's an error deleting the book
 */
export const deleteBookById = async (
  id: Types.ObjectId
): Promise<IBook | null> => {
  try {
    return await Book.findByIdAndDelete(id).exec();
  } catch (error) {
    throw new AppError("Error deleting book", 400);
  }
};

/**
 * Add a subscription to a book
 * @param {string} bookId - ID of the book
 * @param {string} subscriptionId - ID of the subscription
 * @returns {Promise<IBook | null>} - Returns the updated book if found, else null
 * @throws {AppError} - Throws 400 if there's an error adding the subscription or invalid ID
 */
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
    return await Book.findByIdAndUpdate(
      bookId,
      { $addToSet: { subscriptions: subscriptionId } },
      { new: true }
    ).exec();
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
    return await Book.findByIdAndUpdate(
      bookId,
      { $pull: { subscriptions: subscriptionId } },
      { new: true }
    ).exec();
  } catch (error) {
    throw new AppError("Error removing subscription", 400);
  }
};
