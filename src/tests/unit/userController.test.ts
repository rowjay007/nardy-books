import { Types } from "mongoose";
import * as userController from "../../controllers/userController";
import * as userService from "../../services/userService";
import AppError from "../../utils/appError";
import { mockRequest, mockResponse } from "../../utils/testHelpers";

jest.mock("../../services/userService");

describe("User Controller", () => {
  const next = jest.fn();

  describe("getUserById", () => {
    it("should handle invalid user ID", async () => {
      const req = mockRequest();
      const res = mockResponse();

      req.params = {};

      await userController.getUserById(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(
        new AppError("No user ID provided", 400)
      );
    });

    it("should return a user by id", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const userId = new Types.ObjectId();
      const user = { _id: userId, username: "JohnDoe" };

      req.params = { id: userId.toHexString() };
      (userService.getUserById as jest.Mock).mockResolvedValue(user);

      await userController.getUserById(req as any, res as any, next);

      expect(userService.getUserById).toHaveBeenCalledWith(
        userId.toHexString()
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { user },
      });
    });

    it("should return 404 if user not found", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const userId = new Types.ObjectId();

      req.params = { id: userId.toHexString() };
      (userService.getUserById as jest.Mock).mockResolvedValue(null);

      await userController.getUserById(req as any, res as any, next);

      expect(userService.getUserById).toHaveBeenCalledWith(
        userId.toHexString()
      );
      expect(next).toHaveBeenCalledWith(new AppError("User not found", 404));
    });
  });

  describe("updateUser", () => {
    it("should handle invalid user ID", async () => {
      const req = mockRequest();
      const res = mockResponse();

      req.params = {};
      req.body = { username: "JaneDoe" };

      await userController.updateUserById(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(
        new AppError("No user ID provided", 400)
      );
    });

    it("should update a user and return it", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const userId = new Types.ObjectId();
      const updatedUser = { _id: userId, username: "JaneDoe" };

      req.params = { id: userId.toHexString() };
      req.body = { username: "JaneDoe" };
      (userService.updateUser as jest.Mock).mockResolvedValue(updatedUser);

      await userController.updateUserById(req as any, res as any, next);

      expect(userService.updateUser).toHaveBeenCalledWith(
        userId.toHexString(),
        req.body
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { user: updatedUser },
      });
    });

    it("should return 404 if user not found", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const userId = new Types.ObjectId();

      req.params = { id: userId.toHexString() };
      req.body = { username: "JaneDoe" };
      (userService.updateUser as jest.Mock).mockResolvedValue(null);

      await userController.updateUserById(req as any, res as any, next);

      expect(userService.updateUser).toHaveBeenCalledWith(
        userId.toHexString(),
        req.body
      );
      expect(next).toHaveBeenCalledWith(new AppError("User not found", 404));
    });
  });

  describe("deleteUser", () => {
    it("should handle invalid user ID", async () => {
      const req = mockRequest();
      const res = mockResponse();

      req.params = {};

      await userController.deleteUserById(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(
        new AppError("No user ID provided", 400)
      );
    });

    it("should delete a user and return success message", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const userId = new Types.ObjectId();

      req.params = { id: userId.toHexString() };
      (userService.deleteUser as jest.Mock).mockResolvedValue(true);

      await userController.deleteUserById(req as any, res as any, next);

      expect(userService.deleteUser).toHaveBeenCalledWith(userId.toHexString());
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: "User successfully deleted",
        data: null,
      });
    });

    it("should return 404 if user not found", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const userId = new Types.ObjectId();

      req.params = { id: userId.toHexString() };
      (userService.deleteUser as jest.Mock).mockResolvedValue(false);

      await userController.deleteUserById(req as any, res as any, next);

      expect(userService.deleteUser).toHaveBeenCalledWith(userId.toHexString());
      expect(next).toHaveBeenCalledWith(new AppError("User not found", 404));
    });
  });
});
