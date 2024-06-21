import { Request, Response, NextFunction } from "express";
import * as PaymentService from "../services/paymentService";
import catchAsync from "../utils/catchAsync";

export const createPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payment = await PaymentService.createPayment(req.body);
    res.status(201).json({ status: "success", data: { payment } });
  }
);

export const getPaymentById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payment = await PaymentService.getPaymentById(req.params.id);
    res.status(200).json({ status: "success", data: { payment } });
  }
);

export const getAllPayments = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { filter, sort, page, limit } = req.query;
    const payments = await PaymentService.getAllPayments(
      JSON.parse(filter as string),
      JSON.parse(sort as string),
      parseInt(page as string, 10),
      parseInt(limit as string, 10)
    );
    res.status(200).json({ status: "success", data: { payments } });
  }
);

export const updatePayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payment = await PaymentService.updatePayment(req.params.id, req.body);
    res.status(200).json({ status: "success", data: { payment } });
  }
);

export const deletePayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const response = await PaymentService.deletePayment(req.params.id);
    res.status(204).json({ status: "success", data: response });
  }
);

export const processPaystackPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { amount, email } = req.body;
    const response = await PaymentService.processPaystackPayment(amount, email);
    res.status(200).json({ status: "success", data: { response } });
  }
);

export const verifyPaystackPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { reference } = req.body;
    const response = await PaymentService.verifyPaystackPayment(reference);
    res.status(200).json({ status: "success", data: { response } });
  }
);

export const processFlutterwavePayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { amount, email } = req.body;
    const response = await PaymentService.processFlutterwavePayment(
      amount,
      email
    );
    res.status(200).json({ status: "success", data: { response } });
  }
);

export const verifyFlutterwavePayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { reference } = req.body;
    const response = await PaymentService.verifyFlutterwavePayment(reference);
    res.status(200).json({ status: "success", data: { response } });
  }
);
