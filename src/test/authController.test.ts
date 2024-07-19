import { Request, Response } from "express";
import httpStatus from "http-status";
import * as authController from "../controllers/authController";
import * as userService from "../services/userService";
import AppError from "../utils/appError";
import { mockRequest, mockResponse } from "../utils/testHelpers";

jest.mock("../services/userService");
jest.mock("jsonwebtoken");

describe("Auth Controller", () => {
  const next = jest.fn();

  describe("register", () => {
    it("should register a new user", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };
      const createdUser = { ...userData, _id: "user1" };

      req.body = userData;
      (userService.register as jest.Mock).mockResolvedValue(createdUser);

      await authController.register(req as Request, res as Response, next);

      expect(userService.register).toHaveBeenCalledWith(
        "testuser",
        "test@example.com",
        "password123"
      );
      expect(res.status).toHaveBeenCalledWith(httpStatus.CREATED);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { user: createdUser },
      });
    });

    it("should handle registration errors", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const error = new AppError("Registration failed", 400);

      req.body = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };
      (userService.register as jest.Mock).mockRejectedValue(error);

      await authController.register(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("login", () => {
    it("should authenticate a user and generate access token", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const loginData = { email: "test@example.com", password: "password123" };
      const user = {
        _id: "user1",
        username: "testuser",
        email: "test@example.com",
      };
      const accessToken = "accessToken";

      req.body = loginData;
      (userService.login as jest.Mock).mockResolvedValue({ user, accessToken });

      await authController.login(req as Request, res as Response, next);

      expect(userService.login).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );
      expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { user, accessToken },
      });
    });

    it("should handle login errors", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const error = new AppError("Login failed", 401);

      req.body = { email: "test@example.com", password: "password123" };
      (userService.login as jest.Mock).mockRejectedValue(error);

      await authController.login(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("logout", () => {
    it("should logout a user", async () => {
      const req = mockRequest();
      const res = mockResponse();
      req.user = { id: "user1" };

      await authController.logout(req as any, res as Response, next);

      expect(userService.logout).toHaveBeenCalledWith("user1");
      expect(res.status).toHaveBeenCalledWith(httpStatus.NO_CONTENT);
      expect(res.json).toHaveBeenCalledWith({ status: "success", data: null });
    });

    it("should handle logout errors", async () => {
      const req = mockRequest();
      const res = mockResponse();
      req.user = { id: "user1" };
      const error = new AppError("Logout failed", 500);

      (userService.logout as jest.Mock).mockRejectedValue(error);

      await authController.logout(req as any, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    it("should return 401 if user is not authenticated", async () => {
      const req = mockRequest();
      const res = mockResponse();

      await authController.logout(req as any, res as Response, next);

      expect(next).toHaveBeenCalledWith(
        new AppError("User not authenticated", httpStatus.UNAUTHORIZED)
      );
    });
  });

  describe("requestPasswordReset", () => {
    it("should request a password reset", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const email = "test@example.com";
      const token = "resetToken";

      req.body = { email };
      (userService.requestPasswordReset as jest.Mock).mockResolvedValue(token);

      await authController.requestPasswordReset(
        req as Request,
        res as Response,
        next
      );

      expect(userService.requestPasswordReset).toHaveBeenCalledWith(email);
      expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { token },
      });
    });

    it("should handle request password reset errors", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const email = "test@example.com";
      const error = new AppError("User not found", 404);

      req.body = { email };
      (userService.requestPasswordReset as jest.Mock).mockRejectedValue(error);

      await authController.requestPasswordReset(
        req as Request,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("resetPassword", () => {
    it("should reset the password", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const token = "resetToken";
      const newPassword = "newPassword123";
      const user = {
        _id: "user1",
        username: "testuser",
        email: "test@example.com",
      };

      req.params = { token };
      req.body = { newPassword };
      (userService.resetPassword as jest.Mock).mockResolvedValue(user);

      await authController.resetPassword(req as Request, res as Response, next);

      expect(userService.resetPassword).toHaveBeenCalledWith(
        token,
        newPassword
      );
      expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { user },
      });
    });

    it("should handle reset password errors", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const token = "resetToken";
      const newPassword = "newPassword123";
      const error = new AppError("Invalid or expired token", 400);

      req.params = { token };
      req.body = { newPassword };
      (userService.resetPassword as jest.Mock).mockRejectedValue(error);

      await authController.resetPassword(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("changePassword", () => {
    it("should change the password", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const userId = "user1";
      const currentPassword = "currentPassword";
      const newPassword = "newPassword123";
      const user = {
        _id: "user1",
        username: "testuser",
        email: "test@example.com",
      };

      req.user = { id: userId };
      req.body = { currentPassword, newPassword };
      (userService.changePassword as jest.Mock).mockResolvedValue(user);

      await authController.changePassword(req as any, res as Response, next);

      expect(userService.changePassword).toHaveBeenCalledWith(
        userId,
        currentPassword,
        newPassword
      );
      expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { user },
      });
    });

    it("should handle change password errors", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const userId = "user1";
      const currentPassword = "currentPassword";
      const newPassword = "newPassword123";
      const error = new AppError("Current password is incorrect", 401);

      req.user = { id: userId };
      req.body = { currentPassword, newPassword };
      (userService.changePassword as jest.Mock).mockRejectedValue(error);

      await authController.changePassword(req as any, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    it("should return 401 if user is not authenticated", async () => {
      const req = mockRequest();
      const res = mockResponse();

      req.body = {
        currentPassword: "currentPassword",
        newPassword: "newPassword123",
      };

      await authController.changePassword(req as any, res as Response, next);

      expect(next).toHaveBeenCalledWith(
        new AppError("User not authenticated", httpStatus.UNAUTHORIZED)
      );
    });
  });

  describe("verifyEmail", () => {
    it("should verify the email", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const token = "verificationToken";
      const user = {
        _id: "user1",
        username: "testuser",
        email: "test@example.com",
      };

      req.params = { token };
      (userService.verifyEmail as jest.Mock).mockResolvedValue(user);

      await authController.verifyEmail(req as Request, res as Response, next);

      expect(userService.verifyEmail).toHaveBeenCalledWith(token);
      expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: "Email verified successfully.",
        data: { user },
      });
    });

    it("should handle email verification errors", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const token = "verificationToken";
      const error = new AppError("Invalid verification token.", 400);

      req.params = { token };
      (userService.verifyEmail as jest.Mock).mockRejectedValue(error);

      await authController.verifyEmail(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("resendVerificationEmail", () => {
    it("should resend the verification email", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const userId = "user1";

      req.user = { id: userId };

      await authController.resendVerificationEmail(
        req as any,
        res as Response,
        next
      );

      expect(userService.resendVerificationEmail).toHaveBeenCalledWith(userId);
      expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: "Verification email resent successfully",
      });
    });

    it("should handle resend verification email errors", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const userId = "user1";
      const error = new AppError("User not found", 404);

      req.user = { id: userId };
      (userService.resendVerificationEmail as jest.Mock).mockRejectedValue(
        error
      );

      await authController.resendVerificationEmail(
        req as any,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(error);
    });

    it("should return 401 if user is not authenticated", async () => {
      const req = mockRequest();
      const res = mockResponse();

      await authController.resendVerificationEmail(
        req as any,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(
        new AppError("User not authenticated", httpStatus.UNAUTHORIZED)
      );
    });
  });
});
