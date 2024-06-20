import express from "express";
import * as ReviewController from "../controllers/reviewController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();
router.use(authMiddleware);

router.post("/", ReviewController.createReview);
router.get("/:id", ReviewController.getReviewById);
router.get("/", ReviewController.getAllReviews);
router.put("/:id", ReviewController.updateReviewById);
router.delete("/:id", ReviewController.deleteReviewById);

export default router;
