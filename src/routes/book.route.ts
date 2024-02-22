// book.routes.ts
import express from "express";
import * as BookController from "../controllers/book.controller";

const router = express.Router();

// Route: GET /v1/books
router.get("/books", BookController.getAllBooks);

// Route: POST /v1/books
router.post("/books", BookController.createBook);

// Route: GET /v1/books/:bookId
router.get("/books/:bookId", BookController.getBookById);

export default router;
