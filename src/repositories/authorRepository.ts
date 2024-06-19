import Author, { IAuthor } from "../models/authorModel";
import { Types } from "mongoose";

export const createAuthor = async (
  authorData: Partial<IAuthor>
): Promise<IAuthor> => {
  const author = new Author(authorData);
  return author.save();
};

export const getAuthorById = async (
  id: Types.ObjectId
): Promise<IAuthor | null> => {
  return Author.findById(id).populate("books").exec();
};

export const getAllAuthors = async (): Promise<IAuthor[]> => {
  return Author.find().populate("books").exec();
};

export const updateAuthorById = async (
  id: Types.ObjectId,
  updateData: Partial<IAuthor>
): Promise<IAuthor | null> => {
  return Author.findByIdAndUpdate(id, updateData, { new: true })
    .populate("books")
    .exec();
};

export const deleteAuthorById = async (
  id: Types.ObjectId
): Promise<IAuthor | null> => {
  return Author.findByIdAndDelete(id).exec();
};

export const addBookToAuthor = async (
  authorId: Types.ObjectId,
  bookId: Types.ObjectId
): Promise<IAuthor | null> => {
  return Author.findByIdAndUpdate(
    authorId,
    { $push: { books: bookId } },
    { new: true }
  )
    .populate("books")
    .exec();
};
