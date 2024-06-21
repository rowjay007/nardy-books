import { Router } from "express";
import PaymentController from "../controllers/paymentController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();
router.use(authMiddleware);

router.post("/", PaymentController.createPayment);
router.get("/", PaymentController.getAllPayments);
router.get("/:id", PaymentController.getPaymentById);
router.put("/:id", PaymentController.updatePayment);
router.delete("/:id", PaymentController.deletePayment);
router.post("/paystack", PaymentController.processPaystackPayment);
router.post("/paystack/verify", PaymentController.verifyPaystackPayment);
router.post("/flutterwave", PaymentController.processFlutterwavePayment);
router.post("/flutterwave/verify", PaymentController.verifyFlutterwavePayment);

export default router;
