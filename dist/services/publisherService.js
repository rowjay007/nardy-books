"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="801629a9-94c1-5978-945a-c5f4c1c813fd")}catch(e){}}();

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
exports.addBookToPublisher = exports.deletePublisherById = exports.updatePublisherById = exports.getAllPublishers = exports.getPublisherById = exports.createPublisher = void 0;
const publisherModel_1 = __importDefault(require("../models/publisherModel"));
const PublisherRepository = __importStar(require("../repositories/publisherRepository"));
const cache_1 = __importStar(require("../utils/cache"));
const createPublisher = (publisherData) => __awaiter(void 0, void 0, void 0, function* () {
    const publisher = yield PublisherRepository.createPublisher(publisherData);
    cache_1.default.flushAll();
    return publisher;
});
exports.createPublisher = createPublisher;
const getPublisherById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = `publisher_${id.toString()}`;
    let publisher = cache_1.default.get(cacheKey);
    if (publisher === undefined) {
        publisher = yield PublisherRepository.getPublisherById(id);
        if (publisher) {
            cache_1.default.set(cacheKey, publisher, cache_1.CACHE_TTL_SECONDS);
        }
    }
    return publisher;
});
exports.getPublisherById = getPublisherById;
const getAllPublishers = (filter, page, limit, sort) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = `allPublishers_${JSON.stringify({
        filter,
        page,
        limit,
        sort,
    })}`;
    let publishers = cache_1.default.get(cacheKey);
    if (!publishers) {
        publishers = yield PublisherRepository.getAllPublishers(filter, page, limit, sort);
        cache_1.default.set(cacheKey, publishers, cache_1.CACHE_TTL_SECONDS);
    }
    return publishers;
});
exports.getAllPublishers = getAllPublishers;
const updatePublisherById = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const publisher = yield PublisherRepository.updatePublisherById(id, updateData);
    if (publisher) {
        cache_1.default.flushAll();
    }
    return publisher;
});
exports.updatePublisherById = updatePublisherById;
const deletePublisherById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedPublisher = yield PublisherRepository.deletePublisherById(id);
    cache_1.default.flushAll();
    return deletedPublisher;
});
exports.deletePublisherById = deletePublisherById;
const addBookToPublisher = (publisherId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const publisher = yield publisherModel_1.default.findByIdAndUpdate(publisherId, { $push: { books: bookId } }, { new: true }).populate("books");
    if (publisher) {
        cache_1.default.flushAll();
    }
    return publisher;
});
exports.addBookToPublisher = addBookToPublisher;
//# sourceMappingURL=publisherService.js.map
//# debugId=801629a9-94c1-5978-945a-c5f4c1c813fd
