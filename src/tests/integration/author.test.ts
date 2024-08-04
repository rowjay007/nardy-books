import mongoose from "mongoose";
import Author, { IAuthor } from "../../models/authorModel";
import * as AuthorService from "../../services/authorService";
import { clearDatabase, setupTestDB, teardownTestDB } from "./testSetup";

describe("Author Service Integration Tests", () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  afterAll(async () => {
    await teardownTestDB();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  describe("createAuthor", () => {
    it("should create a new author", async () => {
      const authorData: Partial<IAuthor> = {
        name: "Test Author",
        biography: "This is a test author.",
      };

      const author = await AuthorService.createAuthor(authorData);

      expect(author).toBeDefined();
      expect(author.name).toBe(authorData.name);
      expect(author.biography).toBe(authorData.biography);

      const savedAuthor = await Author.findById(
        author._id as mongoose.Types.ObjectId
      );
      expect(savedAuthor).toBeDefined();
      expect(savedAuthor!.name).toBe(authorData.name);
    });
  });

  describe("getAllAuthors", () => {
    it("should retrieve all authors", async () => {
      await Author.create([
        {
          name: "Author 1",
          biography: "Biography of Author 1",
        },
        {
          name: "Author 2",
          biography: "Biography of Author 2",
        },
      ]);

      const result = await AuthorService.getAllAuthors();

      expect(result.authors).toHaveLength(2);
      expect(result.total).toBe(2);
    });

    it("should filter authors based on query parameters", async () => {
      await Author.create([
        {
          name: "Author 1",
          biography: "Biography of Author 1",
        },
        {
          name: "Author 2",
          biography: "Biography of Author 2",
        },
      ]);

      const result = await AuthorService.getAllAuthors("Author 1");

      expect(result.authors).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.authors[0].name).toBe("Author 1");
    });
  });

  describe("updateAuthorById", () => {
    it("should update an author", async () => {
      const author = await Author.create({
        name: "Original Author",
        biography: "Original Biography",
      });

      const updatedAuthor = await AuthorService.updateAuthorById(
        author._id as mongoose.Types.ObjectId,
        {
          name: "Updated Author",
          biography: "Updated Biography",
        }
      );

      expect(updatedAuthor).toBeDefined();
      expect(updatedAuthor!.name).toBe("Updated Author");
      expect(updatedAuthor!.biography).toBe("Updated Biography");

      const checkAuthor = await Author.findById(
        author._id as mongoose.Types.ObjectId
      );
      expect(checkAuthor!.name).toBe("Updated Author");
    });

    it("should return null when updating non-existent author", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const updatedAuthor = await AuthorService.updateAuthorById(fakeId, {
        name: "New Author",
      });
      expect(updatedAuthor).toBeNull();
    });
  });

  describe("deleteAuthorById", () => {
    it("should delete an author", async () => {
      const author = await Author.create({
        name: "Author to Delete",
        biography: "Biography to Delete",
      });

      await AuthorService.deleteAuthorById(
        author._id as mongoose.Types.ObjectId
      );

      const checkAuthor = await Author.findById(
        author._id as mongoose.Types.ObjectId
      );
      expect(checkAuthor).toBeNull();
    });

    it("should return null when deleting non-existent author", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const result = await AuthorService.deleteAuthorById(fakeId);
      expect(result).toBeNull();
    });
  });

  describe("addBookToAuthor", () => {
    it("should return null when adding book to non-existent author", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const bookId = new mongoose.Types.ObjectId();
      const result = await AuthorService.addBookToAuthor(fakeId, bookId);
      expect(result).toBeNull();
    });
  });
});
