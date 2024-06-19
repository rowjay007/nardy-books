import { Types } from "mongoose";
import Author, { IAuthor } from "../models/authorModel";

export const createAuthor = async (
  authorData: Partial<IAuthor>
): Promise<IAuthor> => {
  const author = new Author(authorData);
  await author.save();
  return author;
};

export const getAuthorById = async (
  id: Types.ObjectId
): Promise<IAuthor | null> => {
  return Author.findById(id).populate("books");
};

export const getAllAuthors = async (
  filter: Record<string, any>,
  page: number,
  limit: number,
  sort: Record<string, "asc" | "desc">
): Promise<IAuthor[]> => {
  return Author.find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("books");
};

export const updateAuthorById = async (
  id: Types.ObjectId,
  updateData: Partial<IAuthor>
): Promise<IAuthor | null> => {
  return Author.findByIdAndUpdate(id, updateData, { new: true }).populate(
    "books"
  );
};

export const deleteAuthorById = async (
  id: Types.ObjectId
): Promise<IAuthor | null> => {
  return Author.findByIdAndDelete(id);
};

export const addBookToAuthor = async (
  authorId: Types.ObjectId,
  bookId: Types.ObjectId
): Promise<IAuthor | null> => {
  return Author.findByIdAndUpdate(
    authorId,
    { $push: { books: bookId } },
    { new: true }
  ).populate("books");
};

export const getTotalCount = async (
  filter: Record<string, any>
): Promise<number> => {
  return Author.countDocuments(filter);
};
