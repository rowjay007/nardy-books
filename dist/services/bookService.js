"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ae44a5a3-f7bf-5820-9755-a4eb35167e59")}catch(e){}}();

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookById = exports.updateBookById = exports.getAllBooks = exports.getBookById = exports.createBook = void 0;
const BookRepository = __importStar(require("../repositories/bookRepository"));
const cache_1 = __importStar(require("../utils/cache"));
const createBook = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield BookRepository.createBook(bookData);
    cache_1.default.flushAll();
    return book;
});
exports.createBook = createBook;
const getBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = `book_${id.toString()}`;
    let book = cache_1.default.get(cacheKey);
    if (book === undefined) {
        const fetchedBook = yield BookRepository.findBookById(id);
        if (fetchedBook) {
            book = fetchedBook;
            cache_1.default.set(cacheKey, book, cache_1.CACHE_TTL_SECONDS);
        }
        else {
            book = null;
        }
    }
    return book;
});
exports.getBookById = getBookById;
const getAllBooks = (queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = `allBooks_${JSON.stringify(queryParams)}`;
    let cachedData = cache_1.default.get(cacheKey);
    if (!cachedData) {
        cachedData = yield BookRepository.findAllBooks(queryParams);
        cache_1.default.set(cacheKey, cachedData, cache_1.CACHE_TTL_SECONDS);
    }
    return cachedData;
});
exports.getAllBooks = getAllBooks;
const updateBookById = (id, bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield BookRepository.updateBookById(id, bookData);
    if (book) {
        cache_1.default.flushAll();
    }
    return book;
});
exports.updateBookById = updateBookById;
const deleteBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield BookRepository.deleteBookById(id);
    if (book) {
        cache_1.default.flushAll();
    }
    return book;
});
exports.deleteBookById = deleteBookById;
//# sourceMappingURL=bookService.js.map
//# debugId=ae44a5a3-f7bf-5820-9755-a4eb35167e59
