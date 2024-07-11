import { Types } from "mongoose";
import { IGenre } from "../models/genreModel";
import * as GenreRepository from "../repositories/genreRepository";
import cache, { CACHE_TTL_SECONDS } from "../utils/cache";

export const createGenre = async (genreData: Partial<IGenre>) => {
  const genre = await GenreRepository.createGenre(genreData);
  cache.flushAll(); 
  
  return genre;
};

export const getGenreById = async (id: Types.ObjectId) => {
  const cacheKey = `genre_${id}`;
  let genre: IGenre | undefined = cache.get<IGenre>(cacheKey);

  if (!genre) {
    const genreFromDb = await GenreRepository.getGenreById(id);
    if (genreFromDb) {
      genre = genreFromDb;
      cache.set(cacheKey, genre, CACHE_TTL_SECONDS);
    }
  }

  return genre;
};

export const getAllGenres = async (
  filter: Record<string, any>,
  page: number,
  limit: number,
  sort: string | Record<string, number> | null | undefined
) => {
  const cacheKey = `genres_${JSON.stringify(
    filter
  )}_${page}_${limit}_${JSON.stringify(sort)}`;
  let genres: IGenre[] | undefined = cache.get<IGenre[]>(cacheKey);

  if (!genres) {
    genres = await GenreRepository.getAllGenres(filter, page, limit, sort);
    if (genres) {
      cache.set(cacheKey, genres, CACHE_TTL_SECONDS);
    }
  }

  return genres;
};

export const updateGenreById = async (
  id: Types.ObjectId,
  updateData: Partial<IGenre>
) => {
  const genre = await GenreRepository.updateGenreById(id, updateData);
  if (genre) {
    cache.flushAll(); 
    
  }
  return genre;
};

export const deleteGenreById = async (id: Types.ObjectId) => {
  const genre = await GenreRepository.deleteGenreById(id);
  if (genre) {
    cache.flushAll(); 
    
  }
  return genre;
};

export const addBookToGenre = async (
  genreId: Types.ObjectId,
  bookId: Types.ObjectId
) => {
  const genre = await GenreRepository.addBookToGenre(genreId, bookId);
  if (genre) {
    cache.flushAll(); 
    
  }
  return genre;
};
