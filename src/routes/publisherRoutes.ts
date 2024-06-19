import express from "express";
import * as PublisherController from "../controllers/publisherController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();
router.use(authMiddleware);

/**
 * @swagger
 * components:
 *   schemas:
 *     Publisher:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the publisher
 *         name:
 *           type: string
 *           description: Name of the publisher
 *         address:
 *           type: string
 *           description: Address of the publisher
 *         books:
 *           type: array
 *           items:
 *             type: string
 *             description: List of books associated with the publisher
 *       example:
 *         id: "6423e4f4c1e6b4e2f7328a6e"
 *         name: "Penguin Books"
 *         address: "New York, NY"
 *         books: ["6423e4f4c1e6b4e2f7328a6f", "6423e4f4c1e6b4e2f7328a70"]
 */

/**
 * @swagger
 * /publishers:
 *   post:
 *     summary: Create a new publisher
 *     tags: [Publishers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Publisher data to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Publisher successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Publisher'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/", PublisherController.createPublisher);

/**
 * @swagger
 * /publishers/{id}:
 *   get:
 *     summary: Retrieve a publisher by ID
 *     tags: [Publishers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Publisher ID
 *     responses:
 *       200:
 *         description: Publisher retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Publisher'
 *       404:
 *         description: Publisher not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", PublisherController.getPublisherById);

/**
 * @swagger
 * /publishers:
 *   get:
 *     summary: Retrieve all publishers with optional filtering, pagination, and sorting
 *     tags: [Publishers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: object
 *         description: JSON object containing filter criteria for publishers
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page for pagination
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: ["asc", "desc"]
 *         description: Sort order for the retrieved data
 *     responses:
 *       200:
 *         description: List of publishers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Publisher'
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */
router.get("/", PublisherController.getAllPublishers);

/**
 * @swagger
 * /publishers/{id}:
 *   put:
 *     summary: Update a publisher by ID
 *     tags: [Publishers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Publisher ID
 *     requestBody:
 *       description: Publisher data to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Publisher successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Publisher'
 *       404:
 *         description: Publisher not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", PublisherController.updatePublisherById);

/**
 * @swagger
 * /publishers/{id}:
 *   delete:
 *     summary: Delete a publisher by ID
 *     tags: [Publishers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Publisher ID
 *     responses:
 *       204:
 *         description: Publisher successfully deleted
 *       404:
 *         description: Publisher not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", PublisherController.deletePublisherById);

/**
 * @swagger
 * /publishers/{publisherId}/books/{bookId}:
 *   post:
 *     summary: Add a book to a publisher by IDs
 *     tags: [Publishers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: publisherId
 *         required: true
 *         schema:
 *           type: string
 *         description: Publisher ID
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book successfully added to publisher
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Publisher'
 *       404:
 *         description: Publisher not found
 *       500:
 *         description: Internal server error
 */
router.post(
  "/:publisherId/books/:bookId",
  PublisherController.addBookToPublisher
);

export default router;
