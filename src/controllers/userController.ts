import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";
import catchAsync from "../utils/catchAsync";

const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;
    const user = await userService.register(username, email, password);
    res.status(201).json({ status: "success", data: user });
  }
);

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const { user, token } = await userService.login(email, password);
    res.status(200).json({ status: "success", data: { user, token } });
  }
);

const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await userService.logout();
    res.status(204).json({ status: "success", data: null });
  }
);

const requestPasswordReset = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const token = await userService.requestPasswordReset(email);
    res.status(200).json({ status: "success", data: { token } });
  }
);

const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token, newPassword } = req.body;
    const user = await userService.resetPassword(token, newPassword);
    res.status(200).json({ status: "success", data: user });
  }
);

const changePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { currentPassword, newPassword } = req.body;
    const user = await userService.changePassword(
      userId,
      currentPassword,
      newPassword
    );
    res.status(200).json({ status: "success", data: user });
  }
);

const verifyEmail = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const user = await userService.verifyEmail(userId);
    res.status(200).json({ status: "success", data: user });
  }
);

const resendVerificationEmail = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    await userService.resendVerificationEmail(userId);
    res.status(200).json({ status: "success", data: null });
  }
);

const getUserById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const user = await userService.getUserById(userId);
    res.status(200).json({ status: "success", data: user });
  }
);

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filter = req.query.filter || {};
    const sort = req.query.sort || {};
    const limit = Number(req.query.limit) || 10;
    const skip = Number(req.query.skip) || 0;
    const users = await userService.getAllUsers(filter, sort, limit, skip);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});
const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const updateData = req.body;
    const user = await userService.updateUser(userId, updateData);
    res.status(200).json({ status: "success", data: user });
  }
);

const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    await userService.deleteUser(userId);
    res.status(204).json({ status: "success", data: null });
  }
);

export default {
  register,
  login,
  logout,
  requestPasswordReset,
  resetPassword,
  changePassword,
  verifyEmail,
  resendVerificationEmail,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
