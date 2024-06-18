import { Router } from "express";
import BookController from "../controllers/bookController";

const router = Router();

router.post("/books", BookController.createBook);
router.get("/books/:id", BookController.getBookById);
router.get("/books", BookController.getAllBooks);
router.put("/books/:id", BookController.updateBookById);
router.delete("/books/:id", BookController.deleteBookById);

export default router;
