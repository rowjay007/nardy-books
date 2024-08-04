import mongoose from "mongoose";
import Book, { IBook } from "../../models/bookModel";
import * as BookService from "../../services/bookService";
import { clearDatabase, setupTestDB, teardownTestDB } from "./testSetup";

describe("Book Service Integration Tests", () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  afterAll(async () => {
    await teardownTestDB();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  describe("createBook", () => {
    it("should create a new book", async () => {
      const bookData = {
        title: "Test Book",
        author: new mongoose.Types.ObjectId(),
        publisher: new mongoose.Types.ObjectId(),
        genre: new mongoose.Types.ObjectId(),
        price: 19.99,
      };

      const book = await BookService.createBook(bookData);

      expect(book).toBeDefined();
      expect(book.title).toBe(bookData.title);
      expect(book.price).toBe(bookData.price);

      const savedBook = await Book.findById(book._id);
      expect(savedBook).toBeDefined();
      expect(savedBook!.title).toBe(bookData.title);
    });
  });

  describe("getBookById", () => {
    it("should return null for non-existent book", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const book = await BookService.getBookById(fakeId);
      expect(book).toBeNull();
    });
  });

  describe("getAllBooks", () => {});

  describe("updateBookById", () => {
    it("should update a book", async () => {
      const book = (await Book.create({
        title: "Original Title",
        price: 10,
        author: new mongoose.Types.ObjectId(),
        publisher: new mongoose.Types.ObjectId(),
        genre: new mongoose.Types.ObjectId(),
      })) as IBook & { _id: mongoose.Types.ObjectId };

      const updatedBook = await BookService.updateBookById(book._id, {
        title: "Updated Title",
        price: 15,
      });

      expect(updatedBook).toBeDefined();
      expect(updatedBook!.title).toBe("Updated Title");
      expect(updatedBook!.price).toBe(15);

      const checkBook = await Book.findById(book._id);
      expect(checkBook!.title).toBe("Updated Title");
    });

    it("should return null when updating non-existent book", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const updatedBook = await BookService.updateBookById(fakeId, {
        title: "New Title",
      });
      expect(updatedBook).toBeNull();
    });
  });

  describe("deleteBookById", () => {
    it("should delete a book", async () => {
      const book = (await Book.create({
        title: "Book to Delete",
        price: 10,
        author: new mongoose.Types.ObjectId(),
        publisher: new mongoose.Types.ObjectId(),
        genre: new mongoose.Types.ObjectId(),
      })) as IBook & { _id: mongoose.Types.ObjectId };

      await BookService.deleteBookById(book._id);

      const checkBook = await Book.findById(book._id);
      expect(checkBook).toBeNull();
    });

    it("should return null when deleting non-existent book", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const result = await BookService.deleteBookById(fakeId);
      expect(result).toBeNull();
    });
  });

  describe("addSubscriptionToBook", () => {
    it("should add a subscription to a book", async () => {
      const book = (await Book.create({
        title: "Test Book",
        price: 10,
        author: new mongoose.Types.ObjectId(),
        publisher: new mongoose.Types.ObjectId(),
        genre: new mongoose.Types.ObjectId(),
      })) as IBook & { _id: mongoose.Types.ObjectId };
      const subscriptionId = new mongoose.Types.ObjectId();

      const updatedBook = await BookService.addSubscriptionToBook(
        book._id.toString(),
        subscriptionId.toString()
      );

      expect(updatedBook).toBeDefined();
      expect(updatedBook!.subscriptions.map(String)).toContain(
        subscriptionId.toString()
      );
    });

    it("should return null when adding subscription to non-existent book", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const subscriptionId = new mongoose.Types.ObjectId();
      const result = await BookService.addSubscriptionToBook(
        fakeId.toString(),
        subscriptionId.toString()
      );
      expect(result).toBeNull();
    });
  });

  describe("removeSubscriptionFromBook", () => {
    it("should remove a subscription from a book", async () => {
      const subscriptionId = new mongoose.Types.ObjectId();
      const book = (await Book.create({
        title: "Test Book",
        price: 10,
        author: new mongoose.Types.ObjectId(),
        publisher: new mongoose.Types.ObjectId(),
        genre: new mongoose.Types.ObjectId(),
        subscriptions: [subscriptionId],
      })) as IBook & { _id: mongoose.Types.ObjectId };

      const updatedBook = await BookService.removeSubscriptionFromBook(
        book._id.toString(),
        subscriptionId.toString()
      );

      expect(updatedBook).toBeDefined();
      expect(updatedBook!.subscriptions.map(String)).not.toContain(
        subscriptionId.toString()
      );
    });

    it("should return null when removing subscription from non-existent book", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const subscriptionId = new mongoose.Types.ObjectId();
      const result = await BookService.removeSubscriptionFromBook(
        fakeId.toString(),
        subscriptionId.toString()
      );
      expect(result).toBeNull();
    });
  });
});
