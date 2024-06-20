import express from "express";
import * as ReviewController from "../controllers/reviewController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();
router.use(authMiddleware);

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - reviewer
 *         - book
 *         - rating
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the review
 *         reviewer:
 *           type: string
 *           description: The user who reviewed the book
 *         book:
 *           type: string
 *           description: The book being reviewed
 *         rating:
 *           type: number
 *           description: Rating given by the reviewer
 *         comments:
 *           type: string
 *           description: Comments by the reviewer
 *       example:
 *         id: 60c72b2f9b1d8b001c8e4d6f
 *         reviewer: 60c72b2f9b1d8b001c8e4d70
 *         book: 60c72b2f9b1d8b001c8e4d71
 *         rating: 5
 *         comments: This book was fantastic!
 */

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: The review managing API
 */

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: The review was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       500:
 *         description: Some server error
 */
router.post("/", ReviewController.createReview);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Get a review by id
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The review id
 *     responses:
 *       200:
 *         description: The review description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: The review was not found
 *       500:
 *         description: Some server error
 */
router.get("/:id", ReviewController.getReviewById);

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: object
 *         description: Filter criteria
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: ["asc", "desc"]
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of reviews retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       500:
 *         description: Internal server error
 */
router.get("/", ReviewController.getAllReviews);

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Update a review by id
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The review id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: The review was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: The review was not found
 *       500:
 *         description: Some server error
 */
router.put("/:id", ReviewController.updateReviewById);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review by id
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The review id
 *     responses:
 *       204:
 *         description: The review was successfully deleted
 *       404:
 *         description: The review was not found
 *       500:
 *         description: Some server error
 */
router.delete("/:id", ReviewController.deleteReviewById);

export default router;
