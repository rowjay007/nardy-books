import express from "express";
import * as BookController from "../controllers/book.controller";

const router = express.Router();
router.get("/books", BookController.getAllBooks);
router.post("/books", BookController.createBook);
router.get("/books/:bookId", BookController.getBookById);

export default router;
