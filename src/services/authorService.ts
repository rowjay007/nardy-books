import * as AuthorRepository from "../repositories/authorRepository";
import { IAuthor } from "../models/authorModel";
import { Types } from "mongoose";
import cache, { CACHE_TTL_SECONDS } from "../utils/cache";

export const createAuthor = async (
  authorData: Partial<IAuthor>
): Promise<IAuthor> => {
  return AuthorRepository.createAuthor(authorData);
};

export const getAuthorById = async (
  id: Types.ObjectId
): Promise<IAuthor | null> => {
  const cacheKey = `author_${id.toString()}`;
  let author: IAuthor | any = cache.get<IAuthor>(cacheKey);

  if (author === undefined) {
    const fetchedAuthor = await AuthorRepository.getAuthorById(id);
    if (fetchedAuthor) {
      author = fetchedAuthor;
      cache.set(cacheKey, author, CACHE_TTL_SECONDS);
    } else {
      author = null;
    }
  }

  return author;
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

  const cacheKey = `allAuthors_${JSON.stringify({
    filter,
    page,
    limit,
    sort,
  })}`;
  let cachedData = cache.get<{ authors: IAuthor[]; total: number }>(cacheKey);

  if (!cachedData) {
    const authors = await AuthorRepository.getAllAuthors(
      filter,
      page,
      limit,
      sort
    );
    const total = await AuthorRepository.getTotalCount(filter);
    cachedData = { authors, total };
    cache.set(cacheKey, cachedData, CACHE_TTL_SECONDS);
  }

  return { ...cachedData, page, limit };
};

export const updateAuthorById = async (
  id: Types.ObjectId,
  updateData: Partial<IAuthor>
): Promise<IAuthor | null> => {
  const author = await AuthorRepository.updateAuthorById(id, updateData);
  if (author) {
    cache.set(`author_${id.toString()}`, author, CACHE_TTL_SECONDS);
  }
  return author;
};

export const deleteAuthorById = async (
  id: Types.ObjectId
): Promise<IAuthor | null> => {
  const author = await AuthorRepository.deleteAuthorById(id);
  if (author) {
    cache.del(`author_${id.toString()}`);
  }
  return author;
};

export const addBookToAuthor = async (
  authorId: Types.ObjectId,
  bookId: Types.ObjectId
): Promise<IAuthor | null> => {
  const author = await AuthorRepository.addBookToAuthor(authorId, bookId);
  if (author) {
    cache.set(`author_${authorId.toString()}`, author, CACHE_TTL_SECONDS);
  }
  return author;
};
