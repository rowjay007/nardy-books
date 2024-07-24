import { Types } from "mongoose";
import * as authController from "../controllers/authController";
import * as userService from "../services/userService";
import AppError from "../utils/appError";
import { mockRequest, mockResponse } from "../utils/testHelpers";
import jwt from "jsonwebtoken";
import env from "../config/env";

jest.mock("../services/userService");
jest.mock("jsonwebtoken");

describe("Auth Controller", () => {
  let next: jest.Mock;

  beforeEach(() => {
    next = jest.fn();
    jest.resetAllMocks();
  });

  describe("register", () => {
    it("should register a new user", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const newUser = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };
      const createdUser = { _id: new Types.ObjectId(), ...newUser };

      req.body = newUser;
      (userService.register as jest.Mock).mockResolvedValue(createdUser);

      await authController.register(req as any, res as any, next);

      expect(userService.register).toHaveBeenCalledWith(
        newUser.username,
        newUser.email,
        newUser.password
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message:
          "Registration successful. Please check your email for verification.",
        user: createdUser,
      });
    });

    it("should handle errors during registration", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const newUser = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };

      req.body = newUser;
      (userService.register as jest.Mock).mockRejectedValue(
        new Error("Registration failed")
      );

      await authController.register(req as any, res as any, next);

      expect(userService.register).toHaveBeenCalledWith(
        newUser.username,
        newUser.email,
        newUser.password
      );
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("login", () => {
    it("should log in a user and return tokens", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const loginData = {
        email: "test@example.com",
        password: "password123",
      };
      const user = { id: new Types.ObjectId(), ...loginData };

      req.body = loginData;
      (userService.login as jest.Mock).mockResolvedValue({ user });
      (jwt.sign as jest.Mock)
        .mockReturnValueOnce("accessToken")
        .mockReturnValueOnce("refreshToken");

      await authController.login(req as any, res as any, next);

      expect(userService.login).toHaveBeenCalledWith(
        loginData.email,
        loginData.password
      );
      expect(jwt.sign).toHaveBeenCalledTimes(2);
      expect(res.cookie).toHaveBeenCalledTimes(2);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Login successful",
        user,
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      });
    });
  });

  describe("refreshTokens", () => {
    it("should refresh tokens when given a valid refresh token", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const userId = new Types.ObjectId().toString();

      req.cookies = { refreshToken: "validRefreshToken" };
      (jwt.verify as jest.Mock).mockReturnValue({ id: userId });
      (jwt.sign as jest.Mock)
        .mockReturnValueOnce("newAccessToken")
        .mockReturnValueOnce("newRefreshToken");

      await authController.refreshTokens(req as any, res as any, next);

      expect(jwt.verify).toHaveBeenCalledWith(
        "validRefreshToken",
        env.REFRESH_TOKEN_SECRET
      );
      expect(jwt.sign).toHaveBeenCalledTimes(2);
      expect(res.cookie).toHaveBeenCalledTimes(2);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: "Tokens refreshed successfully",
        accessToken: "newAccessToken",
        refreshToken: "newRefreshToken",
      });
    });

    it("should handle missing refresh token", async () => {
      const req = mockRequest();
      const res = mockResponse();

      req.cookies = {};

      await authController.refreshTokens(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(next.mock.calls[0][0].message).toBe("Refresh token is required");
      expect(next.mock.calls[0][0].statusCode).toBe(400);
    });

    it("should handle invalid refresh token", async () => {
      const req = mockRequest();
      const res = mockResponse();

      req.cookies = { refreshToken: "invalidRefreshToken" };
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error("Invalid token");
      });

      await authController.refreshTokens(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(next.mock.calls[0][0].message).toBe(
        "Invalid or expired refresh token"
      );
      expect(next.mock.calls[0][0].statusCode).toBe(401);
    });
  });

  // Add more tests for other controller functions like logout, requestPasswordReset, resetPassword, etc.
});
