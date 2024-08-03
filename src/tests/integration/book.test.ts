import mongoose from "mongoose";
import { setupTestDB, teardownTestDB, clearDatabase } from "./testSetup";
import * as BookService from "../../services/bookService";
import Book, { IBook } from "../../models/bookModel"; 

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

    const savedBook = (await Book.findById(
      book._id as mongoose.Types.ObjectId
    ).exec()) as IBook | null;
    expect(savedBook).toBeDefined();
    if (savedBook) {
      expect(savedBook.title).toBe(bookData.title);
      expect(savedBook.price).toBe(bookData.price);
    }
  });

});
