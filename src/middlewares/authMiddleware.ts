import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env";
import AppError from "../utils/appError";

// Extend the Request interface to include userId
interface AuthenticatedRequest extends Request {
  userId?: string;
}

/**
 * Middleware to protect routes by ensuring the request has a valid token
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {void}
 */
export const protect = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized access", 401));
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new AppError("Invalid token", 401));
    }

    req.userId = (decoded as { id: string }).id;
    next();
  });
};

/**
 * Extracts JWT token from Authorization header
 * @param req Express request object
 * @returns JWT token string or undefined
 */
const extractTokenFromHeader = (
  req: AuthenticatedRequest
): string | undefined => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  return undefined;
};
