// // src/controllers/userController.ts
// import { Request, Response } from "express";
// import UserService from "../services/userService";

// export const registerUser = async (req: Request, res: Response) => {
//   try {
//     const user = await UserService.createUser(req.body);
//     res.status(201).json(user);
//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(400).json({ message: error.message });
//     } else {
//       res.status(500).json({ message: "An unexpected error occurred" });
//     }
//   }
// };

// export const loginUser = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const { token, user } = await UserService.authenticateUser(email, password);
//     res.status(200).json({ token, user });
//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(401).json({ message: error.message });
//     } else {
//       res.status(500).json({ message: "An unexpected error occurred" });
//     }
//   }
// };

// export const logoutUser = async (req: Request, res: Response) => {
//   try {
//     await UserService.logout();
//     res.status(200).json({ message: "Successfully logged out" });
//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(400).json({ message: error.message });
//     } else {
//       res.status(500).json({ message: "An unexpected error occurred" });
//     }
//   }
// };
