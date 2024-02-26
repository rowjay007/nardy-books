import express from "express";
import * as reviewController from "../controllers/review.controller";

const router = express.Router({ mergeParams: true });
router.get("/", reviewController.getReviewsByBookId);

router.post("/", reviewController.createReview);

router.put("/:reviewId", reviewController.updateReview);

router.delete("/:reviewId", reviewController.deleteReview);

export default router;
