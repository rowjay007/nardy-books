"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="c4b77b73-4b12-5475-b5db-2b3b2aba4f0a")}catch(e){}}();

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
exports.createAuthor = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const author = yield AuthorService.createAuthor(req.body);
    res.status(201).json({
        status: "success",
        data: {
            author,
        },
    });
}));
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
exports.deleteAuthorById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = new mongoose_1.Types.ObjectId(req.params.id);
    const author = yield AuthorService.deleteAuthorById(authorId);
    if (!author) {
        return next(new appError_1.default("No author found with that ID", 404));
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
}));
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
//# debugId=c4b77b73-4b12-5475-b5db-2b3b2aba4f0a
