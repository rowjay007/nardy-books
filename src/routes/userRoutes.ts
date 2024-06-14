import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/userController";

const router = Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Allows a new user to register using username, email, and password.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully registered.
 *       400:
 *         description: Validation error.
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate user and generate a JWT token
 *     description: Authenticates user credentials and returns a JWT token for authentication.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated successfully and JWT token returned.
 *       401:
 *         description: Invalid credentials.
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout the authenticated user
 *     description: Logs out the user by invalidating the JWT token.
 *     responses:
 *       200:
 *         description: Successfully logged out.
 *       400:
 *         description: Invalid request or server error.
 */
router.post("/logout", logoutUser);

export default router;
