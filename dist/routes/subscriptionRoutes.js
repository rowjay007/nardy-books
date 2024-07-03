"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="060e9878-c647-582d-8ee7-ad692703547a")}catch(e){}}();

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subscriptionController = __importStar(require("../controllers/subscriptionController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.protect);
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
exports.default = router;
//# sourceMappingURL=subscriptionRoutes.js.map
//# debugId=060e9878-c647-582d-8ee7-ad692703547a
