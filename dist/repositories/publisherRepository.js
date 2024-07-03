"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="612984e3-65d3-55e7-80a6-3bc150ea0c2b")}catch(e){}}();

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
const createPublisher = (publisherData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield publisherModel_1.default.create(publisherData);
});
exports.createPublisher = createPublisher;
const getPublisherById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield publisherModel_1.default.findById(id).populate("books");
});
exports.getPublisherById = getPublisherById;
const getAllPublishers = (filter, page, limit, sort) => __awaiter(void 0, void 0, void 0, function* () {
    return publisherModel_1.default.find(filter)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("books");
});
exports.getAllPublishers = getAllPublishers;
const updatePublisherById = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield publisherModel_1.default.findByIdAndUpdate(id, updateData, { new: true });
});
exports.updatePublisherById = updatePublisherById;
const deletePublisherById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield publisherModel_1.default.findByIdAndDelete(id);
});
exports.deletePublisherById = deletePublisherById;
const addBookToPublisher = (publisherId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const publisher = yield publisherModel_1.default.findByIdAndUpdate(publisherId, { $push: { books: bookId } }, { new: true }).populate("books");
    return publisher;
});
exports.addBookToPublisher = addBookToPublisher;
//# sourceMappingURL=publisherRepository.js.map
//# debugId=612984e3-65d3-55e7-80a6-3bc150ea0c2b
