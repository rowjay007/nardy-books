"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="62f774ba-9790-5ad8-b7d3-9e94b1c82da2")}catch(e){}}();

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
exports.getTotalCount = exports.addBookToAuthor = exports.deleteAuthorById = exports.updateAuthorById = exports.getAllAuthors = exports.getAuthorById = exports.createAuthor = void 0;
const authorModel_1 = __importDefault(require("../models/authorModel"));
const createAuthor = (authorData) => __awaiter(void 0, void 0, void 0, function* () {
    const author = new authorModel_1.default(authorData);
    yield author.save();
    return author;
});
exports.createAuthor = createAuthor;
const getAuthorById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return authorModel_1.default.findById(id).populate("books");
});
exports.getAuthorById = getAuthorById;
const getAllAuthors = (filter, page, limit, sort) => __awaiter(void 0, void 0, void 0, function* () {
    return authorModel_1.default.find(filter)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("books");
});
exports.getAllAuthors = getAllAuthors;
const updateAuthorById = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return authorModel_1.default.findByIdAndUpdate(id, updateData, { new: true }).populate("books");
});
exports.updateAuthorById = updateAuthorById;
const deleteAuthorById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return authorModel_1.default.findByIdAndDelete(id);
});
exports.deleteAuthorById = deleteAuthorById;
const addBookToAuthor = (authorId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    return authorModel_1.default.findByIdAndUpdate(authorId, { $push: { books: bookId } }, { new: true }).populate("books");
});
exports.addBookToAuthor = addBookToAuthor;
const getTotalCount = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    return authorModel_1.default.countDocuments(filter);
});
exports.getTotalCount = getTotalCount;
//# sourceMappingURL=authorRepository.js.map
//# debugId=62f774ba-9790-5ad8-b7d3-9e94b1c82da2
