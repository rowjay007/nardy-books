"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ad5fdaed-0245-5f6d-b7ea-a975633e1d9d")}catch(e){}}();

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
const PublisherService = __importStar(require("../services/publisherService"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const mongoose_1 = require("mongoose");
const convertToObjectId = (id) => {
    try {
        return new mongoose_1.Types.ObjectId(id);
    }
    catch (error) {
        throw new appError_1.default("Invalid ID format", 400);
    }
};
exports.createPublisher = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const publisher = yield PublisherService.createPublisher(req.body);
    res.status(201).json({
        status: "success",
        data: {
            publisher,
        },
    });
}));
exports.getPublisherById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const publisherId = convertToObjectId(req.params.id);
    const publisher = yield PublisherService.getPublisherById(publisherId);
    if (!publisher) {
        return next(new appError_1.default("No publisher found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            publisher,
        },
    });
}));
exports.getAllPublishers = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const publishers = yield PublisherService.getAllPublishers({}, page, limit, {});
        res.status(200).json({
            status: "success",
            data: {
                publishers,
            },
        });
    }
    catch (error) {
        next(new appError_1.default("Unable to fetch publishers", 500));
    }
}));
exports.updatePublisherById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const publisherId = convertToObjectId(req.params.id);
    const publisher = yield PublisherService.updatePublisherById(publisherId, req.body);
    if (!publisher) {
        return next(new appError_1.default("No publisher found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            publisher,
        },
    });
}));
exports.deletePublisherById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const publisherId = convertToObjectId(req.params.id);
    const publisher = yield PublisherService.deletePublisherById(publisherId);
    if (!publisher) {
        return next(new appError_1.default("No publisher found with that ID", 404));
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
}));
exports.addBookToPublisher = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const publisherId = convertToObjectId(req.params.publisherId);
    const bookId = convertToObjectId(req.params.bookId);
    const publisher = yield PublisherService.addBookToPublisher(publisherId, bookId);
    if (!publisher) {
        return next(new appError_1.default("No publisher found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            publisher,
        },
    });
}));
//# sourceMappingURL=publisherController.js.map
//# debugId=ad5fdaed-0245-5f6d-b7ea-a975633e1d9d
