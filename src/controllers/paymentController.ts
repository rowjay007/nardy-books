import { Request, Response, NextFunction } from "express";
import PaymentService from "../services/paymentService";
import catchAsync from "../utils/catchAsync";

class PaymentController {
  createPayment = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const payment = await PaymentService.createPayment(req.body);
      res.status(201).json({ status: "success", data: { payment } });
    }
  );

  getPaymentById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const payment = await PaymentService.getPaymentById(req.params.id);
      res.status(200).json({ status: "success", data: { payment } });
    }
  );

  getAllPayments = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const payments = await PaymentService.getAllPayments();
      res.status(200).json({ status: "success", data: { payments } });
    }
  );

  updatePayment = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const payment = await PaymentService.updatePayment(
        req.params.id,
        req.body
      );
      res.status(200).json({ status: "success", data: { payment } });
    }
  );

  deletePayment = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await PaymentService.deletePayment(req.params.id);
      res.status(204).json({ status: "success", data: null });
    }
  );

  processPaystackPayment = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { amount, email } = req.body;
      const response = await PaymentService.processPaystackPayment(
        amount,
        email
      );
      res.status(200).json({ status: "success", data: { response } });
    }
  );

  verifyPaystackPayment = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { reference } = req.body;
      const response = await PaymentService.verifyPaystackPayment(reference);
      res.status(200).json({ status: "success", data: { response } });
    }
  );

  processFlutterwavePayment = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { amount, email } = req.body;
      const response = await PaymentService.processFlutterwavePayment(
        amount,
        email
      );
      res.status(200).json({ status: "success", data: { response } });
    }
  );

  verifyFlutterwavePayment = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { reference } = req.body;
      const response = await PaymentService.verifyFlutterwavePayment(reference);
      res.status(200).json({ status: "success", data: { response } });
    }
  );
}

export default new PaymentController();
