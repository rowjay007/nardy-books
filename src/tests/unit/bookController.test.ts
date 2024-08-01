import { Types } from "mongoose";
import * as bookController from "../../controllers/bookController";
import * as BookService from "../../services/bookService";
import AppError from "../../utils/appError";
import { mockRequest, mockResponse } from "../../utils/testHelpers";

jest.mock("../services/bookService");

describe("Book Controller", () => {
  const next = jest.fn();

  describe("createBook", () => {
    it("should create a book and return it", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const book = { title: "Test Book", author: "Test Author" };

      req.body = book;
      (BookService.createBook as jest.Mock).mockResolvedValue(book);

      await bookController.createBook(req as any, res as any, next);

      expect(BookService.createBook).toHaveBeenCalledWith(book);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(book);
    });
  });

  describe("getBookById", () => {
    it("should return a book by id", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const bookId = new Types.ObjectId();
      const book = { _id: bookId, title: "Test Book", author: "Test Author" };

      req.params = { id: bookId.toHexString() };
      (BookService.getBookById as jest.Mock).mockResolvedValue(book);

      await bookController.getBookById(req as any, res as any, next);

      expect(BookService.getBookById).toHaveBeenCalledWith(bookId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(book);
    });

    it("should return 404 if book not found", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const bookId = new Types.ObjectId();

      req.params = { id: bookId.toHexString() };
      (BookService.getBookById as jest.Mock).mockResolvedValue(null);

      await bookController.getBookById(req as any, res as any, next);

      expect(BookService.getBookById).toHaveBeenCalledWith(bookId);
      expect(next).toHaveBeenCalledWith(new AppError("Book not found", 404));
    });
  });

  describe("getAllBooks", () => {
    it("should return all books", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const books = [{ title: "Test Book 1" }, { title: "Test Book 2" }];

      (BookService.getAllBooks as jest.Mock).mockResolvedValue({
        books,
        total: books.length,
      });

      await bookController.getAllBooks(req as any, res as any, next);

      expect(BookService.getAllBooks).toHaveBeenCalledWith(req.query);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ books, total: books.length });
    });
  });

  describe("updateBookById", () => {
    it("should update a book and return it", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const bookId = new Types.ObjectId();
      const updatedBook = { _id: bookId, title: "Updated Title" };

      req.params = { id: bookId.toHexString() };
      req.body = { title: "Updated Title" };
      (BookService.updateBookById as jest.Mock).mockResolvedValue(updatedBook);

      await bookController.updateBookById(req as any, res as any, next);

      expect(BookService.updateBookById).toHaveBeenCalledWith(bookId, req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedBook);
    });

    it("should return 404 if book not found", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const bookId = new Types.ObjectId();

      req.params = { id: bookId.toHexString() };
      req.body = { title: "Updated Title" };
      (BookService.updateBookById as jest.Mock).mockResolvedValue(null);

      await bookController.updateBookById(req as any, res as any, next);

      expect(BookService.updateBookById).toHaveBeenCalledWith(bookId, req.body);
      expect(next).toHaveBeenCalledWith(new AppError("Book not found", 404));
    });
  });

  describe("deleteBookById", () => {
    it("should delete a book and return success message", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const bookId = new Types.ObjectId();

      req.params = { id: bookId.toHexString() };
      (BookService.deleteBookById as jest.Mock).mockResolvedValue(undefined);

      await bookController.deleteBookById(req as any, res as any, next);

      expect(BookService.deleteBookById).toHaveBeenCalledWith(bookId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Book deleted successfully",
      });
    });
  });

  describe("addSubscriptionToBook", () => {
    it("should add a subscription to a book and return the updated book", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const bookId = new Types.ObjectId().toHexString();
      const subscriptionId = new Types.ObjectId().toHexString();
      const updatedBook = {
        _id: bookId,
        title: "Test Book",
        subscriptions: [subscriptionId],
      };

      req.params = { bookId };
      req.body = { subscriptionId };
      (BookService.addSubscriptionToBook as jest.Mock).mockResolvedValue(
        updatedBook
      );

      await bookController.addSubscriptionToBook(req as any, res as any, next);

      expect(BookService.addSubscriptionToBook).toHaveBeenCalledWith(
        bookId,
        subscriptionId
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedBook);
    });

    it("should return 400 if bookId or subscriptionId is missing", async () => {
      const req = mockRequest();
      const res = mockResponse();

      req.params = {};
      req.body = {};

      await bookController.addSubscriptionToBook(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(new AppError("Invalid ID", 400));
    });

    it("should return 404 if book not found", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const bookId = new Types.ObjectId().toHexString();
      const subscriptionId = new Types.ObjectId().toHexString();

      req.params = { bookId };
      req.body = { subscriptionId };
      (BookService.addSubscriptionToBook as jest.Mock).mockResolvedValue(null);

      await bookController.addSubscriptionToBook(req as any, res as any, next);

      expect(BookService.addSubscriptionToBook).toHaveBeenCalledWith(
        bookId,
        subscriptionId
      );
      expect(next).toHaveBeenCalledWith(new AppError("Book not found", 404));
    });
  });

  describe("removeSubscriptionFromBook", () => {
    it("should remove a subscription from a book and return the updated book", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const bookId = new Types.ObjectId().toHexString();
      const subscriptionId = new Types.ObjectId().toHexString();
      const updatedBook = {
        _id: bookId,
        title: "Test Book",
        subscriptions: [],
      };

      req.params = { bookId };
      req.body = { subscriptionId };
      (BookService.removeSubscriptionFromBook as jest.Mock).mockResolvedValue(
        updatedBook
      );

      await bookController.removeSubscriptionFromBook(
        req as any,
        res as any,
        next
      );

      expect(BookService.removeSubscriptionFromBook).toHaveBeenCalledWith(
        bookId,
        subscriptionId
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedBook);
    });

    it("should return 400 if bookId or subscriptionId is missing", async () => {
      const req = mockRequest();
      const res = mockResponse();

      req.params = {};
      req.body = {};

      await bookController.removeSubscriptionFromBook(
        req as any,
        res as any,
        next
      );

      expect(next).toHaveBeenCalledWith(new AppError("Invalid ID", 400));
    });

    it("should return 404 if book not found", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const bookId = new Types.ObjectId().toHexString();
      const subscriptionId = new Types.ObjectId().toHexString();

      req.params = { bookId };
      req.body = { subscriptionId };
      (BookService.removeSubscriptionFromBook as jest.Mock).mockResolvedValue(
        null
      );

      await bookController.removeSubscriptionFromBook(
        req as any,
        res as any,
        next
      );

      expect(BookService.removeSubscriptionFromBook).toHaveBeenCalledWith(
        bookId,
        subscriptionId
      );
      expect(next).toHaveBeenCalledWith(new AppError("Book not found", 404));
    });
  });
});
