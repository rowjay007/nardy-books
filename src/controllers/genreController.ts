import { Request, Response, NextFunction } from "express";
import * as GenreService from "../services/genreService";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { Types } from "mongoose";

const convertToObjectId = (id: string) => {
  try {
    return new Types.ObjectId(id);
  } catch (error) {
    throw new AppError("Invalid ID format", 400);
  }
};

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

export const deleteGenreById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const genreId = convertToObjectId(req.params.id);
    const genre = await GenreService.deleteGenreById(genreId);
    if (!genre) {
      return next(new AppError("No genre found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);

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
