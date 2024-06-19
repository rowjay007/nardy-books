import * as AuthorRepository from "../repositories/authorRepository";
import { IAuthor } from "../models/authorModel";
import { Types } from "mongoose";

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

export const getAllAuthors = async (
  name?: string,
  page = 1,
  limit = 10,
  sortBy = "name",
  sortOrder = "asc"
): Promise<{
  authors: IAuthor[];
  total: number;
  page: number;
  limit: number;
}> => {
  const filter: any = {};
  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }

  const sort: any = {};
  sort[sortBy] = sortOrder === "desc" ? -1 : 1;

  const authors = await AuthorRepository.getAllAuthors(
    filter,
    page,
    limit,
    sort
  );
  const total = await AuthorRepository.getTotalCount(filter);

  return {
    authors,
    total,
    page,
    limit,
  };
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
