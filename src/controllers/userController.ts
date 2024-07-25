import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import env from "../config/env";
import * as userService from "../services/userService";
import AppError from "../utils/appError";

interface AuthenticatedRequest extends Request {
  user?: string | jwt.JwtPayload;
}

/**
 * Generates an access token for a user
 * @param {string} userId - The ID of the user
 * @returns {string} The generated access token
 */
const generateAccessToken = (userId: string): string => {
  return jwt.sign({ id: userId }, env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

/**
 * Generates a refresh token for a user
 * @param {string} userId - The ID of the user
 * @returns {string} The generated refresh token
 */
const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ id: userId }, env.REFRESH_TOKEN_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRATION,
  });
};

/**
 * Controller function to register a new user
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with success message and user data
 */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;
    const user = await userService.register(username, email, password);
    res.status(httpStatus.CREATED).json({
      message:
        "Registration successful. Please check your email for verification.",
      user,
    });
  } catch (error) {
    next(error);
  }
};

// ... (login function already has JSDoc)

// ... (refreshTokens function already has JSDoc)

// ... (logout function already has JSDoc)

// ... (requestPasswordReset function already has JSDoc)

// ... (resetPassword function already has JSDoc)

// ... (changePassword function already has JSDoc)

// ... (verifyEmail function already has JSDoc)

// ... (resendVerificationEmail function already has JSDoc)

/**
 * Helper function to extract user ID from the request
 * @param {AuthenticatedRequest} req - Express request object extended with user information
 * @returns {string | undefined} - User ID if found, otherwise undefined
 */
const getUserIdFromRequest = (
  req: AuthenticatedRequest
): string | undefined => {
  const user = req.user as jwt.JwtPayload | undefined;
  return user?.id as string | undefined;
};

/**
 * Controller function to get the current authenticated user
 * @param {AuthenticatedRequest} req - Express request object extended with user information
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the current user data
 */
export const getCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = getUserIdFromRequest(req);

  try {
    if (!userId) {
      throw new AppError("User not authenticated", httpStatus.UNAUTHORIZED);
    }

    const user = await userService.getCurrentUser(userId);

    if (!user) {
      throw new AppError("User not found", httpStatus.NOT_FOUND);
    }

    res.status(httpStatus.OK).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to update the current authenticated user
 * @param {AuthenticatedRequest} req - Express request object extended with user information
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the updated user data
 */
export const updateCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = getUserIdFromRequest(req);
  const updateData = req.body;

  try {
    if (!userId) {
      throw new AppError("User not authenticated", httpStatus.UNAUTHORIZED);
    }

    const user = await userService.updateCurrentUser(userId, updateData);

    if (!user) {
      throw new AppError("User not found", httpStatus.NOT_FOUND);
    }

    res.status(httpStatus.OK).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to delete the current authenticated user
 * @param {AuthenticatedRequest} req - Express request object extended with user information
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with a success message
 */
export const deleteCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = getUserIdFromRequest(req);

  try {
    if (!userId) {
      throw new AppError("User not authenticated", httpStatus.UNAUTHORIZED);
    }

    const result = await userService.deleteCurrentUser(userId);

    if (!result) {
      throw new AppError("User not found", httpStatus.NOT_FOUND);
    }

    res.status(httpStatus.OK).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
