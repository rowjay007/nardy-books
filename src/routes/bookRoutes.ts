import { Router } from "express";
import * as BookController from "../controllers/bookController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();
router.use(protect);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - publisher
 *         - genre
 *         - price
 *       properties:
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The author ID
 *         publisher:
 *           type: string
 *           description: The publisher ID
 *         genre:
 *           type: string
 *           description: The genre ID
 *         reviews:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of review IDs
 *         price:
 *           type: number
 *           description: The price of the book
 *       example:
 *         title: The Great Gatsby
 *         author: 60d0fe4f5311236168a109ca
 *         publisher: 60d0fe4f5311236168a109cb
 *         genre: 60d0fe4f5311236168a109cc
 *         reviews: []
 *         price: 10.99
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 */
router.post("/", BookController.createBook);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 */
router.get("/:id", BookController.getBookById);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         required: false
 *         description: Sort order (e.g. price,-title)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Maximum number of results per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get("/", BookController.getAllBooks);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update the book by the id
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The book was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 *       500:
 *         description: Some error happened
 */
router.put("/:id", BookController.updateBookById);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Remove the book by id
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
 */
router.delete("/:id", BookController.deleteBookById);

/**
 * @swagger
 * /books/{id}/add-subscription:
 *   post:
 *     summary: Add a subscription to a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subscriptionId:
 *                 type: string
 *                 description: The subscription ID to be added
 *             required:
 *               - subscriptionId
 *     responses:
 *       200:
 *         description: The subscription was added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid ID or error adding subscription
 *       404:
 *         description: Book not found
 */
router.post("/:id/add-subscription", BookController.addSubscriptionToBook);
/**
 * @swagger
 * /books/{id}/remove-subscription:
 *   post:
 *     summary: Remove a subscription from a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subscriptionId:
 *                 type: string
 *                 description: The subscription ID to be removed
 *             required:
 *               - subscriptionId
 *     responses:
 *       200:
 *         description: The subscription was removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid ID or error removing subscription
 *       404:
 *         description: Book not found
 */
router.post(
  "/:id/remove-subscription",
  BookController.removeSubscriptionFromBook
);

export default router;
