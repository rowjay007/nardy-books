"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="11be0847-a266-52ee-86a0-bebaa70cf2a8")}catch(e){}}();

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
exports.addBookToAuthor = exports.deleteAuthorById = exports.updateAuthorById = exports.getAllAuthors = exports.getAuthorById = exports.createAuthor = void 0;
const mongoose_1 = require("mongoose");
const AuthorService = __importStar(require("../services/authorService"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
/**
 * Controller function to create an author
 * @param {Request} req - Express request object with body containing author data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the created author data
 */
exports.createAuthor = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const author = yield AuthorService.createAuthor(req.body);
    res.status(201).json({
        status: "success",
        data: {
            author,
        },
    });
}));
/**
 * Controller function to get an author by ID
 * @param {Request} req - Express request object with params containing author ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the author data
 */
exports.getAuthorById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = new mongoose_1.Types.ObjectId(req.params.id);
    const author = yield AuthorService.getAuthorById(authorId);
    if (!author) {
        return next(new appError_1.default("No author found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            author,
        },
    });
}));
/**
 * Controller function to get all authors
 * @param {Request} req - Express request object with query parameters for filtering, sorting, and pagination
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the authors data
 */
exports.getAllAuthors = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, page = 1, limit = 10, sortBy = "name", sortOrder = "asc", } = req.query;
    const authorsData = yield AuthorService.getAllAuthors(name, parseInt(page, 10), parseInt(limit, 10), sortBy, sortOrder);
    res.status(200).json({
        status: "success",
        data: {
            authors: authorsData.authors,
            total: authorsData.total,
            page: authorsData.page,
            limit: authorsData.limit,
        },
    });
}));
/**
 * Controller function to update an author by ID
 * @param {Request} req - Express request object with params containing author ID and body containing update data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the updated author data
 */
exports.updateAuthorById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = new mongoose_1.Types.ObjectId(req.params.id);
    const author = yield AuthorService.updateAuthorById(authorId, req.body);
    if (!author) {
        return next(new appError_1.default("No author found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            author,
        },
    });
}));
/**
 * Controller function to delete an author by ID
 * @param {Request} req - Express request object with params containing author ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object indicating successful deletion
 */
exports.deleteAuthorById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = new mongoose_1.Types.ObjectId(req.params.id);
    const author = yield AuthorService.deleteAuthorById(authorId);
    if (!author) {
        return next(new appError_1.default("No author found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        message: "Author deleted successfully",
        data: null,
    });
}));
/**
 * Controller function to add a book to an author
 * @param {Request} req - Express request object with params containing author ID and book ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the updated author data
 */
exports.addBookToAuthor = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = new mongoose_1.Types.ObjectId(req.params.authorId);
    const bookId = new mongoose_1.Types.ObjectId(req.params.bookId);
    const author = yield AuthorService.addBookToAuthor(authorId, bookId);
    if (!author) {
        return next(new appError_1.default("No author found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            author,
        },
    });
}));
//# sourceMappingURL=authorController.js.map
//# debugId=11be0847-a266-52ee-86a0-bebaa70cf2a8
