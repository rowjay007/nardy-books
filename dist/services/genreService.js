"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="1bf47f8d-8044-545b-abea-7383dbe5a788")}catch(e){}}();

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
exports.addBookToGenre = exports.deleteGenreById = exports.updateGenreById = exports.getAllGenres = exports.getGenreById = exports.createGenre = void 0;
const GenreRepository = __importStar(require("../repositories/genreRepository"));
const cache_1 = __importStar(require("../utils/cache"));
const createGenre = (genreData) => __awaiter(void 0, void 0, void 0, function* () {
    const genre = yield GenreRepository.createGenre(genreData);
    cache_1.default.flushAll();
    return genre;
});
exports.createGenre = createGenre;
const getGenreById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = `genre_${id}`;
    let genre = cache_1.default.get(cacheKey);
    if (!genre) {
        const genreFromDb = yield GenreRepository.getGenreById(id);
        if (genreFromDb) {
            genre = genreFromDb;
            cache_1.default.set(cacheKey, genre, cache_1.CACHE_TTL_SECONDS);
        }
    }
    return genre;
});
exports.getGenreById = getGenreById;
const getAllGenres = (filter, page, limit, sort) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = `genres_${JSON.stringify(filter)}_${page}_${limit}_${JSON.stringify(sort)}`;
    let genres = cache_1.default.get(cacheKey);
    if (!genres) {
        genres = yield GenreRepository.getAllGenres(filter, page, limit, sort);
        if (genres) {
            cache_1.default.set(cacheKey, genres, cache_1.CACHE_TTL_SECONDS);
        }
    }
    return genres;
});
exports.getAllGenres = getAllGenres;
const updateGenreById = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const genre = yield GenreRepository.updateGenreById(id, updateData);
    if (genre) {
        cache_1.default.flushAll();
    }
    return genre;
});
exports.updateGenreById = updateGenreById;
const deleteGenreById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const genre = yield GenreRepository.deleteGenreById(id);
    if (genre) {
        cache_1.default.flushAll();
    }
    return genre;
});
exports.deleteGenreById = deleteGenreById;
const addBookToGenre = (genreId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const genre = yield GenreRepository.addBookToGenre(genreId, bookId);
    if (genre) {
        cache_1.default.flushAll();
    }
    return genre;
});
exports.addBookToGenre = addBookToGenre;
//# sourceMappingURL=genreService.js.map
//# debugId=1bf47f8d-8044-545b-abea-7383dbe5a788
