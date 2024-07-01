import { Router } from "express";
import * as NotificationController from "../controllers/notificationController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();
router.use(protect);

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - message
 *         - user
 *         - status
 *       properties:
 *         message:
 *           type: string
 *         user:
 *           type: string
 *           description: User ID
 *         status:
 *           type: string
 *           enum: [unread, read]
 *           description: Notification status
 *         date:
 *           type: string
 *           format: date-time
 *         email:
 *           type: object
 *           properties:
 *             to:
 *               type: string
 *               format: email
 *             subject:
 *               type: string
 *             body:
 *               type: string
 *         sms:
 *           type: object
 *           properties:
 *             to:
 *               type: string
 *               format: phone
 *             message:
 *               type: string
 *         push:
 *           type: object
 *           properties:
 *             deviceId:
 *               type: string
 *             title:
 *               type: string
 *             body:
 *               type: string
 *       example:
 *         message: "Your payment of $50 was successful."
 *         user: "60c72b2f9b1d4c3f7e1e4567"
 *         status: "unread"
 *         date: "2024-07-01T14:00:00Z"
 *         email:
 *           to: "user@example.com"
 *           subject: "Payment Confirmation"
 *           body: "Your payment of $50 was successfully processed."
 *         sms:
 *           to: "+1234567890"
 *           message: "Payment of $50 successful."
 *         push:
 *           deviceId: "abcxyz123"
 *           title: "Payment Successful"
 *           body: "Your payment of $50 was successful."
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification management
 */

/**
 * @swagger
 * /api/v1/notifications:
 *   post:
 *     summary: Create a new notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Notification details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       201:
 *         description: Notification created successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/", NotificationController.createNotification);

/**
 * @swagger
 * /api/v1/notifications:
 *   get:
 *     summary: Get all notifications with filters, sorting, and pagination options
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: JSON filter object for notifications
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: JSON sort object for notifications
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit per page for pagination
 *     responses:
 *       200:
 *         description: List of notifications retrieved successfully
 *       400:
 *         description: Invalid query parameters
 */
router.get("/", NotificationController.getAllNotifications);

/**
 * @swagger
 * /api/v1/notifications/{id}:
 *   get:
 *     summary: Get a single notification by ID
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     responses:
 *       200:
 *         description: Notification details retrieved successfully
 *       404:
 *         description: Notification not found
 *       400:
 *         description: Invalid ID
 */
router.get("/:id", NotificationController.getNotificationById);

/**
 * @swagger
 * /api/v1/notifications/{id}:
 *   put:
 *     summary: Update a notification by ID
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     requestBody:
 *       description: Updated notification details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       200:
 *         description: Notification updated successfully
 *       404:
 *         description: Notification not found
 *       400:
 *         description: Invalid ID or request body
 */
router.put("/:id", NotificationController.updateNotification);

/**
 * @swagger
 * /api/v1/notifications/{id}:
 *   delete:
 *     summary: Delete a notification by ID
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     responses:
 *       204:
 *         description: Notification deleted successfully
 *       404:
 *         description: Notification not found
 *       400:
 *         description: Invalid ID
 */
router.delete("/:id", NotificationController.deleteNotification);

export default router;
