import { Router } from "express";
import * as subscriptionController from "../controllers/subscriptionController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();
router.use(authMiddleware);

router.post("/", subscriptionController.createSubscription);
router.get("/", subscriptionController.getSubscriptions);
router.get("/:id", subscriptionController.getSubscriptionById);
router.put("/:id", subscriptionController.updateSubscription);
router.delete("/:id", subscriptionController.deleteSubscription);

export default router;
