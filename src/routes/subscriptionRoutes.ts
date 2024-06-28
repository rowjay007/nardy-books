import { Router } from "express";
import * as subscriptionController from "../controllers/subscriptionController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();
router.use(protect);

/**
 * @swagger
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       required:
 *         - type
 *         - startDate
 *         - endDate
 *       properties:
 *         type:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date
 *         endDate:
 *           type: string
 *           format: date
 *         users:
 *           type: array
 *           items:
 *             type: string
 *           description: List of user IDs
 *       example:
 *         type: Premium
 *         startDate: 2024-07-01
 *         endDate: 2025-07-01
 *         users: ["user1", "user2"]
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: Subscription management
 */

/**
 * @swagger
 * /api/v1/subscriptions:
 *   post:
 *     summary: Create a new subscription
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Subscription details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscription'
 *     responses:
 *       201:
 *         description: Subscription created successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: User not found
 */
router.post("/", subscriptionController.createSubscription);

/**
 * @swagger
 * /api/v1/subscriptions:
 *   get:
 *     summary: Get all subscriptions with filters, sorting, and pagination options
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: JSON filter object for subscriptions
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: JSON sort object for subscriptions
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
 *         description: List of subscriptions retrieved successfully
 *       400:
 *         description: Invalid query parameters
 */
router.get("/", subscriptionController.getSubscriptions);

/**
 * @swagger
 * /api/v1/subscriptions/{id}:
 *   get:
 *     summary: Get a single subscription by ID
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subscription ID
 *     responses:
 *       200:
 *         description: Subscription details retrieved successfully
 *       404:
 *         description: Subscription not found
 *       400:
 *         description: Invalid ID
 */
router.get("/:id", subscriptionController.getSubscriptionById);

/**
 * @swagger
 * /api/v1/subscriptions/{id}:
 *   put:
 *     summary: Update a subscription by ID
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subscription ID
 *     requestBody:
 *       description: Updated subscription details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscription'
 *     responses:
 *       200:
 *         description: Subscription updated successfully
 *       404:
 *         description: Subscription not found
 *       400:
 *         description: Invalid ID or request body
 */
router.put("/:id", subscriptionController.updateSubscription);

/**
 * @swagger
 * /api/v1/subscriptions/{id}:
 *   delete:
 *     summary: Delete a subscription by ID
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subscription ID
 *     responses:
 *       204:
 *         description: Subscription deleted successfully
 *       404:
 *         description: Subscription not found
 *       400:
 *         description: Invalid ID
 */
router.delete("/:id", subscriptionController.deleteSubscription);

export default router;
