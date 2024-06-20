import { Types } from "mongoose";
import Book, { IBook } from "../models/bookModel";

export const createBook = async (bookData: Partial<IBook>): Promise<IBook> => {
  const book = new Book(bookData);
  return book.save();
};

export const findBookById = async (id: Types.ObjectId): Promise<IBook | null> =>
  Book.findById(id).populate("author publisher genre reviews").exec();

export const findAllBooks = async (
  queryParams: any
): Promise<{ books: IBook[]; total: number }> => {
  const { sort, limit, page, ...filters } = queryParams;

  const sortOptions = sort ? sort.split(",").join(" ") : "title";
  const limitValue = limit ? parseInt(limit, 10) : 10;
  const skipValue = page ? (parseInt(page, 10) - 1) * limitValue : 0;

  const booksQuery = Book.find(filters).populate(
    "author publisher genre reviews"
  );
  const books = await booksQuery
    .sort(sortOptions)
    .skip(skipValue)
    .limit(limitValue)
    .exec();
  const total = await Book.countDocuments(filters).exec();

  return { books, total };
};

export const updateBookById = async (
  id: Types.ObjectId,
  bookData: Partial<IBook>
): Promise<IBook | null> =>
  Book.findByIdAndUpdate(id, bookData, { new: true }).exec();

export const deleteBookById = async (
  id: Types.ObjectId
): Promise<IBook | null> => Book.findByIdAndDelete(id).exec();
