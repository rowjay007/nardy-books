import express from "express";
import * as GenreController from "../controllers/genreController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Genre:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *       example:
 *         name: Science Fiction
 */

/**
 * @swagger
 * tags:
 *   name: Genres
 *   description: Genre management
 */

/**
 * @swagger
 * /genres:
 *   get:
 *     summary: Returns the list of all genres
 *     tags: [Genres]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of genres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 *       500:
 *         description: Some server error
 */
router.get("/", GenreController.getAllGenres);

/**
 * @swagger
 * /genres/{id}:
 *   get:
 *     summary: Get a specific genre by ID
 *     tags: [Genres]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the genre to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The genre with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       404:
 *         description: Genre not found
 *       500:
 *         description: Some server error
 */
router.get("/:id", GenreController.getGenreById);

/**
 * @swagger
 * /genres:
 *   post:
 *     summary: Create a new genre
 *     tags: [Genres]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       201:
 *         description: Genre created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       500:
 *         description: Some server error
 */
router.post("/", GenreController.createGenre);

/**
 * @swagger
 * /genres/{id}:
 *   put:
 *     summary: Update a genre by ID
 *     tags: [Genres]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the genre to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       200:
 *         description: Genre updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       404:
 *         description: Genre not found
 *       500:
 *         description: Some server error
 */
router.put("/:id", GenreController.updateGenreById);

/**
 * @swagger
 * /genres/{id}:
 *   delete:
 *     summary: Delete a genre by ID
 *     tags: [Genres]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the genre to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Genre deleted successfully
 *       404:
 *         description: Genre not found
 *       500:
 *         description: Some server error
 */
router.delete("/:id", GenreController.deleteGenreById);

/**
 * @swagger
 * /genres/{genreId}/books/{bookId}:
 *   post:
 *     summary: Add a book to a genre
 *     tags: [Genres]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: genreId
 *         in: path
 *         required: true
 *         description: ID of the genre
 *         schema:
 *           type: string
 *       - name: bookId
 *         in: path
 *         required: true
 *         description: ID of the book
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book added to genre successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       404:
 *         description: Genre or book not found
 *       500:
 *         description: Some server error
 */
router.post("/:genreId/books/:bookId", GenreController.addBookToGenre);

export default router;
