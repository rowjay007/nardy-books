import { Router } from "express";
import * as AuthorController from "../controllers/authorController";
import {protect } from "../middlewares/authMiddleware";

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
 *     Author:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the author
 *         name:
 *           type: string
 *           description: The name of the author
 *         biography:
 *           type: string
 *           description: The biography of the author
 *         books:
 *           type: array
 *           items:
 *             type: string
 *           description: List of books written by the author
 *       example:
 *         id: d5fE_asz
 *         name: John Doe
 *         biography: Author biography
 *         books: []
 */

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       201:
 *         description: The author was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       500:
 *         description: Some server error
 */
router.post("/", AuthorController.createAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The author ID
 *     responses:
 *       200:
 *         description: The author description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: The author was not found
 *       500:
 *         description: Some server error
 */
router.get("/:id", AuthorController.getAuthorById);

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Returns the list of all authors with filtering, sorting, and pagination options
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: The name filter to apply
 *       - in: query
 *         name: biography
 *         schema:
 *           type: string
 *         description: The biography filter to apply
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The number of items per page for pagination
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: The sorting direction (asc or desc)
 *     responses:
 *       200:
 *         description: The list of authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 *       500:
 *         description: Some server error
 */
router.get("/", AuthorController.getAllAuthors);

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an author by ID
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The author ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: The author was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: The author was not found
 *       500:
 *         description: Some server error
 */
router.put("/:id", AuthorController.updateAuthorById);

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Remove an author by ID
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The author ID
 *     responses:
 *       204:
 *         description: The author was successfully deleted
 *       404:
 *         description: The author was not found
 *       500:
 *         description: Some server error
 */
router.delete("/:id", AuthorController.deleteAuthorById);

/**
 * @swagger
 * /authors/{authorId}/books/{bookId}:
 *   post:
 *     summary: Add a book to an author
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: authorId
 *         schema:
 *           type: string
 *         required: true
 *         description: The author ID
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     responses:
 *       200:
 *         description: The book was successfully added to the author
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: The author or book was not found
 *       500:
 *         description: Some server error
 */
router.post("/:authorId/books/:bookId", AuthorController.addBookToAuthor);

export default router;
