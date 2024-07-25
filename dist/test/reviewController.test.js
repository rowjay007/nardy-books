"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="c1ee95fe-8618-51ce-9491-c59316919b61")}catch(e){}}();

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
const mongoose_1 = require("mongoose");
const reviewController = __importStar(require("../controllers/reviewController"));
const ReviewService = __importStar(require("../services/reviewService"));
const appError_1 = __importDefault(require("../utils/appError"));
const testHelpers_1 = require("../utils/testHelpers");
jest.mock("../services/reviewService");
describe("Review Controller", () => {
    const next = jest.fn();
    describe("getReviewById", () => {
        it("should return a review by id", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const reviewId = new mongoose_1.Types.ObjectId();
            const review = { _id: reviewId, content: "Great book!" };
            req.params = { id: reviewId.toHexString() };
            ReviewService.getReviewById.mockResolvedValue(review);
            yield reviewController.getReviewById(req, res, next);
            expect(ReviewService.getReviewById).toHaveBeenCalledWith(reviewId.toHexString());
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: { review },
            });
        }));
        it("should return 404 if review not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const reviewId = new mongoose_1.Types.ObjectId();
            req.params = { id: reviewId.toHexString() };
            ReviewService.getReviewById.mockResolvedValue(null);
            yield reviewController.getReviewById(req, res, next);
            expect(ReviewService.getReviewById).toHaveBeenCalledWith(reviewId.toHexString());
            expect(next).toHaveBeenCalledWith(new appError_1.default("No review found with that ID", 404));
        }));
        it("should handle invalid review ID", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            req.params = {};
            yield reviewController.getReviewById(req, res, next);
            expect(next).toHaveBeenCalledWith(new appError_1.default("No review ID provided", 400));
        }));
    });
    describe("updateReviewById", () => {
        it("should update a review and return it", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const reviewId = new mongoose_1.Types.ObjectId();
            const updatedReview = { _id: reviewId, content: "Updated review!" };
            req.params = { id: reviewId.toHexString() };
            req.body = { content: "Updated review!" };
            ReviewService.updateReviewById.mockResolvedValue(updatedReview);
            yield reviewController.updateReviewById(req, res, next);
            expect(ReviewService.updateReviewById).toHaveBeenCalledWith(reviewId.toHexString(), req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: { review: updatedReview },
            });
        }));
        it("should return 404 if review not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const reviewId = new mongoose_1.Types.ObjectId();
            req.params = { id: reviewId.toHexString() };
            req.body = { content: "Updated review!" };
            ReviewService.updateReviewById.mockResolvedValue(null);
            yield reviewController.updateReviewById(req, res, next);
            expect(ReviewService.updateReviewById).toHaveBeenCalledWith(reviewId.toHexString(), req.body);
            expect(next).toHaveBeenCalledWith(new appError_1.default("No review found with that ID", 404));
        }));
        it("should handle invalid review ID", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            req.params = {};
            req.body = { content: "Updated review!" };
            yield reviewController.updateReviewById(req, res, next);
            expect(next).toHaveBeenCalledWith(new appError_1.default("No review ID provided", 400));
        }));
    });
    describe("deleteReviewById", () => {
        it("should delete a review and return success message", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const reviewId = new mongoose_1.Types.ObjectId();
            req.params = { id: reviewId.toHexString() };
            ReviewService.deleteReviewById.mockResolvedValue(true);
            yield reviewController.deleteReviewById(req, res, next);
            expect(ReviewService.deleteReviewById).toHaveBeenCalledWith(reviewId.toHexString());
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                message: "Review successfully deleted",
                data: null,
            });
        }));
        it("should return 404 if review not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const reviewId = new mongoose_1.Types.ObjectId();
            req.params = { id: reviewId.toHexString() };
            ReviewService.deleteReviewById.mockResolvedValue(false);
            yield reviewController.deleteReviewById(req, res, next);
            expect(ReviewService.deleteReviewById).toHaveBeenCalledWith(reviewId.toHexString());
            expect(next).toHaveBeenCalledWith(new appError_1.default("No review found with that ID", 404));
        }));
        it("should handle invalid review ID", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            req.params = {};
            yield reviewController.deleteReviewById(req, res, next);
            expect(next).toHaveBeenCalledWith(new appError_1.default("No review ID provided", 400));
        }));
    });
});
//# sourceMappingURL=reviewController.test.js.map
//# debugId=c1ee95fe-8618-51ce-9491-c59316919b61
