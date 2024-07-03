"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ca93bec1-7418-5805-b427-fac88ec808ba")}catch(e){}}();

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
const PublisherRepository = __importStar(require("../repositories/publisherRepository"));
const publisherModel_1 = __importDefault(require("../models/publisherModel"));
const createPublisher = (publisherData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield PublisherRepository.createPublisher(publisherData);
});
exports.createPublisher = createPublisher;
const getPublisherById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield PublisherRepository.getPublisherById(id);
});
exports.getPublisherById = getPublisherById;
const getAllPublishers = (filter, page, limit, sort) => __awaiter(void 0, void 0, void 0, function* () {
    return PublisherRepository.getAllPublishers(filter, page, limit, sort);
});
exports.getAllPublishers = getAllPublishers;
const updatePublisherById = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield PublisherRepository.updatePublisherById(id, updateData);
});
exports.updatePublisherById = updatePublisherById;
const deletePublisherById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield PublisherRepository.deletePublisherById(id);
});
exports.deletePublisherById = deletePublisherById;
const addBookToPublisher = (publisherId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const publisher = yield publisherModel_1.default.findByIdAndUpdate(publisherId, { $push: { books: bookId } }, { new: true }).populate("books");
    return publisher;
});
exports.addBookToPublisher = addBookToPublisher;
//# sourceMappingURL=publisherService.js.map
//# debugId=ca93bec1-7418-5805-b427-fac88ec808ba
