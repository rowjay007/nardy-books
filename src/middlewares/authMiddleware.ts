import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env";
import AppError from "../utils/appError";

interface AuthenticatedRequest extends Request {
  user?: jwt.JwtPayload;
}

export const protect = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = extractTokenFromHeader(req);

  if (!token) {
    return next(new AppError("Unauthorized access", 401));
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return next(new AppError("Invalid token", 401));
  }
};

const extractTokenFromHeader = (
  req: AuthenticatedRequest
): string | undefined => {
  const authHeader = req.headers.authorization;
  return authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : undefined;
};
