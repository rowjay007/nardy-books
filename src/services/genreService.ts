import * as GenreRepository from "../repositories/genreRepository";
import { IGenre } from "../models/genreModel";
import { Types } from "mongoose";

export const createGenre = async (genreData: Partial<IGenre>) => {
  return GenreRepository.createGenre(genreData);
};

export const getGenreById = async (id: Types.ObjectId) => {
  return GenreRepository.getGenreById(id);
};

export const getAllGenres = async (
  filter: Record<string, any>,
  page: number,
  limit: number,
  sort: string | Record<string, number> | null | undefined
) => {
  return GenreRepository.getAllGenres(filter, page, limit, sort);
};


export const updateGenreById = async (
  id: Types.ObjectId,
  updateData: Partial<IGenre>
) => {
  return GenreRepository.updateGenreById(id, updateData);
};

export const deleteGenreById = async (id: Types.ObjectId) => {
  return GenreRepository.deleteGenreById(id);
};

export const addBookToGenre = async (
  genreId: Types.ObjectId,
  bookId: Types.ObjectId
) => {
  return await GenreRepository.addBookToGenre(genreId, bookId);
};
