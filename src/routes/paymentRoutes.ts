import { Router } from "express";
import * as PaymentController from "../controllers/paymentController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();
router.use(authMiddleware);

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
 *         user: "user1"
 *         date: "2024-06-25"
 */

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Retrieve all payments
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: object
 *           description: Filtering criteria for payments
 *       - in: query
 *         name: sort
 *         schema:
 *           type: object
 *           description: Sorting criteria for payments
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           description: Maximum number of payments per page
 *     responses:
 *       '200':
 *         description: Successfully retrieved payments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Payment'
 *       '500':
 *         description: Internal server error
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
 *       '200':
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
 *       '404':
 *         description: Payment not found
 *       '500':
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
 *       '201':
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
 *       '400':
 *         description: Invalid request body
 *       '500':
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
 *       '200':
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
 *       '400':
 *         description: Invalid request body or ID
 *       '404':
 *         description: Payment not found
 *       '500':
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
 *       '204':
 *         description: Payment deleted successfully
 *       '404':
 *         description: Payment not found
 *       '500':
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
 *       '200':
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
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error
 */
router.post("/paystack", PaymentController.processPaystackPayment);

/**
 * @swagger
 * /payments/paystack/verify:
 *   post:
 *     summary: Verify Paystack payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Payment verification details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reference:
 *                 type: string
 *                 example: abc123
 *     responses:
 *       '200':
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
 *       '400':
 *         description: Invalid request body
 *       '404':
 *         description: Payment not found
 *       '500':
 *         description: Internal server error
 */
router.post("/paystack/verify", PaymentController.verifyPaystackPayment);

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
 *       '200':
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
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error
 */
router.post("/flutterwave", PaymentController.processFlutterwavePayment);

/**
 * @swagger
 * /payments/flutterwave/verify:
 *   post:
 *     summary: Verify Flutterwave payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Payment verification details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reference:
 *                 type: string
 *                 example: abc123
 *     responses:
 *       '200':
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
 *       '400':
 *         description: Invalid request body
 *       '404':
 *         description: Payment not found
 *       '500':
 *         description: Internal server error
 */
router.post("/flutterwave/verify", PaymentController.verifyFlutterwavePayment);

export default router;