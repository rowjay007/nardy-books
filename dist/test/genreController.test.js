"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="80675775-23c4-5205-a5d6-afbc616a8fc5")}catch(e){}}();

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const genreController = __importStar(require("../controllers/genreController"));
const GenreService = __importStar(require("../services/genreService"));
const appError_1 = __importDefault(require("../utils/appError"));
const testHelpers_1 = require("../utils/testHelpers");
jest.mock("../services/genreService");
describe("Genre Controller", () => {
    const next = jest.fn();
    describe("createGenre", () => {
        it("should create a genre and return it", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const genre = { name: "Test Genre" };
            req.body = genre;
            GenreService.createGenre.mockResolvedValue(genre);
            yield genreController.createGenre(req, res, next);
            expect(GenreService.createGenre).toHaveBeenCalledWith(genre);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: { genre },
            });
        }));
    });
    describe("getGenreById", () => {
        it("should return a genre by id", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const genreId = new mongoose_1.Types.ObjectId();
            const genre = { _id: genreId, name: "Test Genre" };
            req.params = { id: genreId.toHexString() };
            GenreService.getGenreById.mockResolvedValue(genre);
            yield genreController.getGenreById(req, res, next);
            expect(GenreService.getGenreById).toHaveBeenCalledWith(genreId);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: { genre },
            });
        }));
        it("should return 404 if genre not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const genreId = new mongoose_1.Types.ObjectId();
            req.params = { id: genreId.toHexString() };
            GenreService.getGenreById.mockResolvedValue(null);
            yield genreController.getGenreById(req, res, next);
            expect(GenreService.getGenreById).toHaveBeenCalledWith(genreId);
            expect(next).toHaveBeenCalledWith(new appError_1.default("No genre found with that ID", 404));
        }));
    });
    describe("getAllGenres", () => {
        it("should return all genres", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const genres = [{ name: "Test Genre 1" }, { name: "Test Genre 2" }];
            GenreService.getAllGenres.mockResolvedValue(genres);
            req.query = req.query || {};
            yield genreController.getAllGenres(req, res, next);
            expect(GenreService.getAllGenres).toHaveBeenCalledWith(req.query.filter, Number(req.query.page), Number(req.query.limit), req.query.sort);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: { genres },
            });
        }));
    });
    describe("updateGenreById", () => {
        it("should update a genre and return it", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const genreId = new mongoose_1.Types.ObjectId();
            const updatedGenre = { _id: genreId, name: "Updated Genre" };
            req.params = { id: genreId.toHexString() };
            req.body = { name: "Updated Genre" };
            GenreService.updateGenreById.mockResolvedValue(updatedGenre);
            yield genreController.updateGenreById(req, res, next);
            expect(GenreService.updateGenreById).toHaveBeenCalledWith(genreId, req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: { genre: updatedGenre },
            });
        }));
        it("should return 404 if genre not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const genreId = new mongoose_1.Types.ObjectId();
            req.params = { id: genreId.toHexString() };
            req.body = { name: "Updated Genre" };
            GenreService.updateGenreById.mockResolvedValue(null);
            yield genreController.updateGenreById(req, res, next);
            expect(GenreService.updateGenreById).toHaveBeenCalledWith(genreId, req.body);
            expect(next).toHaveBeenCalledWith(new appError_1.default("No genre found with that ID", 404));
        }));
    });
    describe("deleteGenreById", () => {
        it("should delete a genre and return success message", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const genreId = new mongoose_1.Types.ObjectId();
            req.params = { id: genreId.toHexString() };
            GenreService.deleteGenreById.mockResolvedValue({});
            yield genreController.deleteGenreById(req, res, next);
            expect(GenreService.deleteGenreById).toHaveBeenCalledWith(genreId);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                message: "Genre successfully deleted",
                data: null,
            });
        }));
        it("should return 404 if genre not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const genreId = new mongoose_1.Types.ObjectId();
            req.params = { id: genreId.toHexString() };
            GenreService.deleteGenreById.mockResolvedValue(null);
            yield genreController.deleteGenreById(req, res, next);
            expect(GenreService.deleteGenreById).toHaveBeenCalledWith(genreId);
            expect(next).toHaveBeenCalledWith(new appError_1.default("No genre found with that ID", 404));
        }));
    });
    describe("addBookToGenre", () => {
        it("should add a book to a genre and return the updated genre", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const genreId = new mongoose_1.Types.ObjectId();
            const bookId = new mongoose_1.Types.ObjectId();
            const updatedGenre = { _id: genreId, books: [bookId] };
            req.params = {
                genreId: genreId.toHexString(),
                bookId: bookId.toHexString(),
            };
            GenreService.addBookToGenre.mockResolvedValue(updatedGenre);
            yield genreController.addBookToGenre(req, res, next);
            expect(GenreService.addBookToGenre).toHaveBeenCalledWith(genreId, bookId);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: { genre: updatedGenre },
            });
        }));
        it("should return 404 if genre not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const genreId = new mongoose_1.Types.ObjectId();
            const bookId = new mongoose_1.Types.ObjectId();
            req.params = {
                genreId: genreId.toHexString(),
                bookId: bookId.toHexString(),
            };
            GenreService.addBookToGenre.mockResolvedValue(null);
            yield genreController.addBookToGenre(req, res, next);
            expect(GenreService.addBookToGenre).toHaveBeenCalledWith(genreId, bookId);
            expect(next).toHaveBeenCalledWith(new appError_1.default("No genre found with that ID", 404));
        }));
    });
});
//# sourceMappingURL=genreController.test.js.map
//# debugId=80675775-23c4-5205-a5d6-afbc616a8fc5
