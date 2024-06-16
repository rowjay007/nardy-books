import { Router } from "express";
import userController from "../controllers/userController";

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management and authentication
 */
const router = Router();

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       description: User registration details
 *       required: true
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
 *         description: User created successfully
 *       400:
 *         description: Bad request, validation error
 */
router.post("/register", userController.register);

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *       description: User login details
 *       required: true
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
 *         description: User logged in successfully
 *       400:
 *         description: Bad request, validation error
 */
router.post("/login", userController.login);

/**
 * @swagger
 * /api/v1/users/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.post("/logout", userController.logout);

/**
 * @swagger
 * /api/v1/users/request-password-reset:
 *   post:
 *     summary: Request password reset for a user
 *     tags: [User]
 *     requestBody:
 *       description: User email for password reset request
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset request sent successfully
 *       400:
 *         description: Bad request, validation error
 */
router.post("/request-password-reset", userController.requestPasswordReset);

/**
 * @swagger
 * /api/v1/users/reset-password:
 *   post:
 *     summary: Reset password for a user
 *     tags: [User]
 *     requestBody:
 *       description: User password reset details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Bad request, validation error
 *       404:
 *         description: Token not found or expired
 */
router.post("/reset-password", userController.resetPassword);

/**
 * @swagger
 * /api/v1/users/change-password/{userId}:
 *   post:
 *     summary: Change password for a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       description: User change password details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Bad request, validation error
 *       404:
 *         description: User not found or current password incorrect
 */
router.post("/change-password/:userId", userController.changePassword);

/**
 * @swagger
 * /api/v1/users/verify-email/{userId}:
 *   get:
 *     summary: Verify email for a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       404:
 *         description: User not found
 */
router.get("/verify-email/:userId", userController.verifyEmail);

/**
 * @swagger
 * /api/v1/users/resend-verification-email/{userId}:
 *   post:
 *     summary: Resend verification email to a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Verification email sent successfully
 *       404:
 *         description: User not found
 */
router.post(
  "/resend-verification-email/:userId",
  userController.resendVerificationEmail
);

/**
 * @swagger
 * /api/v1/users/{userId}:
 *   get:
 *     summary: Get user details by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       404:
 *         description: User not found
 */
router.get("/:userId", userController.getUserById);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users with filters, sorting, and pagination
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filter criteria
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sorting options
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit for pagination
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *         description: Skip for pagination
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 */
router.get("/", userController.getAllUsers);

/**
 * @swagger
 * /api/v1/users/{userId}:
 *   put:
 *     summary: Update user details
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       description: Updated user details
 *       required: true
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
 *       200:
 *         description: User details updated successfully
 *       404:
 *         description: User not found
 *       400:
 *         description: Bad request, validation error
 */
router.put("/:userId", userController.updateUser);

/**
 * @swagger
 * /api/v1/users/{userId}:
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/:userId", userController.deleteUser);

export default router;
