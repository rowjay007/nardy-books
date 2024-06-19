import { IAuthor } from "../models/authorModel";
import { Types } from "mongoose";
import * as AuthorRepository from "../repositories/authorRepository";

export const createAuthor = async (
  authorData: Partial<IAuthor>
): Promise<IAuthor> => {
  return AuthorRepository.createAuthor(authorData);
};

export const getAuthorById = async (
  id: Types.ObjectId
): Promise<IAuthor | null> => {
  return AuthorRepository.getAuthorById(id);
};

export const getAllAuthors = async (): Promise<IAuthor[]> => {
  return AuthorRepository.getAllAuthors();
};

export const updateAuthorById = async (
  id: Types.ObjectId,
  updateData: Partial<IAuthor>
): Promise<IAuthor | null> => {
  return AuthorRepository.updateAuthorById(id, updateData);
};

export const deleteAuthorById = async (
  id: Types.ObjectId
): Promise<IAuthor | null> => {
  return AuthorRepository.deleteAuthorById(id);
};

export const addBookToAuthor = async (
  authorId: Types.ObjectId,
  bookId: Types.ObjectId
): Promise<IAuthor | null> => {
  return AuthorRepository.addBookToAuthor(authorId, bookId);
};
