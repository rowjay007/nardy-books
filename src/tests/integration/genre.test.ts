import mongoose from "mongoose";
import Genre, { IGenre } from "../../models/genreModel";
import * as GenreService from "../../services/genreService";
import { clearDatabase, setupTestDB, teardownTestDB } from "./testSetup";

describe("Genre Service Integration Tests", () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  afterAll(async () => {
    await teardownTestDB();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  describe("createGenre", () => {
    it("should create a new genre", async () => {
      const genreData: Partial<IGenre> = {
        name: "Test Genre",
        description: "This is a test genre.",
      };

      const genre = await GenreService.createGenre(genreData);

      expect(genre).toBeDefined();
      expect(genre.name).toBe(genreData.name);
      expect(genre.description).toBe(genreData.description);

      const savedGenre = await Genre.findById(
        genre._id as mongoose.Types.ObjectId
      );
      expect(savedGenre).toBeDefined();
      expect(savedGenre!.name).toBe(genreData.name);
    });
  });

  describe("getAllGenres", () => {
    it("should retrieve all genres", async () => {
      await Genre.create([
        {
          name: "Genre 1",
          description: "Description of Genre 1",
        },
        {
          name: "Genre 2",
          description: "Description of Genre 2",
        },
      ]);

      const result = await GenreService.getAllGenres({}, 1, 10, null);

      expect(result).toHaveLength(2);
    });

    it("should filter genres based on query parameters", async () => {
      await Genre.create([
        {
          name: "Genre 1",
          description: "Description of Genre 1",
        },
        {
          name: "Genre 2",
          description: "Description of Genre 2",
        },
      ]);

      const result = await GenreService.getAllGenres(
        { name: "Genre 1" },
        1,
        10,
        null
      );

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Genre 1");
    });
  });

  describe("updateGenreById", () => {
    it("should update a genre", async () => {
      const genre = await Genre.create({
        name: "Original Genre",
        description: "Original Description",
      });

      const updatedGenre = await GenreService.updateGenreById(
        genre._id as mongoose.Types.ObjectId,
        {
          name: "Updated Genre",
          description: "Updated Description",
        }
      );

      expect(updatedGenre).toBeDefined();
      expect(updatedGenre!.name).toBe("Updated Genre");
      expect(updatedGenre!.description).toBe("Updated Description");

      const checkGenre = await Genre.findById(
        genre._id as mongoose.Types.ObjectId
      );
      expect(checkGenre!.name).toBe("Updated Genre");
    });

    it("should return null when updating non-existent genre", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const updatedGenre = await GenreService.updateGenreById(fakeId, {
        name: "New Genre",
      });
      expect(updatedGenre).toBeNull();
    });
  });

  describe("deleteGenreById", () => {
    it("should delete a genre", async () => {
      const genre = await Genre.create({
        name: "Genre to Delete",
        description: "Description to Delete",
      });

      await GenreService.deleteGenreById(genre._id as mongoose.Types.ObjectId);

      const checkGenre = await Genre.findById(
        genre._id as mongoose.Types.ObjectId
      );
      expect(checkGenre).toBeNull();
    });

    it("should return null when deleting non-existent genre", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const result = await GenreService.deleteGenreById(fakeId);
      expect(result).toBeNull();
    });
  });

  describe("addBookToGenre", () => {
    it("should return null when adding book to non-existent genre", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const bookId = new mongoose.Types.ObjectId();
      const result = await GenreService.addBookToGenre(fakeId, bookId);
      expect(result).toBeNull();
    });
  });
});
