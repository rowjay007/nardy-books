import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import * as AuthorService from "../services/authorService";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

export const createAuthor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const author = await AuthorService.createAuthor(req.body);
    res.status(201).json({
      status: "success",
      data: {
        author,
      },
    });
  }
);

export const getAuthorById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = new Types.ObjectId(req.params.id);
    const author = await AuthorService.getAuthorById(authorId);
    if (!author) {
      return next(new AppError("No author found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        author,
      },
    });
  }
);

export const getAllAuthors = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      page = 1,
      limit = 10,
      sortBy = "name",
      sortOrder = "asc",
    } = req.query;

    const authorsData = await AuthorService.getAllAuthors(
      name as string,
      parseInt(page as string, 10),
      parseInt(limit as string, 10),
      sortBy as string,
      sortOrder as string
    );

    res.status(200).json({
      status: "success",
      data: {
        authors: authorsData.authors,
        total: authorsData.total,
        page: authorsData.page,
        limit: authorsData.limit,
      },
    });
  }
);

export const updateAuthorById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = new Types.ObjectId(req.params.id);
    const author = await AuthorService.updateAuthorById(authorId, req.body);
    if (!author) {
      return next(new AppError("No author found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        author,
      },
    });
  }
);

export const deleteAuthorById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = new Types.ObjectId(req.params.id);
    const author = await AuthorService.deleteAuthorById(authorId);
    if (!author) {
      return next(new AppError("No author found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
//TODO: add successfully deleted messages

export const addBookToAuthor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = new Types.ObjectId(req.params.authorId);
    const bookId = new Types.ObjectId(req.params.bookId);
    const author = await AuthorService.addBookToAuthor(authorId, bookId);
    if (!author) {
      return next(new AppError("No author found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        author,
      },
    });
  }
);
