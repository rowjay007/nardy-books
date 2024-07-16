import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

/**
 * Controller function to get all users
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 */
export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filter = {};
    const sort = {};
    const limit = 10;
    const skip = 0;

    const users = await userService.getAllUsers(filter, sort, limit, skip);
    res.status(200).json({
      status: "success",
      data: { users },
    });
  }
);

/**
 * Controller function to get a user by ID
 * @param req Express request object with params containing user ID
 * @param res Express response object
 * @param next Express next function
 */
export const getUserById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    res.status(200).json({
      status: "success",
      data: { user },
    });
  }
);

/**
 * Controller function to update a user
 * @param req Express request object with params containing user ID and body containing update data
 * @param res Express response object
 * @param next Express next function
 */
export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const updateData = req.body;
    const updatedUser = await userService.updateUser(userId, updateData);
    res.status(200).json({
      status: "success",
      data: { user: updatedUser },
    });
  }
);

/**
 * Controller function to delete a user
 * @param req Express request object with params containing user ID
 * @param res Express response object
 * @param next Express next function
 */
export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    await userService.deleteUser(userId);
    res.status(200).json({
      status: "success",
      message: "User successfully deleted",
      data: null,
    });
  }
);
