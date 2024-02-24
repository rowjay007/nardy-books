import { Request, Response, NextFunction } from "express";
import AppError from "./appError";

const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: any) =>
      next(new AppError(err.message, 500))
    );
  };
};

export default catchAsync;
