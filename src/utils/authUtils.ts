import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/types"; 

/**
 * Extracts the user ID from an authenticated request
 * @param {AuthenticatedRequest} req - Express request object extended with user information
 * @returns {string | undefined} - User ID or undefined
 */
export const getUserIdFromRequest = (
  req: AuthenticatedRequest
): string | undefined => {
  const user = req.user as jwt.JwtPayload | undefined;
  return user?.id as string | undefined;
};
