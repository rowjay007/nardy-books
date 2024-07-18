import { Types } from "mongoose";
import * as genreController from "../controllers/genreController";
import * as GenreService from "../services/genreService";
import AppError from "../utils/appError";
import { mockRequest, mockResponse } from "../utils/testHelpers";

jest.mock("../services/genreService");

describe("Genre Controller", () => {
  const next = jest.fn();

  describe("createGenre", () => {
    it("should create a genre and return it", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const genre = { name: "Test Genre" };

      req.body = genre;
      (GenreService.createGenre as jest.Mock).mockResolvedValue(genre);

      await genreController.createGenre(req as any, res as any, next);

      expect(GenreService.createGenre).toHaveBeenCalledWith(genre);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { genre },
      });
    });
  });

  describe("getGenreById", () => {
    it("should return a genre by id", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const genreId = new Types.ObjectId();
      const genre = { _id: genreId, name: "Test Genre" };

      req.params = { id: genreId.toHexString() };
      (GenreService.getGenreById as jest.Mock).mockResolvedValue(genre);

      await genreController.getGenreById(req as any, res as any, next);

      expect(GenreService.getGenreById).toHaveBeenCalledWith(genreId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { genre },
      });
    });

    it("should return 404 if genre not found", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const genreId = new Types.ObjectId();

      req.params = { id: genreId.toHexString() };
      (GenreService.getGenreById as jest.Mock).mockResolvedValue(null);

      await genreController.getGenreById(req as any, res as any, next);

      expect(GenreService.getGenreById).toHaveBeenCalledWith(genreId);
      expect(next).toHaveBeenCalledWith(
        new AppError("No genre found with that ID", 404)
      );
    });
  });

  describe("getAllGenres", () => {
    it("should return all genres", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const genres = [{ name: "Test Genre 1" }, { name: "Test Genre 2" }];
      (GenreService.getAllGenres as jest.Mock).mockResolvedValue(genres);
      req.query = req.query || {};
      await genreController.getAllGenres(req as any, res as any, next);
      expect(GenreService.getAllGenres).toHaveBeenCalledWith(
        req.query.filter,
        Number(req.query.page),
        Number(req.query.limit),
        req.query.sort
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { genres },
      });
    });
  });

  describe("updateGenreById", () => {
    it("should update a genre and return it", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const genreId = new Types.ObjectId();
      const updatedGenre = { _id: genreId, name: "Updated Genre" };

      req.params = { id: genreId.toHexString() };
      req.body = { name: "Updated Genre" };
      (GenreService.updateGenreById as jest.Mock).mockResolvedValue(
        updatedGenre
      );

      await genreController.updateGenreById(req as any, res as any, next);

      expect(GenreService.updateGenreById).toHaveBeenCalledWith(
        genreId,
        req.body
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { genre: updatedGenre },
      });
    });

    it("should return 404 if genre not found", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const genreId = new Types.ObjectId();

      req.params = { id: genreId.toHexString() };
      req.body = { name: "Updated Genre" };
      (GenreService.updateGenreById as jest.Mock).mockResolvedValue(null);

      await genreController.updateGenreById(req as any, res as any, next);

      expect(GenreService.updateGenreById).toHaveBeenCalledWith(
        genreId,
        req.body
      );
      expect(next).toHaveBeenCalledWith(
        new AppError("No genre found with that ID", 404)
      );
    });
  });

  describe("deleteGenreById", () => {
    it("should delete a genre and return success message", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const genreId = new Types.ObjectId();

      req.params = { id: genreId.toHexString() };
      (GenreService.deleteGenreById as jest.Mock).mockResolvedValue({});

      await genreController.deleteGenreById(req as any, res as any, next);

      expect(GenreService.deleteGenreById).toHaveBeenCalledWith(genreId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: "Genre successfully deleted",
        data: null,
      });
    });

    it("should return 404 if genre not found", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const genreId = new Types.ObjectId();

      req.params = { id: genreId.toHexString() };
      (GenreService.deleteGenreById as jest.Mock).mockResolvedValue(null);

      await genreController.deleteGenreById(req as any, res as any, next);

      expect(GenreService.deleteGenreById).toHaveBeenCalledWith(genreId);
      expect(next).toHaveBeenCalledWith(
        new AppError("No genre found with that ID", 404)
      );
    });
  });

  describe("addBookToGenre", () => {
    it("should add a book to a genre and return the updated genre", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const genreId = new Types.ObjectId();
      const bookId = new Types.ObjectId();
      const updatedGenre = { _id: genreId, books: [bookId] };

      req.params = {
        genreId: genreId.toHexString(),
        bookId: bookId.toHexString(),
      };
      (GenreService.addBookToGenre as jest.Mock).mockResolvedValue(
        updatedGenre
      );

      await genreController.addBookToGenre(req as any, res as any, next);

      expect(GenreService.addBookToGenre).toHaveBeenCalledWith(genreId, bookId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { genre: updatedGenre },
      });
    });

    it("should return 404 if genre not found", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const genreId = new Types.ObjectId();
      const bookId = new Types.ObjectId();

      req.params = {
        genreId: genreId.toHexString(),
        bookId: bookId.toHexString(),
      };
      (GenreService.addBookToGenre as jest.Mock).mockResolvedValue(null);

      await genreController.addBookToGenre(req as any, res as any, next);

      expect(GenreService.addBookToGenre).toHaveBeenCalledWith(genreId, bookId);
      expect(next).toHaveBeenCalledWith(
        new AppError("No genre found with that ID", 404)
      );
    });
  });
});
