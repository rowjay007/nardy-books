"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f5fbbadf-f6de-5b47-8431-8371f8c1355f")}catch(e){}}();

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
exports.deleteBookById = exports.updateBookById = exports.getAllBooks = exports.getBookById = exports.createBook = void 0;
const mongoose_1 = require("mongoose");
const BookService = __importStar(require("../services/bookService"));
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
/**
 * Controller function to create a book
 * @param {Request} req - Express request object with body containing book data
 * @param {Response} res - Express response object
 * @returns {Promise<void>} - Returns a JSON object with the created book data
 */
exports.createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield BookService.createBook(req.body);
    res.status(201).json(book);
}));
/**
 * Controller function to get a book by ID
 * @param {Request} req - Express request object with params containing book ID
 * @param {Response} res - Express response object
 * @returns {Promise<void>} - Returns a JSON object with the book data
 */
const getBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = new mongoose_1.Types.ObjectId(req.params.id);
    const book = yield BookService.getBookById(bookId);
    if (!book) {
        return next(new appError_1.default("Book not found", 404));
    }
    res.status(200).json(book);
});
exports.getBookById = getBookById;
/**
 * Controller function to get all books
 * @param {Request} req - Express request object with query parameters for filtering, sorting, and pagination
 * @param {Response} res - Express response object
 * @returns {Promise<void>} - Returns a JSON object with the books data
 */
exports.getAllBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { books, total } = yield BookService.getAllBooks(req.query);
    res.status(200).json({ total, books });
}));
/**
 * Controller function to update a book by ID
 * @param {Request} req - Express request object with params containing book ID and body containing update data
 * @param {Response} res - Express response object
 * @returns {Promise<void>} - Returns a JSON object with the updated book data
 */
exports.updateBookById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const book = yield BookService.updateBookById(new mongoose_1.Types.ObjectId(id), req.body);
    if (!book) {
        throw new appError_1.default("Book not found", 404);
    }
    res.status(200).json(book);
}));
/**
 * Controller function to delete a book by ID
 * @param {Request} req - Express request object with params containing book ID
 * @param {Response} res - Express response object
 * @returns {Promise<void>} - Returns a JSON object indicating successful deletion
 */
exports.deleteBookById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield BookService.deleteBookById(new mongoose_1.Types.ObjectId(id));
    res.status(200).json({ message: "Book deleted successfully" });
}));
//# sourceMappingURL=bookController.js.map
//# debugId=f5fbbadf-f6de-5b47-8431-8371f8c1355f
