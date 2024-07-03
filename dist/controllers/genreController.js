"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="35ff0cc5-53a5-58be-86fb-a9411df585c0")}catch(e){}}();

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
const convertToObjectId = (id) => {
    try {
        return new mongoose_1.Types.ObjectId(id);
    }
    catch (error) {
        throw new appError_1.default("Invalid ID format", 400);
    }
};
exports.createGenre = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const genre = yield GenreService.createGenre(req.body);
    res.status(201).json({
        status: "success",
        data: {
            genre,
        },
    });
}));
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
exports.deleteGenreById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const genreId = convertToObjectId(req.params.id);
    const genre = yield GenreService.deleteGenreById(genreId);
    if (!genre) {
        return next(new appError_1.default("No genre found with that ID", 404));
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
}));
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
//# debugId=35ff0cc5-53a5-58be-86fb-a9411df585c0
