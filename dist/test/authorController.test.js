"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="a363efcd-9c77-5588-ae4b-ffaee25e6ec5")}catch(e){}}();

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
const authorController = __importStar(require("../controllers/authorController"));
const AuthorService = __importStar(require("../services/authorService"));
const appError_1 = __importDefault(require("../utils/appError"));
const testHelpers_1 = require("../utils/testHelpers");
jest.mock("../services/authorService");
describe("Author Controller", () => {
    const next = jest.fn();
    describe("createAuthor", () => {
        it("should create an author and return it", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const author = { name: "Test Author" };
            req.body = author;
            AuthorService.createAuthor.mockResolvedValue(author);
            yield authorController.createAuthor(req, res, next);
            expect(AuthorService.createAuthor).toHaveBeenCalledWith(author);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: { author },
            });
        }));
    });
    describe("getAuthorById", () => {
        it("should return an author by id", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const authorId = new mongoose_1.Types.ObjectId();
            const author = { _id: authorId, name: "Test Author" };
            req.params = { id: authorId.toHexString() };
            AuthorService.getAuthorById.mockResolvedValue(author);
            yield authorController.getAuthorById(req, res, next);
            expect(AuthorService.getAuthorById).toHaveBeenCalledWith(authorId);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: { author },
            });
        }));
        it("should return 404 if author not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const authorId = new mongoose_1.Types.ObjectId();
            req.params = { id: authorId.toHexString() };
            AuthorService.getAuthorById.mockResolvedValue(null);
            yield authorController.getAuthorById(req, res, next);
            expect(AuthorService.getAuthorById).toHaveBeenCalledWith(authorId);
            expect(next).toHaveBeenCalledWith(new appError_1.default("No author found with that ID", 404));
        }));
    });
    describe("getAllAuthors", () => {
        it("should return all authors", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const authors = [{ name: "Test Author 1" }, { name: "Test Author 2" }];
            const authorsData = {
                authors,
                total: authors.length,
                page: 1,
                limit: 10,
            };
            AuthorService.getAllAuthors.mockResolvedValue(authorsData);
            yield authorController.getAllAuthors(req, res, next);
            expect(AuthorService.getAllAuthors).toHaveBeenCalledWith(undefined, 1, 10, "name", "asc");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: authorsData,
            });
        }));
    });
    describe("updateAuthorById", () => {
        it("should update an author and return it", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const authorId = new mongoose_1.Types.ObjectId();
            const updatedAuthor = { _id: authorId, name: "Updated Author" };
            req.params = { id: authorId.toHexString() };
            req.body = { name: "Updated Author" };
            AuthorService.updateAuthorById.mockResolvedValue(updatedAuthor);
            yield authorController.updateAuthorById(req, res, next);
            expect(AuthorService.updateAuthorById).toHaveBeenCalledWith(authorId, req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: { author: updatedAuthor },
            });
        }));
        it("should return 404 if author not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const authorId = new mongoose_1.Types.ObjectId();
            req.params = { id: authorId.toHexString() };
            req.body = { name: "Updated Author" };
            AuthorService.updateAuthorById.mockResolvedValue(null);
            yield authorController.updateAuthorById(req, res, next);
            expect(AuthorService.updateAuthorById).toHaveBeenCalledWith(authorId, req.body);
            expect(next).toHaveBeenCalledWith(new appError_1.default("No author found with that ID", 404));
        }));
    });
    describe("deleteAuthorById", () => {
        it("should delete an author and return success message", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const authorId = new mongoose_1.Types.ObjectId();
            req.params = { id: authorId.toHexString() };
            AuthorService.deleteAuthorById.mockResolvedValue({});
            yield authorController.deleteAuthorById(req, res, next);
            expect(AuthorService.deleteAuthorById).toHaveBeenCalledWith(authorId);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                message: "Author deleted successfully",
                data: null,
            });
        }));
        it("should return 404 if author not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const authorId = new mongoose_1.Types.ObjectId();
            req.params = { id: authorId.toHexString() };
            AuthorService.deleteAuthorById.mockResolvedValue(null);
            yield authorController.deleteAuthorById(req, res, next);
            expect(AuthorService.deleteAuthorById).toHaveBeenCalledWith(authorId);
            expect(next).toHaveBeenCalledWith(new appError_1.default("No author found with that ID", 404));
        }));
    });
    describe("addBookToAuthor", () => {
        it("should add a book to an author and return the updated author", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const authorId = new mongoose_1.Types.ObjectId();
            const bookId = new mongoose_1.Types.ObjectId();
            const updatedAuthor = { _id: authorId, books: [bookId] };
            req.params = {
                authorId: authorId.toHexString(),
                bookId: bookId.toHexString(),
            };
            AuthorService.addBookToAuthor.mockResolvedValue(updatedAuthor);
            yield authorController.addBookToAuthor(req, res, next);
            expect(AuthorService.addBookToAuthor).toHaveBeenCalledWith(authorId, bookId);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: { author: updatedAuthor },
            });
        }));
        it("should return 404 if author not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const authorId = new mongoose_1.Types.ObjectId();
            const bookId = new mongoose_1.Types.ObjectId();
            req.params = {
                authorId: authorId.toHexString(),
                bookId: bookId.toHexString(),
            };
            AuthorService.addBookToAuthor.mockResolvedValue(null);
            yield authorController.addBookToAuthor(req, res, next);
            expect(AuthorService.addBookToAuthor).toHaveBeenCalledWith(authorId, bookId);
            expect(next).toHaveBeenCalledWith(new appError_1.default("No author found with that ID", 404));
        }));
    });
});
//# sourceMappingURL=authorController.test.js.map
//# debugId=a363efcd-9c77-5588-ae4b-ffaee25e6ec5
