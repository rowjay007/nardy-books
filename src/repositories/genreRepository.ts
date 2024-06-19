import { Types } from "mongoose";
import Genre, { IGenre } from "../models/genreModel";

export const createGenre = async (genreData: Partial<IGenre>) => {
  return await Genre.create(genreData);
};

export const getGenreById = async (id: Types.ObjectId) => {
  return await Genre.findById(id).populate("books");
};

export const getAllGenres = async (
  filter: Record<string, any>,
  page: number,
  limit: number,
  sort: string | Record<string, number> | null | undefined
) => {
  let sortOption = {};

  if (typeof sort === "string") {
    sortOption = { [sort]: 1 }; 
  } else if (Array.isArray(sort)) {
    sortOption = Object.fromEntries(sort.map((s) => [s, 1]));
  } else if (typeof sort === "object" && sort !== null) {
    sortOption = sort;
  }

  return await Genre.find(filter)
    .sort(sortOption)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("books");
};

export const updateGenreById = async (
  id: Types.ObjectId,
  updateData: Partial<IGenre>
) => {
  return await Genre.findByIdAndUpdate(id, updateData, { new: true }).populate(
    "books"
  );
};

export const deleteGenreById = async (id: Types.ObjectId) => {
  return await Genre.findByIdAndDelete(id);
};

export const addBookToGenre = async (
  genreId: Types.ObjectId,
  bookId: Types.ObjectId
) => {
  const genre = await Genre.findByIdAndUpdate(
    genreId,
    {
      $push: { books: bookId },
    },
    { new: true, useFindAndModify: false }
  ).populate("books");

  return genre;
};