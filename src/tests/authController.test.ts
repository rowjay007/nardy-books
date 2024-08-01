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
    // existing tests for register
  });

  describe("login", () => {
    // existing tests for login
  });

  describe("refreshTokens", () => {
    // existing tests for refreshTokens
  });

  describe("getCurrentUser", () => {
    it("should return the current user's data", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const userId = new Types.ObjectId().toString();
      const user = {
        _id: userId,
        username: "testuser",
        email: "test@example.com",
      };

      req.user = { id: userId };
      (userService.getCurrentUser as jest.Mock).mockResolvedValue(user);

      await authController.getCurrentUser(req as any, res as any, next);

      expect(userService.getCurrentUser).toHaveBeenCalledWith(userId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { user },
      });
    });

    it("should handle missing authentication", async () => {
      const req = mockRequest();
      const res = mockResponse();

      await authController.getCurrentUser(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(next.mock.calls[0][0].message).toBe("User not authenticated");
      expect(next.mock.calls[0][0].statusCode).toBe(401);
    });

    it("should handle user not found", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const userId = new Types.ObjectId().toString();

      req.user = { id: userId };
      (userService.getCurrentUser as jest.Mock).mockResolvedValue(null);

      await authController.getCurrentUser(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(next.mock.calls[0][0].message).toBe("User not found");
      expect(next.mock.calls[0][0].statusCode).toBe(404);
    });
  });

  describe("updateCurrentUser", () => {
    it("should update the current user's data", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const userId = new Types.ObjectId().toString();
      const updateData = { username: "updateduser" };
      const updatedUser = { _id: userId, ...updateData };

      req.user = { id: userId };
      req.body = updateData;
      (userService.updateCurrentUser as jest.Mock).mockResolvedValue(
        updatedUser
      );

      await authController.updateCurrentUser(req as any, res as any, next);

      expect(userService.updateCurrentUser).toHaveBeenCalledWith(
        userId,
        updateData
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { user: updatedUser },
      });
    });

    it("should handle missing authentication", async () => {
      const req = mockRequest();
      const res = mockResponse();

      await authController.updateCurrentUser(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(next.mock.calls[0][0].message).toBe("User not authenticated");
      expect(next.mock.calls[0][0].statusCode).toBe(401);
    });

    it("should handle user not found", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const userId = new Types.ObjectId().toString();

      req.user = { id: userId };
      req.body = { username: "updateduser" };
      (userService.updateCurrentUser as jest.Mock).mockResolvedValue(null);

      await authController.updateCurrentUser(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(next.mock.calls[0][0].message).toBe("User not found");
      expect(next.mock.calls[0][0].statusCode).toBe(404);
    });
  });

  describe("deleteCurrentUser", () => {
    it("should delete the current user", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const userId = new Types.ObjectId().toString();

      req.user = { id: userId };
      (userService.deleteCurrentUser as jest.Mock).mockResolvedValue(true);

      await authController.deleteCurrentUser(req as any, res as any, next);

      expect(userService.deleteCurrentUser).toHaveBeenCalledWith(userId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: "User deleted successfully",
      });
    });

    it("should handle missing authentication", async () => {
      const req = mockRequest();
      const res = mockResponse();

      await authController.deleteCurrentUser(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(next.mock.calls[0][0].message).toBe("User not authenticated");
      expect(next.mock.calls[0][0].statusCode).toBe(401);
    });

    it("should handle user not found", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const userId = new Types.ObjectId().toString();

      req.user = { id: userId };
      (userService.deleteCurrentUser as jest.Mock).mockResolvedValue(false);

      await authController.deleteCurrentUser(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(next.mock.calls[0][0].message).toBe("User not found");
      expect(next.mock.calls[0][0].statusCode).toBe(404);
    });
  });
});
