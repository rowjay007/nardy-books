"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="568d9f95-6d97-5313-8991-a8189f353a67")}catch(e){}}();

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
const genreModel_1 = __importDefault(require("../models/genreModel"));
const createGenre = (genreData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield genreModel_1.default.create(genreData);
});
exports.createGenre = createGenre;
const getGenreById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield genreModel_1.default.findById(id).populate("books");
});
exports.getGenreById = getGenreById;
const getAllGenres = (filter, page, limit, sort) => __awaiter(void 0, void 0, void 0, function* () {
    let sortOption = {};
    if (typeof sort === "string") {
        sortOption = { [sort]: 1 };
    }
    else if (Array.isArray(sort)) {
        sortOption = Object.fromEntries(sort.map((s) => [s, 1]));
    }
    else if (typeof sort === "object" && sort !== null) {
        sortOption = sort;
    }
    return yield genreModel_1.default.find(filter)
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("books");
});
exports.getAllGenres = getAllGenres;
const updateGenreById = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield genreModel_1.default.findByIdAndUpdate(id, updateData, { new: true }).populate("books");
});
exports.updateGenreById = updateGenreById;
const deleteGenreById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield genreModel_1.default.findByIdAndDelete(id);
});
exports.deleteGenreById = deleteGenreById;
const addBookToGenre = (genreId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const genre = yield genreModel_1.default.findByIdAndUpdate(genreId, {
        $push: { books: bookId },
    }, { new: true, useFindAndModify: false }).populate("books");
    return genre;
});
exports.addBookToGenre = addBookToGenre;
//# sourceMappingURL=genreRepository.js.map
//# debugId=568d9f95-6d97-5313-8991-a8189f353a67
