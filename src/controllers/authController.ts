import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import env from "../config/env";
import userService from "../services/userService";
import AppError from "../utils/appError";
import httpStatus from "http-status";

interface AuthenticatedRequest extends Request {
  user?: string | jwt.JwtPayload;
}

const generateAccessToken = (userId: string) => {
  return jwt.sign({ id: userId }, env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, env.REFRESH_TOKEN_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRATION,
  });
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  try {
    const user = await userService.register(username, email, password);

    res.status(201).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const { user, accessToken } = await userService.login(
      email,
      password
    );

    res.status(200).json({
      status: "success",
      data: { user, accessToken },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserIdFromRequest(req);

  try {
    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }

    await userService.logout(userId);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshTokens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return next(new AppError("Refresh token is required", 400));
  }

  try {
    const decoded = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET) as {
      id: string;
    };

    const accessToken = generateAccessToken(decoded.id);
    const newRefreshToken = generateRefreshToken(decoded.id);

    res.status(200).json({
      status: "success",
      data: { accessToken, refreshToken: newRefreshToken },
    });
  } catch (error) {
    next(new AppError("Invalid or expired refresh token", 401));
  }
};

export const requestPasswordReset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  try {
    const token = await userService.requestPasswordReset(email);

    res.status(200).json({
      status: "success",
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await userService.resetPassword(token, newPassword);

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { currentPassword, newPassword } = req.body;
  const userId = getUserIdFromRequest(req);

  try {
    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }

    const user = await userService.changePassword(
      userId,
      currentPassword,
      newPassword
    );

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

export const resendVerificationEmail = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = getUserIdFromRequest(req);

  try {
    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }

    await userService.resendVerificationEmail(userId);

    res.status(200).json({
      status: "success",
      message: "Verification email resent successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Helper function to get userId from request user
 * @param req Express request object
 * @returns User ID as string or undefined
 */
const getUserIdFromRequest = (
  req: AuthenticatedRequest
): string | undefined => {
  const user = req.user as jwt.JwtPayload | undefined;
  return user?.id as string | undefined;
};

export { generateAccessToken, generateRefreshToken };
