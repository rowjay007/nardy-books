import jwt from "jsonwebtoken";
import env from "../config/env";

const generateToken = (
  userId: string,
  secret: string,
  expiresIn: string
): string => {
  return jwt.sign({ id: userId }, secret, { expiresIn });
};

export const generateAccessToken = (userId: string): string => {
  return generateToken(userId, env.JWT_SECRET, "1h");
};

export const generateRefreshToken = (userId: string): string => {
  return generateToken(
    userId,
    env.REFRESH_TOKEN_SECRET,
    env.REFRESH_TOKEN_EXPIRATION
  );
};
