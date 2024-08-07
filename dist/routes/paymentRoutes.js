"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="342fb4dc-44f0-57eb-ab08-61ee6d1f4ecd")}catch(e){}}();

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
const PaymentController = __importStar(require("../controllers/paymentController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.protect);
/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: API endpoints for managing payments
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       required:
 *         - amount
 *         - method
 *         - status
 *         - user
 *         - date
 *       properties:
 *         amount:
 *           type: number
 *         method:
 *           type: string
 *         status:
 *           type: string
 *         user:
 *           type: string
 *         date:
 *           type: string
 *           format: date
 *       example:
 *         amount: 100
 *         method: "Card"
 *         status: "Paid"
 *         user: "60c72b2f9b1d4c3f7e1e4567"
 *         date: "2024-06-25"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
/**
 * @swagger
 * /api/v1/payments:
 *   get:
 *     summary: Get all payments with filters, sorting, and pagination options
 *     tags: [Payments]
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: JSON filter object for payments
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: JSON sort object for payments
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
 *         description: List of payments retrieved successfully
 *       400:
 *         description: Invalid query parameters
 */
router.get("/", PaymentController.getAllPayments);
/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Retrieve a payment by ID
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the payment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", PaymentController.getPaymentById);
/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Payment details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       201:
 *         description: Payment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post("/", PaymentController.createPayment);
/**
 * @swagger
 * /payments/{id}:
 *   put:
 *     summary: Update a payment by ID
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     requestBody:
 *       description: Updated payment details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Invalid request body or ID
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", PaymentController.updatePayment);
/**
 * @swagger
 * /payments/{id}:
 *   delete:
 *     summary: Delete a payment by ID
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     responses:
 *       204:
 *         description: Payment deleted successfully
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", PaymentController.deletePayment);
/**
 * @swagger
 * /payments/paystack:
 *   post:
 *     summary: Initialize Paystack payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Payment initialization details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 1000
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Payment initialized successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     authorization_url:
 *                       type: string
 *                       example: https://paystack.com/authorize
 *                     access_code:
 *                       type: string
 *                       example: xyz123
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post("/paystack", PaymentController.processPaystackPayment);
/**
 * @swagger
 * /payments/paystack/verify/{reference}:
 *   post:
 *     summary: Verify Paystack payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reference
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment reference
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Payment verified
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Internal server error
 */
router.post("/paystack/verify/:reference", PaymentController.verifyPaystackPayment);
/**
 * @swagger
 * /payments/flutterwave:
 *   post:
 *     summary: Initialize Flutterwave payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Payment initialization details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 1000
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Payment initialized successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     authorization_url:
 *                       type: string
 *                       example: https://flutterwave.com/authorize
 *                     access_code:
 *                       type: string
 *                       example: xyz123
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post("/flutterwave", PaymentController.processFlutterwavePayment);
/**
 * @swagger
 * /payments/flutterwave/verify/{reference}:
 *   post:
 *     summary: Verify Flutterwave payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reference
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment reference
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Payment verified
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Internal server error
 */
router.post("/flutterwave/verify/:reference", PaymentController.verifyFlutterwavePayment);
exports.default = router;
//# sourceMappingURL=paymentRoutes.js.map
//# debugId=342fb4dc-44f0-57eb-ab08-61ee6d1f4ecd
