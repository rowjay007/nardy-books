import { NextFunction, Request, Response } from "express";
import * as PaymentService from "../services/paymentService";
import catchAsync from "../utils/catchAsync";

/**
 * Controller function to create a payment
 * @param {Request} req - Express request object with body containing payment data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the payment data
 */
export const createPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payment = await PaymentService.createPayment(req.body);
    res.status(201).json({ status: "success", data: { payment } });
  }
);

/**
 * Controller function to get a payment by ID
 * @param {Request} req - Express request object with params containing payment ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the payment data
 */
export const getPaymentById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payment = await PaymentService.getPaymentById(req.params.id);
    res.status(200).json({ status: "success", data: { payment } });
  }
);

/**
 * Controller function to get all payments
 * @param {Request} req - Express request object with query parameters for filtering, sorting, pagination
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the payments data
 */
export const getAllPayments = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { filter, sort, page, limit } = req.query;
    const payments = await PaymentService.getAllPayments(
      JSON.parse((filter as string) || "{}"),
      JSON.parse((sort as string) || "{}"),
      parseInt(page as string, 10) || 1,
      parseInt(limit as string, 10) || 10
    );
    res.status(200).json({ status: "success", data: { payments } });
  }
);

/**
 * Controller function to update a payment by ID
 * @param {Request} req - Express request object with params containing payment ID and body containing update data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the updated payment data
 */
export const updatePayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payment = await PaymentService.updatePayment(req.params.id, req.body);
    res.status(200).json({ status: "success", data: { payment } });
  }
);

/**
 * Controller function to delete a payment by ID
 * @param {Request} req - Express request object with params containing payment ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object indicating successful deletion
 */
export const deletePayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await PaymentService.deletePayment(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Payment successfully deleted",
      data: null,
    });
  }
);

/**
 * Controller function to process a Paystack payment
 * @param {Request} req - Express request object with body containing amount and email
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the payment response and reference
 */
export const processPaystackPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { amount, email } = req.body;
    const { response, reference } = await PaymentService.processPaystackPayment(
      amount,
      email
    );
    res.status(200).json({ status: "success", data: { response, reference } });
  }
);

/**
 * Controller function to verify a Paystack payment
 * @param {Request} req - Express request object with params containing payment reference
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the payment verification response
 */
export const verifyPaystackPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { reference } = req.params;
    const response = await PaymentService.verifyPaystackPayment(reference);
    res.status(200).json({ status: "success", data: { response } });
  }
);

/**
 * Controller function to process a Flutterwave payment
 * @param {Request} req - Express request object with body containing amount and email
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the payment response and reference
 */
export const processFlutterwavePayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { amount, email } = req.body;
    const { response, reference } =
      await PaymentService.processFlutterwavePayment(amount, email);
    res.status(200).json({ status: "success", data: { response, reference } });
  }
);

/**
 * Controller function to verify a Flutterwave payment
 * @param {Request} req - Express request object with params containing payment reference
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the payment verification response
 */
export const verifyFlutterwavePayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { reference } = req.params;
    const response = await PaymentService.verifyFlutterwavePayment(reference);
    res.status(200).json({ status: "success", data: { response } });
  }
);
