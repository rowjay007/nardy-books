import { Request, Response, NextFunction } from "express";
import * as PublisherService from "../services/publisherService";
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


export const createPublisher = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const publisher = await PublisherService.createPublisher(req.body);
    res.status(201).json({
      status: "success",
      data: {
        publisher,
      },
    });
  }
);

export const getPublisherById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const publisherId = convertToObjectId(req.params.id); 
    const publisher = await PublisherService.getPublisherById(publisherId);
    if (!publisher) {
      return next(new AppError("No publisher found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        publisher,
      },
    });
  }
);

export const getAllPublishers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const publishers = await PublisherService.getAllPublishers({}, page, limit, {});

      res.status(200).json({
        status: "success",
        data: {
          publishers,
        },
      });
    } catch (error) {
      next(new AppError("Unable to fetch publishers", 500)); 
    }
  }
);





export const updatePublisherById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const publisherId = convertToObjectId(req.params.id); 
    const publisher = await PublisherService.updatePublisherById(
      publisherId,
      req.body
    );
    if (!publisher) {
      return next(new AppError("No publisher found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        publisher,
      },
    });
  }
);

export const deletePublisherById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const publisherId = convertToObjectId(req.params.id);
    const publisherDeleted = await PublisherService.deletePublisherById(
      publisherId
    );
    if (!publisherDeleted) {
      return next(new AppError("No publisher found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
//TODO: add successfully deleted messages

export const addBookToPublisher = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const publisherId = convertToObjectId(req.params.publisherId);
    const bookId = convertToObjectId(req.params.bookId);

    const publisher = await PublisherService.addBookToPublisher(
      publisherId,
      bookId
    );

    if (!publisher) {
      return next(new AppError("No publisher found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        publisher,
      },
    });
  }
);


