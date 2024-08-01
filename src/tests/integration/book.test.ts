import request from "supertest";
import mongoose from "mongoose";
import app from "../../app";
import Book, { IBook } from "../../models/bookModel";
import Author, { IAuthor } from "../../models/authorModel";
import Publisher, { IPublisher } from "../../models/publisherModel";
import Genre, { IGenre } from "../../models/genreModel";
import { connectDB, closeDB } from "../../config/db";

describe("Book API", () => {
  let authorId: mongoose.Types.ObjectId;
  let publisherId: mongoose.Types.ObjectId;
  let genreId: mongoose.Types.ObjectId;

  beforeAll(async () => {
    await connectDB();
    // Create test author, publisher, and genre
    const author = (await Author.create({ name: "Test Author" })) as IAuthor & {
      _id: mongoose.Types.ObjectId;
    };
    const publisher = (await Publisher.create({
      name: "Test Publisher",
    })) as IPublisher & { _id: mongoose.Types.ObjectId };
    const genre = (await Genre.create({ name: "Test Genre" })) as IGenre & {
      _id: mongoose.Types.ObjectId;
    };

    authorId = author._id;
    publisherId = publisher._id;
    genreId = genre._id;
  });

  afterAll(async () => {
    // Clean up test data
    await Author.deleteMany({});
    await Publisher.deleteMany({});
    await Genre.deleteMany({});
    await closeDB();
  });

  beforeEach(async () => {
    await Book.deleteMany({});
  });

  describe("POST /api/books", () => {
    it("should create a new book", async () => {
      const bookData = {
        title: "Test Book",
        author: authorId,
        publisher: publisherId,
        genre: genreId,
        price: 19.99,
      };

      const response = await request(app).post("/api/books").send(bookData);

      expect(response.status).toBe(201);
      expect(response.body.title).toBe(bookData.title);
      expect(response.body.author).toBe(authorId.toString());
      expect(response.body.publisher).toBe(publisherId.toString());
      expect(response.body.genre).toBe(genreId.toString());
      expect(response.body.price).toBe(bookData.price);
    });

    it("should return 400 if required fields are missing", async () => {
      const response = await request(app)
        .post("/api/books")
        .send({ title: "Incomplete Book" });

      expect(response.status).toBe(400);
    });
  });

  describe("GET /api/books", () => {
    it("should get all books", async () => {
      // Create test books
      await Book.create([
        {
          title: "Book 1",
          author: authorId,
          publisher: publisherId,
          genre: genreId,
          price: 9.99,
        },
        {
          title: "Book 2",
          author: authorId,
          publisher: publisherId,
          genre: genreId,
          price: 14.99,
        },
      ]);

      const response = await request(app).get("/api/books");

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0].title).toBe("Book 1");
      expect(response.body[1].title).toBe("Book 2");
    });
  });

  describe("GET /api/books/:id", () => {
    it("should get a book by id", async () => {
      const book = await Book.create({
        title: "Test Book",
        author: authorId,
        publisher: publisherId,
        genre: genreId,
        price: 19.99,
      });

      const response = await request(app).get(`/api/books/${book._id}`);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe("Test Book");
    });

    it("should return 404 if book is not found", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app).get(`/api/books/${fakeId}`);

      expect(response.status).toBe(404);
    });
  });

  describe("PUT /api/books/:id", () => {
    it("should update a book", async () => {
      const book = await Book.create({
        title: "Old Title",
        author: authorId,
        publisher: publisherId,
        genre: genreId,
        price: 19.99,
      });

      const response = await request(app)
        .put(`/api/books/${book._id}`)
        .send({ title: "New Title", price: 24.99 });

      expect(response.status).toBe(200);
      expect(response.body.title).toBe("New Title");
      expect(response.body.price).toBe(24.99);
    });

    it("should return 404 if book to update is not found", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .put(`/api/books/${fakeId}`)
        .send({ title: "New Title" });

      expect(response.status).toBe(404);
    });
  });

  describe("DELETE /api/books/:id", () => {
    it("should delete a book", async () => {
      const book = await Book.create({
        title: "Book to Delete",
        author: authorId,
        publisher: publisherId,
        genre: genreId,
        price: 19.99,
      });

      const response = await request(app).delete(`/api/books/${book._id}`);

      expect(response.status).toBe(204);

      const deletedBook = await Book.findById(book._id);
      expect(deletedBook).toBeNull();
    });

    it("should return 404 if book to delete is not found", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app).delete(`/api/books/${fakeId}`);

      expect(response.status).toBe(404);
    });
  });
});
