import { Request, Response } from "express";
import { MockedFunction } from "jest-mock";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import * as authController from "../../controllers/authController";
import * as userService from "../../services/userService";
import AppError from "../../utils/appError";
import env from "../../config/env";
import { mockRequest, mockResponse } from "../../utils/testHelpers";


jest.mock("../../services/userService");
jest.mock("jsonwebtoken");

describe("Auth Controller", () => {
  const next = jest.fn() as unknown as MockedFunction<(error?: any) => void>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should register a new user successfully", async () => {
      const req = mockRequest();
      const res = mockResponse();
      req.body = {
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        password: "password123",
      };

      const mockUser = { id: "123", ...req.body };
      (userService.register as jest.Mock).mockResolvedValue(mockUser);

      await authController.register(req as Request, res as Response, next);

      expect(userService.register).toHaveBeenCalledWith(
        req.body.name,
        req.body.username,
        req.body.email,
        req.body.password
      );
      expect(res.status).toHaveBeenCalledWith(httpStatus.CREATED);
      expect(res.json).toHaveBeenCalledWith({
        message:
          "Registration successful. Please check your email for verification.",
        user: mockUser,
      });
    });

    it("should pass errors to next middleware", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const error = new Error("Registration failed");
      (userService.register as jest.Mock).mockRejectedValue(error);

      await authController.register(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("login", () => {
    it("should log in a user successfully", async () => {
      const req = mockRequest();
      const res = mockResponse();
      req.body = {
        email: "john@example.com",
        password: "password123",
      };

      const mockUser = { id: "123", email: req.body.email };
      const mockAccessToken = "mock-access-token";
      const mockRefreshToken = "mock-refresh-token";
      (userService.login as jest.Mock).mockResolvedValue({
        user: mockUser,
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
      });

      await authController.login(req as Request, res as Response, next);

      expect(userService.login).toHaveBeenCalledWith(
        req.body.email,
        req.body.password
      );
      expect(res.cookie).toHaveBeenCalledTimes(2);
      expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        message: "Login successful",
        user: mockUser,
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
      });
    });

    it("should pass errors to next middleware", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const error = new Error("Login failed");
      (userService.login as jest.Mock).mockRejectedValue(error);

      await authController.login(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("refreshTokens", () => {
    it("should refresh tokens successfully", async () => {
      const req = mockRequest();
      const res = mockResponse();
      req.cookies = { refreshToken: "valid-refresh-token" };

      const mockUserId = "123";
      const mockAccessToken = "new-access-token";
      const mockRefreshToken = "new-refresh-token";
      (jwt.verify as jest.Mock).mockReturnValue({ id: mockUserId });
      (jwt.sign as jest.Mock)
        .mockReturnValueOnce(mockAccessToken)
        .mockReturnValueOnce(mockRefreshToken);

      await authController.refreshTokens(req as Request, res as Response, next);

      expect(jwt.verify).toHaveBeenCalledWith(
        "valid-refresh-token",
        env.REFRESH_TOKEN_SECRET
      );
      expect(jwt.sign).toHaveBeenCalledTimes(2);
      expect(res.cookie).toHaveBeenCalledTimes(2);
      expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: "Tokens refreshed successfully",
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
      });
    });

    it("should handle missing refresh token", async () => {
      const req = mockRequest();
      const res = mockResponse();
      req.cookies = {};

      await authController.refreshTokens(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect((next.mock.calls[0][0] as AppError).statusCode).toBe(
        httpStatus.BAD_REQUEST
      );
    });

    it("should handle invalid refresh token", async () => {
      const req = mockRequest();
      const res = mockResponse();
      req.cookies = { refreshToken: "invalid-refresh-token" };

      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error("Invalid token");
      });

      await authController.refreshTokens(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect((next.mock.calls[0][0] as AppError).statusCode).toBe(
        httpStatus.UNAUTHORIZED
      );
    });
  });

  describe("logout", () => {
    it("should log out a user successfully", async () => {
      const req = mockRequest();
      const res = mockResponse();

      await authController.logout(req as Request, res as Response, next);

      expect(res.clearCookie).toHaveBeenCalledTimes(2);
      expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        message: "Logout successful",
      });
    });

    it("should pass errors to next middleware", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const error = new Error("Logout failed");
      res.clearCookie = jest.fn().mockImplementation(() => {
        throw error;
      });

      await authController.logout(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  // Add more tests for other auth controller functions as needed
});
