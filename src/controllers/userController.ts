import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;
    const user = await userService.register(username, email, password);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.login(email, password);
    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};

const logout = async (req: Request, res: Response) => {
  // Logout logic, usually handled by the client by removing the token
  res.status(200).send("Logged out");
};

const requestPasswordReset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const token = await userService.requestPasswordReset(email);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, newPassword } = req.body;
    const user = await userService.resetPassword(token, newPassword);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { currentPassword, newPassword } = req.body;
    const user = await userService.changePassword(
      userId,
      currentPassword,
      newPassword
    );
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const user = await userService.verifyEmail(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const resendVerificationEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    await userService.resendVerificationEmail(userId);
    res.status(200).send("Verification email sent");
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const user = await userService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
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
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;
    const user = await userService.updateUser(userId, updateData);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    await userService.deleteUser(userId);
    res.status(204).send("User deleted");
  } catch (error) {
    next(error);
  }
};

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
