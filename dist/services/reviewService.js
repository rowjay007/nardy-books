"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="01fc0d51-3476-5e9d-ab78-0e5b6c465c29")}catch(e){}}();

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
exports.deleteReviewById = exports.updateReviewById = exports.getAllReviews = exports.getReviewById = exports.createReview = void 0;
const ReviewRepository = __importStar(require("../repositories/reviewRepository"));
const mongoose_1 = require("mongoose");
const createReview = (reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    return ReviewRepository.createReview(reviewData);
});
exports.createReview = createReview;
const getReviewById = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = new mongoose_1.Types.ObjectId(reviewId);
    return ReviewRepository.getReviewById(id);
});
exports.getReviewById = getReviewById;
const getAllReviews = (filter, page, limit, sort) => __awaiter(void 0, void 0, void 0, function* () {
    return ReviewRepository.getAllReviews(filter, page, limit, sort);
});
exports.getAllReviews = getAllReviews;
const updateReviewById = (reviewId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const id = new mongoose_1.Types.ObjectId(reviewId);
    return ReviewRepository.updateReviewById(id, updateData);
});
exports.updateReviewById = updateReviewById;
const deleteReviewById = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = new mongoose_1.Types.ObjectId(reviewId);
    return ReviewRepository.deleteReviewById(id);
});
exports.deleteReviewById = deleteReviewById;
//# sourceMappingURL=reviewService.js.map
//# debugId=01fc0d51-3476-5e9d-ab78-0e5b6c465c29
