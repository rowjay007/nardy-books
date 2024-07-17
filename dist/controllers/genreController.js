"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="6097eb92-ba87-5c1c-b48c-22d35afe36c6")}catch(e){}}();

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
exports.addBookToGenre = exports.deleteGenreById = exports.updateGenreById = exports.getAllGenres = exports.getGenreById = exports.createGenre = void 0;
const GenreService = __importStar(require("../services/genreService"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const mongoose_1 = require("mongoose");
/**
 * Converts a string to a Mongoose ObjectId.
 * @param {string} id - The ID to convert.
 * @returns {Types.ObjectId} - The converted ObjectId.
 * @throws {AppError} - Throws an error if the ID format is invalid.
 */
const convertToObjectId = (id) => {
    try {
        return new mongoose_1.Types.ObjectId(id);
    }
    catch (error) {
        throw new appError_1.default("Invalid ID format", 400);
    }
};
/**
 * Controller function to create a genre
 * @param {Request} req - Express request object with body containing genre data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the created genre data
 */
exports.createGenre = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const genre = yield GenreService.createGenre(req.body);
    res.status(201).json({
        status: "success",
        data: {
            genre,
        },
    });
}));
/**
 * Controller function to get a genre by ID
 * @param {Request} req - Express request object with params containing genre ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the genre data
 */
exports.getGenreById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const genreId = convertToObjectId(req.params.id);
    const genre = yield GenreService.getGenreById(genreId);
    if (!genre) {
        return next(new appError_1.default("No genre found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            genre,
        },
    });
}));
/**
 * Controller function to get all genres
 * @param {Request} req - Express request object with query parameters for filtering, sorting, and pagination
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the genres data
 */
exports.getAllGenres = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const sortQuery = req.query.sort;
    const genres = yield GenreService.getAllGenres(req.query.filter, Number(req.query.page), Number(req.query.limit), sortQuery);
    res.status(200).json({
        status: "success",
        data: {
            genres,
        },
    });
}));
/**
 * Controller function to update a genre by ID
 * @param {Request} req - Express request object with params containing genre ID and body containing update data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the updated genre data
 */
exports.updateGenreById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const genreId = convertToObjectId(req.params.id);
    const genre = yield GenreService.updateGenreById(genreId, req.body);
    if (!genre) {
        return next(new appError_1.default("No genre found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            genre,
        },
    });
}));
/**
 * Controller function to delete a genre by ID
 * @param {Request} req - Express request object with params containing genre ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object indicating successful deletion
 */
exports.deleteGenreById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const genreId = convertToObjectId(req.params.id);
    const genre = yield GenreService.deleteGenreById(genreId);
    if (!genre) {
        return next(new appError_1.default("No genre found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        message: "Genre successfully deleted",
        data: null,
    });
}));
/**
 * Controller function to add a book to a genre
 * @param {Request} req - Express request object with params containing genre ID and book ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the updated genre data
 */
exports.addBookToGenre = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { genreId, bookId } = req.params;
    const genre = yield GenreService.addBookToGenre(convertToObjectId(genreId), convertToObjectId(bookId));
    if (!genre) {
        return next(new appError_1.default("No genre found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            genre,
        },
    });
}));
//# sourceMappingURL=genreController.js.map
//# debugId=6097eb92-ba87-5c1c-b48c-22d35afe36c6
