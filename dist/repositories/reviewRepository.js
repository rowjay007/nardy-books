"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="924e37ff-cebd-53c6-a949-3822b56e8b10")}catch(e){}}();

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
const reviewModel_1 = __importDefault(require("../models/reviewModel"));
const createReview = (reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    const review = new reviewModel_1.default(reviewData);
    yield review.save();
    return review;
});
exports.createReview = createReview;
const getReviewById = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    return reviewModel_1.default.findById(reviewId).populate("reviewer book");
});
exports.getReviewById = getReviewById;
const getAllReviews = (filter, page, limit, sort) => __awaiter(void 0, void 0, void 0, function* () {
    return reviewModel_1.default.find(filter)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("reviewer book");
});
exports.getAllReviews = getAllReviews;
const updateReviewById = (reviewId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return reviewModel_1.default.findByIdAndUpdate(reviewId, updateData, { new: true }).populate("reviewer book");
});
exports.updateReviewById = updateReviewById;
const deleteReviewById = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    return reviewModel_1.default.findByIdAndDelete(reviewId);
});
exports.deleteReviewById = deleteReviewById;
//# sourceMappingURL=reviewRepository.js.map
//# debugId=924e37ff-cebd-53c6-a949-3822b56e8b10
