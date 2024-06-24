import { Request, Response, NextFunction } from "express";
import * as PaymentService from "../services/paymentService";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

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
      JSON.parse((filter as string) || "{}"), // Parse filter as needed
      JSON.parse((sort as string) || "{}"), // Parse sort as needed
      parseInt(page as string, 10) || 1, // Parse page as integer, default to 1
      parseInt(limit as string, 10) || 10 // Parse limit as integer, default to 10
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
    await PaymentService.deletePayment(req.params.id);
    res.status(204).json({ status: "success", data: null });
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
