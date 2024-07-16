import { Request, Response, NextFunction } from "express";
import * as GenreService from "../services/genreService";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { Types } from "mongoose";

/**
 * Converts a string to a Mongoose ObjectId.
 * @param {string} id - The ID to convert.
 * @returns {Types.ObjectId} - The converted ObjectId.
 * @throws {AppError} - Throws an error if the ID format is invalid.
 */
const convertToObjectId = (id: string): Types.ObjectId => {
  try {
    return new Types.ObjectId(id);
  } catch (error) {
    throw new AppError("Invalid ID format", 400);
  }
};

/**
 * Controller function to create a genre
 * @param {Request} req - Express request object with body containing genre data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the created genre data
 */
export const createGenre = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const genre = await GenreService.createGenre(req.body);
    res.status(201).json({
      status: "success",
      data: {
        genre,
      },
    });
  }
);

/**
 * Controller function to get a genre by ID
 * @param {Request} req - Express request object with params containing genre ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the genre data
 */
export const getGenreById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const genreId = convertToObjectId(req.params.id);
    const genre = await GenreService.getGenreById(genreId);
    if (!genre) {
      return next(new AppError("No genre found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        genre,
      },
    });
  }
);

/**
 * Controller function to get all genres
 * @param {Request} req - Express request object with query parameters for filtering, sorting, and pagination
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the genres data
 */
export const getAllGenres = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const sortQuery = req.query.sort as
      | string
      | Record<string, number>
      | null
      | undefined;

    const genres = await GenreService.getAllGenres(
      req.query.filter as Record<string, any>,
      Number(req.query.page),
      Number(req.query.limit),
      sortQuery
    );
    res.status(200).json({
      status: "success",
      data: {
        genres,
      },
    });
  }
);

/**
 * Controller function to update a genre by ID
 * @param {Request} req - Express request object with params containing genre ID and body containing update data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the updated genre data
 */
export const updateGenreById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const genreId = convertToObjectId(req.params.id);
    const genre = await GenreService.updateGenreById(genreId, req.body);
    if (!genre) {
      return next(new AppError("No genre found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        genre,
      },
    });
  }
);

/**
 * Controller function to delete a genre by ID
 * @param {Request} req - Express request object with params containing genre ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object indicating successful deletion
 */
export const deleteGenreById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const genreId = convertToObjectId(req.params.id);
    const genre = await GenreService.deleteGenreById(genreId);
    if (!genre) {
      return next(new AppError("No genre found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      message: "Genre successfully deleted",
      data: null,
    });
  }
);

/**
 * Controller function to add a book to a genre
 * @param {Request} req - Express request object with params containing genre ID and book ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the updated genre data
 */
export const addBookToGenre = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { genreId, bookId } = req.params;
    const genre = await GenreService.addBookToGenre(
      convertToObjectId(genreId),
      convertToObjectId(bookId)
    );
    if (!genre) {
      return next(new AppError("No genre found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        genre,
      },
    });
  }
);
