"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="2e757131-e075-5641-b266-81f7048bbaff")}catch(e){}}();

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
exports.addBookToAuthor = exports.deleteAuthorById = exports.updateAuthorById = exports.getAllAuthors = exports.getAuthorById = exports.createAuthor = void 0;
const AuthorRepository = __importStar(require("../repositories/authorRepository"));
const cache_1 = __importStar(require("../utils/cache"));
const createAuthor = (authorData) => __awaiter(void 0, void 0, void 0, function* () {
    const author = yield AuthorRepository.createAuthor(authorData);
    cache_1.default.flushAll();
    return author;
});
exports.createAuthor = createAuthor;
const getAuthorById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = `author_${id.toString()}`;
    let author = cache_1.default.get(cacheKey);
    if (author === undefined) {
        const fetchedAuthor = yield AuthorRepository.getAuthorById(id);
        if (fetchedAuthor) {
            author = fetchedAuthor;
            cache_1.default.set(cacheKey, author, cache_1.CACHE_TTL_SECONDS);
        }
        else {
            author = null;
        }
    }
    return author;
});
exports.getAuthorById = getAuthorById;
const getAllAuthors = (name_1, ...args_1) => __awaiter(void 0, [name_1, ...args_1], void 0, function* (name, page = 1, limit = 10, sortBy = "name", sortOrder = "asc") {
    const filter = {};
    if (name) {
        filter.name = { $regex: name, $options: "i" };
    }
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;
    const cacheKey = `allAuthors_${JSON.stringify({
        filter,
        page,
        limit,
        sort,
    })}`;
    let cachedData = cache_1.default.get(cacheKey);
    if (!cachedData) {
        const authors = yield AuthorRepository.getAllAuthors(filter, page, limit, sort);
        const total = yield AuthorRepository.getTotalCount(filter);
        cachedData = { authors, total };
        cache_1.default.set(cacheKey, cachedData, cache_1.CACHE_TTL_SECONDS);
    }
    return Object.assign(Object.assign({}, cachedData), { page, limit });
});
exports.getAllAuthors = getAllAuthors;
const updateAuthorById = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const author = yield AuthorRepository.updateAuthorById(id, updateData);
    if (author) {
        cache_1.default.flushAll();
    }
    return author;
});
exports.updateAuthorById = updateAuthorById;
const deleteAuthorById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const author = yield AuthorRepository.deleteAuthorById(id);
    if (author) {
        cache_1.default.flushAll();
    }
    return author;
});
exports.deleteAuthorById = deleteAuthorById;
const addBookToAuthor = (authorId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const author = yield AuthorRepository.addBookToAuthor(authorId, bookId);
    if (author) {
        cache_1.default.flushAll();
    }
    return author;
});
exports.addBookToAuthor = addBookToAuthor;
//# sourceMappingURL=authorService.js.map
//# debugId=2e757131-e075-5641-b266-81f7048bbaff
