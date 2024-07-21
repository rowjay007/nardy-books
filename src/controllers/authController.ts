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
 * @param {string} userId - The ID of the user for whom the token is generated
 * @returns {string} - The generated access token
 */
const generateAccessToken = (userId: string): string => {
  return jwt.sign({ id: userId }, env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

/**
 * Generates a refresh token for a user
 * @param {string} userId - The ID of the user for whom the token is generated
 * @returns {string} - The generated refresh token
 */
const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ id: userId }, env.REFRESH_TOKEN_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRATION,
  });
};

/**
 * Controller function to register a new user
 * @param {Request} req - Express request object containing user registration details in the body
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with a success message and user data
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

/**
 * Controller function to log in a user
 * @param {Request} req - Express request object containing login credentials in the body
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with success message, user data, access token, and refresh token
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await userService.login(
      email,
      password
    );

    res.cookie("accessToken",  accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      maxAge: 60 * 60 * 1000, 
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000, 
    });

    res.status(httpStatus.OK).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    next(error);
  }
};


/**
 * Controller function to log out a user
 * @param {AuthenticatedRequest} req - Express request object extended with user information
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with a success message
 */
export const logout = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user || typeof req.user === "string") {
      throw new AppError("Unauthorized", 401);
    }

    await userService.logout(req.user.id);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(httpStatus.OK).json({
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};
//TODO fix logout issues and cookies clearance

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
  const refreshToken = req.body.refreshToken || req.cookies["refreshToken"];

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

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000, 
    });
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000, 
    });

    res.status(httpStatus.OK).json({
      status: "success",
      message: "Tokens refreshed successfully",
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
