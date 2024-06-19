import { Router } from "express";
import * as AuthorController from "../controllers/authorController";

const router = Router();

router.post("/", AuthorController.createAuthor);
router.get("/:id", AuthorController.getAuthorById);
router.get("/", AuthorController.getAllAuthors);
router.put("/:id", AuthorController.updateAuthorById);
router.delete("/:id", AuthorController.deleteAuthorById);
router.put(
  "/:authorId/books/:bookId",
  AuthorController.addBookToAuthor
);

export default router;
