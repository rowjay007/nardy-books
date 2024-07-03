"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="da5708cb-e4c0-5e4c-9778-025803823be2")}catch(e){}}();

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookById = exports.updateBookById = exports.findAllBooks = exports.findBookById = exports.createBook = void 0;
const bookModel_1 = __importDefault(require("../models/bookModel"));
const createBook = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const book = new bookModel_1.default(bookData);
    return book.save();
});
exports.createBook = createBook;
const findBookById = (id) => __awaiter(void 0, void 0, void 0, function* () { return bookModel_1.default.findById(id).populate("author publisher genre reviews").exec(); });
exports.findBookById = findBookById;
const findAllBooks = (queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    const { sort, limit, page } = queryParams, filters = __rest(queryParams, ["sort", "limit", "page"]);
    const sortOptions = sort ? sort.split(",").join(" ") : "title";
    const limitValue = limit ? parseInt(limit, 10) : 10;
    const skipValue = page ? (parseInt(page, 10) - 1) * limitValue : 0;
    const booksQuery = bookModel_1.default.find(filters).populate("author publisher genre reviews");
    const books = yield booksQuery
        .sort(sortOptions)
        .skip(skipValue)
        .limit(limitValue)
        .exec();
    const total = yield bookModel_1.default.countDocuments(filters).exec();
    return { books, total };
});
exports.findAllBooks = findAllBooks;
const updateBookById = (id, bookData) => __awaiter(void 0, void 0, void 0, function* () { return bookModel_1.default.findByIdAndUpdate(id, bookData, { new: true }).exec(); });
exports.updateBookById = updateBookById;
const deleteBookById = (id) => __awaiter(void 0, void 0, void 0, function* () { return bookModel_1.default.findByIdAndDelete(id).exec(); });
exports.deleteBookById = deleteBookById;
//# sourceMappingURL=bookRepository.js.map
//# debugId=da5708cb-e4c0-5e4c-9778-025803823be2
