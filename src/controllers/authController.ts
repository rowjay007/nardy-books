import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env";
import userService from "../services/userService";
import AppError from "../utils/appError";
import httpStatus from "http-status";

interface AuthenticatedRequest extends Request {
  user?: string | jwt.JwtPayload;
}

/**
 * Generates an access token for the given user ID
 * @param {string} userId - User ID
 * @returns {string} Generated access token
 */
const generateAccessToken = (userId: string): string => {
  return jwt.sign({ id: userId }, env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

/**
 * Generates a refresh token for the given user ID
 * @param {string} userId - User ID
 * @returns {string} Generated refresh token
 */
const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ id: userId }, env.REFRESH_TOKEN_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRATION,
  });
};

/**
 * Controller function to register a new user
 * @param {Request} req - Express request object with body containing username, email, and password
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the created user data
 */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    const user = await userService.register(username, email, password);

    res.status(httpStatus.CREATED).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to authenticate a user and generate access token
 * @param {Request} req - Express request object with body containing email and password
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the authenticated user data and access token
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const { user, accessToken } = await userService.login(email, password);

    res.status(httpStatus.OK).json({
      status: "success",
      data: { user, accessToken },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to logout a user
 * @param {AuthenticatedRequest} req - Express request object extended with user information
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object indicating successful logout
 */
export const logout = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = getUserIdFromRequest(req);

  try {
    if (!userId) {
      throw new AppError("User not authenticated", httpStatus.UNAUTHORIZED);
    }

    await userService.logout(userId);

    res.status(httpStatus.NO_CONTENT).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to refresh access and refresh tokens
 * @param {Request} req - Express request object with body containing refreshToken
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with new access and refresh tokens
 */
export const refreshTokens = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return next(
      new AppError("Refresh token is required", httpStatus.BAD_REQUEST)
    );
  }

  try {
    const decoded = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET) as {
      id: string;
    };

    const accessToken = generateAccessToken(decoded.id);
    const newRefreshToken = generateRefreshToken(decoded.id);

    res.status(httpStatus.OK).json({
      status: "success",
      data: { accessToken, refreshToken: newRefreshToken },
    });
  } catch (error) {
    next(
      new AppError("Invalid or expired refresh token", httpStatus.UNAUTHORIZED)
    );
  }
};

/**
 * Controller function to request a password reset for a user
 * @param {Request} req - Express request object with body containing email
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with a password reset token
 */
export const requestPasswordReset = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;

  try {
    const token = await userService.requestPasswordReset(email);

    res.status(httpStatus.OK).json({
      status: "success",
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to reset a user's password using a reset token
 * @param {Request} req - Express request object with params containing token and body containing newPassword
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the updated user data
 */
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await userService.resetPassword(token, newPassword);

    res.status(httpStatus.OK).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to change a user's password
 * @param {AuthenticatedRequest} req - Express request object extended with user information
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the updated user data
 */
export const changePassword = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { currentPassword, newPassword } = req.body;
  const userId = getUserIdFromRequest(req);

  try {
    if (!userId) {
      throw new AppError("User not authenticated", httpStatus.UNAUTHORIZED);
    }

    const user = await userService.changePassword(
      userId,
      currentPassword,
      newPassword
    );

    res.status(httpStatus.OK).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to verify a user's email using a verification token
 * @param {Request} req - Express request object with params containing token
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the updated user data
 */
export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { token } = req.params;

  try {
    const user = await userService.verifyEmail(token);

    res.status(httpStatus.OK).json({
      status: "success",
      message: "Email verified successfully.",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to resend a verification email to the authenticated user
 * @param {AuthenticatedRequest} req - Express request object extended with user information
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object indicating success message
 */
export const resendVerificationEmail = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = getUserIdFromRequest(req);

  try {
    if (!userId) {
      throw new AppError("User not authenticated", httpStatus.UNAUTHORIZED);
    }

    await userService.resendVerificationEmail(userId);

    res.status(httpStatus.OK).json({
      status: "success",
      message: "Verification email resent successfully",
    });
  } catch (error) {
    next(error);
  }
};

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

export { generateAccessToken, generateRefreshToken };
