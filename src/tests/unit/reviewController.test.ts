import { Types } from "mongoose";
import * as reviewController from "../../controllers/reviewController";
import * as ReviewService from "../../services/reviewService";
import AppError from "../../utils/appError";
import { mockRequest, mockResponse } from "../../utils/testHelpers";

jest.mock("../../services/reviewService");

describe("Review Controller", () => {
  const next = jest.fn();

  describe("getReviewById", () => {
    it("should return a review by id", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const reviewId = new Types.ObjectId();
      const review = { _id: reviewId, content: "Great book!" };

      req.params = { id: reviewId.toHexString() };
      (ReviewService.getReviewById as jest.Mock).mockResolvedValue(review);

      await reviewController.getReviewById(req as any, res as any, next);

      expect(ReviewService.getReviewById).toHaveBeenCalledWith(
        reviewId.toHexString()
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { review },
      });
    });

    it("should return 404 if review not found", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const reviewId = new Types.ObjectId();

      req.params = { id: reviewId.toHexString() };
      (ReviewService.getReviewById as jest.Mock).mockResolvedValue(null);

      await reviewController.getReviewById(req as any, res as any, next);

      expect(ReviewService.getReviewById).toHaveBeenCalledWith(
        reviewId.toHexString()
      );
      expect(next).toHaveBeenCalledWith(
        new AppError("No review found with that ID", 404)
      );
    });

    it("should handle invalid review ID", async () => {
      const req = mockRequest();
      const res = mockResponse();

      req.params = {};

      await reviewController.getReviewById(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(
        new AppError("No review ID provided", 400)
      );
    });
  });

  describe("updateReviewById", () => {
    it("should update a review and return it", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const reviewId = new Types.ObjectId();
      const updatedReview = { _id: reviewId, content: "Updated review!" };

      req.params = { id: reviewId.toHexString() };
      req.body = { content: "Updated review!" };
      (ReviewService.updateReviewById as jest.Mock).mockResolvedValue(
        updatedReview
      );

      await reviewController.updateReviewById(req as any, res as any, next);

      expect(ReviewService.updateReviewById).toHaveBeenCalledWith(
        reviewId.toHexString(),
        req.body
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { review: updatedReview },
      });
    });

    it("should return 404 if review not found", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const reviewId = new Types.ObjectId();

      req.params = { id: reviewId.toHexString() };
      req.body = { content: "Updated review!" };
      (ReviewService.updateReviewById as jest.Mock).mockResolvedValue(null);

      await reviewController.updateReviewById(req as any, res as any, next);

      expect(ReviewService.updateReviewById).toHaveBeenCalledWith(
        reviewId.toHexString(),
        req.body
      );
      expect(next).toHaveBeenCalledWith(
        new AppError("No review found with that ID", 404)
      );
    });

    it("should handle invalid review ID", async () => {
      const req = mockRequest();
      const res = mockResponse();

      req.params = {};
      req.body = { content: "Updated review!" };

      await reviewController.updateReviewById(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(
        new AppError("No review ID provided", 400)
      );
    });
  });

  describe("deleteReviewById", () => {
    it("should delete a review and return success message", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const reviewId = new Types.ObjectId();

      req.params = { id: reviewId.toHexString() };
      (ReviewService.deleteReviewById as jest.Mock).mockResolvedValue(true);

      await reviewController.deleteReviewById(req as any, res as any, next);

      expect(ReviewService.deleteReviewById).toHaveBeenCalledWith(
        reviewId.toHexString()
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: "Review successfully deleted",
        data: null,
      });
    });

    it("should return 404 if review not found", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const reviewId = new Types.ObjectId();

      req.params = { id: reviewId.toHexString() };
      (ReviewService.deleteReviewById as jest.Mock).mockResolvedValue(false);

      await reviewController.deleteReviewById(req as any, res as any, next);

      expect(ReviewService.deleteReviewById).toHaveBeenCalledWith(
        reviewId.toHexString()
      );
      expect(next).toHaveBeenCalledWith(
        new AppError("No review found with that ID", 404)
      );
    });

    it("should handle invalid review ID", async () => {
      const req = mockRequest();
      const res = mockResponse();

      req.params = {};

      await reviewController.deleteReviewById(req as any, res as any, next);

      expect(next).toHaveBeenCalledWith(
        new AppError("No review ID provided", 400)
      );
    });
  });
});
