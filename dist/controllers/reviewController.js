"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="c57675c4-2d8b-59d8-a3d3-2a3c8175c2af")}catch(e){}}();

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
exports.deleteReviewById = exports.updateReviewById = exports.getAllReviews = exports.getReviewById = exports.createReview = void 0;
const ReviewService = __importStar(require("../services/reviewService"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
/**
 * Controller function to create a review
 * @param req Express request object with body containing review data
 * @param res Express response object
 * @param next Express next function
 * @returns Returns a JSON object with the review data
 * @returns {status: "success", data: {review}}
 */
exports.createReview = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield ReviewService.createReview(req.body);
    res.status(201).json({
        status: "success",
        data: {
            review,
        },
    });
}));
/**
 * Controller function by ID to get a review
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 * @returns Returns a JSON object with the review data
 */
exports.getReviewById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const reviewId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    if (!reviewId) {
        return next(new appError_1.default("No review ID provided", 400));
    }
    const review = yield ReviewService.getReviewById(reviewId);
    if (!review) {
        return next(new appError_1.default("No review found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            review,
        },
    });
}));
/**
 * Controller function to get all reviews
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 * @returns Returns a JSON object with the review data
 */
exports.getAllReviews = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const sortQuery = ((_a = req.query.sort) === null || _a === void 0 ? void 0 : _a.split(",")) || [];
    const filter = req.query.filter
        ? JSON.parse(req.query.filter)
        : {};
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const sortObject = {};
    if (sortQuery.length === 2) {
        const [sortField, sortDirection] = sortQuery;
        sortObject[sortField] = sortDirection.toLowerCase();
    }
    else if (sortQuery.length > 0) {
        return next(new appError_1.default("Invalid sort query parameters", 400));
    }
    const reviews = yield ReviewService.getAllReviews(filter, page, limit, sortObject);
    res.status(200).json({
        status: "success",
        data: {
            reviews,
        },
    });
}));
/**
 * Controller function to update a review by ID
 * @param req Express request object with body containing review data
 * @param res Express response object
 * @param next Express next function
 * @returns Returns a JSON object with the review data
 */
exports.updateReviewById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const reviewId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    if (!reviewId) {
        return next(new appError_1.default("No review ID provided", 400));
    }
    const review = yield ReviewService.updateReviewById(reviewId, req.body);
    if (!review) {
        return next(new appError_1.default("No review found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            review,
        },
    });
}));
/**
 * Controller function to delete a review by ID
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 * @returns Returns a JSON object with the review data
 */
exports.deleteReviewById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const reviewId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    if (!reviewId) {
        return next(new appError_1.default("No review ID provided", 400));
    }
    const isDeleted = yield ReviewService.deleteReviewById(reviewId);
    if (!isDeleted) {
        return next(new appError_1.default("No review found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        message: "Review successfully deleted",
        data: null,
    });
}));
//# sourceMappingURL=reviewController.js.map
//# debugId=c57675c4-2d8b-59d8-a3d3-2a3c8175c2af
