"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="28c56cf2-d280-5e0c-8f6a-8af260452e3c")}catch(e){}}();

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
const GenreController = __importStar(require("../controllers/genreController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.protect);
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
exports.default = router;
//# sourceMappingURL=genreRoutes.js.map
//# debugId=28c56cf2-d280-5e0c-8f6a-8af260452e3c
