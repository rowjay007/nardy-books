"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="77baefd1-4c6a-53ec-8c10-076e96722231")}catch(e){}}();

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
const bookController = __importStar(require("../controllers/bookController"));
const BookService = __importStar(require("../services/bookService"));
const appError_1 = __importDefault(require("../utils/appError"));
const testHelpers_1 = require("../utils/testHelpers");
jest.mock("../services/bookService");
describe("Book Controller", () => {
    const next = jest.fn();
    describe("createBook", () => {
        it("should create a book and return it", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const book = { title: "Test Book", author: "Test Author" };
            req.body = book;
            BookService.createBook.mockResolvedValue(book);
            yield bookController.createBook(req, res, next);
            expect(BookService.createBook).toHaveBeenCalledWith(book);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(book);
        }));
    });
    describe("getBookById", () => {
        it("should return a book by id", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const bookId = new mongoose_1.Types.ObjectId();
            const book = { _id: bookId, title: "Test Book", author: "Test Author" };
            req.params = { id: bookId.toHexString() };
            BookService.getBookById.mockResolvedValue(book);
            yield bookController.getBookById(req, res, next);
            expect(BookService.getBookById).toHaveBeenCalledWith(bookId);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(book);
        }));
        it("should return 404 if book not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const bookId = new mongoose_1.Types.ObjectId();
            req.params = { id: bookId.toHexString() };
            BookService.getBookById.mockResolvedValue(null);
            yield bookController.getBookById(req, res, next);
            expect(BookService.getBookById).toHaveBeenCalledWith(bookId);
            expect(next).toHaveBeenCalledWith(new appError_1.default("Book not found", 404));
        }));
    });
    describe("getAllBooks", () => {
        it("should return all books", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const books = [{ title: "Test Book 1" }, { title: "Test Book 2" }];
            BookService.getAllBooks.mockResolvedValue({
                books,
                total: books.length,
            });
            yield bookController.getAllBooks(req, res, next);
            expect(BookService.getAllBooks).toHaveBeenCalledWith(req.query);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ books, total: books.length });
        }));
    });
    describe("updateBookById", () => {
        it("should update a book and return it", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const bookId = new mongoose_1.Types.ObjectId();
            const updatedBook = { _id: bookId, title: "Updated Title" };
            req.params = { id: bookId.toHexString() };
            req.body = { title: "Updated Title" };
            BookService.updateBookById.mockResolvedValue(updatedBook);
            yield bookController.updateBookById(req, res, next);
            expect(BookService.updateBookById).toHaveBeenCalledWith(bookId, req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedBook);
        }));
        it("should return 404 if book not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const bookId = new mongoose_1.Types.ObjectId();
            req.params = { id: bookId.toHexString() };
            req.body = { title: "Updated Title" };
            BookService.updateBookById.mockResolvedValue(null);
            yield bookController.updateBookById(req, res, next);
            expect(BookService.updateBookById).toHaveBeenCalledWith(bookId, req.body);
            expect(next).toHaveBeenCalledWith(new appError_1.default("Book not found", 404));
        }));
    });
    describe("deleteBookById", () => {
        it("should delete a book and return success message", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const bookId = new mongoose_1.Types.ObjectId();
            req.params = { id: bookId.toHexString() };
            BookService.deleteBookById.mockResolvedValue(undefined);
            yield bookController.deleteBookById(req, res, next);
            expect(BookService.deleteBookById).toHaveBeenCalledWith(bookId);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Book deleted successfully",
            });
        }));
    });
});
//# sourceMappingURL=bookController.test.js.map
//# debugId=77baefd1-4c6a-53ec-8c10-076e96722231
