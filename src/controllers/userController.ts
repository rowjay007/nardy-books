import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";
import AppError from "../utils/appError";

/**
 * Controller function to get all users
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 */
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filter = {}; 
    const sort = {}; 
    const limit = 10; 
    const skip = 0; 

    const users = await userService.getAllUsers(filter, sort, limit, skip);
    res.status(200).json({
      status: "success",
      data: { users },
    });
  } catch (error) {
    next(error);
  }
};


/**
 * Controller function to get a user by ID
 * @param req Express request object with params containing user ID
 * @param res Express response object
 * @param next Express next function
 */
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;

  try {
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to update a user
 * @param req Express request object with params containing user ID and body containing update data
 * @param res Express response object
 * @param next Express next function
 */
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;
  const updateData = req.body;

  try {
    const updatedUser = await userService.updateUser(userId, updateData);
    res.status(200).json({
      status: "success",
      data: { user: updatedUser },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to delete a user
 * @param req Express request object with params containing user ID
 * @param res Express response object
 * @param next Express next function
 */
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;

  try {
    await userService.deleteUser(userId);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
