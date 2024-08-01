import { Types } from "mongoose";
import * as authorController from "../controllers/authorController";
import * as AuthorService from "../services/authorService";
import AppError from "../utils/appError";
import { mockRequest, mockResponse } from "../utils/testHelpers";

jest.mock("../services/authorService");

describe("Author Controller", () => {
  const next = jest.fn();

  describe("createAuthor", () => {
    it("should create an author and return it", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const author = { name: "Test Author" };

      req.body = author;
      (AuthorService.createAuthor as jest.Mock).mockResolvedValue(author);

      await authorController.createAuthor(req as any, res as any, next);

      expect(AuthorService.createAuthor).toHaveBeenCalledWith(author);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { author },
      });
    });
  });

  describe("getAuthorById", () => {
    it("should return an author by id", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const authorId = new Types.ObjectId();
      const author = { _id: authorId, name: "Test Author" };

      req.params = { id: authorId.toHexString() }; 
      (AuthorService.getAuthorById as jest.Mock).mockResolvedValue(author);

      await authorController.getAuthorById(req as any, res as any, next);

      expect(AuthorService.getAuthorById).toHaveBeenCalledWith(authorId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { author },
      });
    });

    it("should return 404 if author not found", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const authorId = new Types.ObjectId();

      req.params = { id: authorId.toHexString() }; 
      (AuthorService.getAuthorById as jest.Mock).mockResolvedValue(null);

      await authorController.getAuthorById(req as any, res as any, next);

      expect(AuthorService.getAuthorById).toHaveBeenCalledWith(authorId);
      expect(next).toHaveBeenCalledWith(
        new AppError("No author found with that ID", 404)
      );
    });
  });

  describe("getAllAuthors", () => {
    it("should return all authors", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const authors = [{ name: "Test Author 1" }, { name: "Test Author 2" }];
      const authorsData = {
        authors,
        total: authors.length,
        page: 1,
        limit: 10,
      };

      (AuthorService.getAllAuthors as jest.Mock).mockResolvedValue(authorsData);

      await authorController.getAllAuthors(req as any, res as any, next);

      expect(AuthorService.getAllAuthors).toHaveBeenCalledWith(
        undefined,
        1,
        10,
        "name",
        "asc"
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: authorsData,
      });
    });
  });

  describe("updateAuthorById", () => {
    it("should update an author and return it", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const authorId = new Types.ObjectId();
      const updatedAuthor = { _id: authorId, name: "Updated Author" };

      req.params = { id: authorId.toHexString() }; 
      req.body = { name: "Updated Author" };
      (AuthorService.updateAuthorById as jest.Mock).mockResolvedValue(
        updatedAuthor
      );

      await authorController.updateAuthorById(req as any, res as any, next);

      expect(AuthorService.updateAuthorById).toHaveBeenCalledWith(
        authorId,
        req.body
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { author: updatedAuthor },
      });
    });

    it("should return 404 if author not found", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const authorId = new Types.ObjectId();

      req.params = { id: authorId.toHexString() }; 
      req.body = { name: "Updated Author" };
      (AuthorService.updateAuthorById as jest.Mock).mockResolvedValue(null);

      await authorController.updateAuthorById(req as any, res as any, next);

      expect(AuthorService.updateAuthorById).toHaveBeenCalledWith(
        authorId,
        req.body
      );
      expect(next).toHaveBeenCalledWith(
        new AppError("No author found with that ID", 404)
      );
    });
  });

  describe("deleteAuthorById", () => {
    it("should delete an author and return success message", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const authorId = new Types.ObjectId();

      req.params = { id: authorId.toHexString() }; 
      (AuthorService.deleteAuthorById as jest.Mock).mockResolvedValue({});

      await authorController.deleteAuthorById(req as any, res as any, next);

      expect(AuthorService.deleteAuthorById).toHaveBeenCalledWith(authorId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: "Author deleted successfully",
        data: null,
      });
    });

    it("should return 404 if author not found", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const authorId = new Types.ObjectId();

      req.params = { id: authorId.toHexString() }; 
      (AuthorService.deleteAuthorById as jest.Mock).mockResolvedValue(null);

      await authorController.deleteAuthorById(req as any, res as any, next);

      expect(AuthorService.deleteAuthorById).toHaveBeenCalledWith(authorId);
      expect(next).toHaveBeenCalledWith(
        new AppError("No author found with that ID", 404)
      );
    });
  });

  describe("addBookToAuthor", () => {
    it("should add a book to an author and return the updated author", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const authorId = new Types.ObjectId();
      const bookId = new Types.ObjectId();
      const updatedAuthor = { _id: authorId, books: [bookId] };

      req.params = {
        authorId: authorId.toHexString(),
        bookId: bookId.toHexString(),
      }; 
      (AuthorService.addBookToAuthor as jest.Mock).mockResolvedValue(
        updatedAuthor
      );

      await authorController.addBookToAuthor(req as any, res as any, next);

      expect(AuthorService.addBookToAuthor).toHaveBeenCalledWith(
        authorId,
        bookId
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { author: updatedAuthor },
      });
    });

    it("should return 404 if author not found", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const authorId = new Types.ObjectId();
      const bookId = new Types.ObjectId();

      req.params = {
        authorId: authorId.toHexString(),
        bookId: bookId.toHexString(),
      }; 
      (AuthorService.addBookToAuthor as jest.Mock).mockResolvedValue(null);

      await authorController.addBookToAuthor(req as any, res as any, next);

      expect(AuthorService.addBookToAuthor).toHaveBeenCalledWith(
        authorId,
        bookId
      );
      expect(next).toHaveBeenCalledWith(
        new AppError("No author found with that ID", 404)
      );
    });
  });
});
