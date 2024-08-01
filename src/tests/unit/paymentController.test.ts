import { Request, Response } from "express";
import httpStatus from "http-status";
import * as paymentController from "../../controllers/paymentController";
import * as PaymentService from "../../services/paymentService";
import AppError from "../../utils/appError";

jest.mock("../services/paymentService");

const mockRequest = (body = {}, params = {}, query = {}) => {
  return { body, params, query } as Request;
};

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res as Response;
};

const mockNext = () => jest.fn();

describe("Payment Controller", () => {
  describe("createPayment", () => {
    it("should create a payment and return it", async () => {
      const req = mockRequest({ amount: 100, email: "test@example.com" });
      const res = mockResponse();
      const next = mockNext();

      const paymentData = { id: "1", amount: 100, email: "test@example.com" };
      (PaymentService.createPayment as jest.Mock).mockResolvedValue(
        paymentData
      );

      await paymentController.createPayment(req, res, next);

      expect(PaymentService.createPayment).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(httpStatus.CREATED);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { payment: paymentData },
      });
    });
  });

  describe("getPaymentById", () => {
    it("should return a payment by ID", async () => {
      const req = mockRequest({}, { id: "1" });
      const res = mockResponse();
      const next = mockNext();

      const paymentData = { id: "1", amount: 100, email: "test@example.com" };
      (PaymentService.getPaymentById as jest.Mock).mockResolvedValue(
        paymentData
      );

      await paymentController.getPaymentById(req, res, next);

      expect(PaymentService.getPaymentById).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { payment: paymentData },
      });
    });

    it("should return 404 if payment not found", async () => {
      const req = mockRequest({}, { id: "1" });
      const res = mockResponse();
      const next = mockNext();

      (PaymentService.getPaymentById as jest.Mock).mockResolvedValue(null);

      await paymentController.getPaymentById(req, res, next);

      expect(next).toHaveBeenCalledWith(
        new AppError("Payment not found", httpStatus.NOT_FOUND)
      );
    });
  });

  describe("getAllPayments", () => {
    it("should return all payments with filters", async () => {
      const req = mockRequest(
        {},
        {},
        { filter: "{}", sort: "{}", page: "1", limit: "10" }
      );
      const res = mockResponse();
      const next = mockNext();

      const paymentsData = [
        { id: "1", amount: 100, email: "test@example.com" },
      ];
      (PaymentService.getAllPayments as jest.Mock).mockResolvedValue(
        paymentsData
      );

      await paymentController.getAllPayments(req, res, next);

      expect(PaymentService.getAllPayments).toHaveBeenCalledWith({}, {}, 1, 10);
      expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { payments: paymentsData },
      });
    });
  });

  describe("updatePayment", () => {
    it("should update a payment and return it", async () => {
      const req = mockRequest({ amount: 200 }, { id: "1" });
      const res = mockResponse();
      const next = mockNext();

      const updatedPayment = {
        id: "1",
        amount: 200,
        email: "test@example.com",
      };
      (PaymentService.updatePayment as jest.Mock).mockResolvedValue(
        updatedPayment
      );

      await paymentController.updatePayment(req, res, next);

      expect(PaymentService.updatePayment).toHaveBeenCalledWith(
        req.params.id,
        req.body
      );
      expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { payment: updatedPayment },
      });
    });

    it("should return 404 if payment not found", async () => {
      const req = mockRequest({ amount: 200 }, { id: "1" });
      const res = mockResponse();
      const next = mockNext();

      (PaymentService.updatePayment as jest.Mock).mockResolvedValue(null);

      await paymentController.updatePayment(req, res, next);

      expect(next).toHaveBeenCalledWith(
        new AppError("Payment not found", httpStatus.NOT_FOUND)
      );
    });
  });

  describe("deletePayment", () => {
    it("should delete a payment and return success message", async () => {
      const req = mockRequest({}, { id: "1" });
      const res = mockResponse();
      const next = mockNext();

      await paymentController.deletePayment(req, res, next);

      expect(PaymentService.deletePayment).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        message: "Payment successfully deleted",
        data: null,
      });
    });
  });

  describe("processPaystackPayment", () => {
    it("should process a Paystack payment and return response and reference", async () => {
      const req = mockRequest({ amount: 100, email: "test@example.com" });
      const res = mockResponse();
      const next = mockNext();

      const paystackResponse = { status: "success" };
      const reference = "PSK_12345";
      (PaymentService.processPaystackPayment as jest.Mock).mockResolvedValue({
        response: paystackResponse,
        reference,
      });

      await paymentController.processPaystackPayment(req, res, next);

      expect(PaymentService.processPaystackPayment).toHaveBeenCalledWith(
        req.body.amount,
        req.body.email
      );
      expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { response: paystackResponse, reference },
      });
    });
  });

  describe("verifyPaystackPayment", () => {
    it("should verify a Paystack payment and return response", async () => {
      const req = mockRequest({}, { reference: "PSK_12345" });
      const res = mockResponse();
      const next = mockNext();

      const paystackVerification = { status: "success" };
      (PaymentService.verifyPaystackPayment as jest.Mock).mockResolvedValue(
        paystackVerification
      );

      await paymentController.verifyPaystackPayment(req, res, next);

      expect(PaymentService.verifyPaystackPayment).toHaveBeenCalledWith(
        req.params.reference
      );
      expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { response: paystackVerification },
      });
    });
  });

  describe("processFlutterwavePayment", () => {
    it("should process a Flutterwave payment and return response and reference", async () => {
      const req = mockRequest({ amount: 100, email: "test@example.com" });
      const res = mockResponse();
      const next = mockNext();

      const flutterwaveResponse = { status: "success" };
      const reference = "FLW_12345";
      (PaymentService.processFlutterwavePayment as jest.Mock).mockResolvedValue(
        {
          response: flutterwaveResponse,
          reference,
        }
      );

      await paymentController.processFlutterwavePayment(req, res, next);

      expect(PaymentService.processFlutterwavePayment).toHaveBeenCalledWith(
        req.body.amount,
        req.body.email
      );
      expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { response: flutterwaveResponse, reference },
      });
    });
  });

  describe("verifyFlutterwavePayment", () => {
    it("should verify a Flutterwave payment and return response", async () => {
      const req = mockRequest({}, { reference: "FLW_12345" });
      const res = mockResponse();
      const next = mockNext();

      const flutterwaveVerification = { status: "success" };
      (PaymentService.verifyFlutterwavePayment as jest.Mock).mockResolvedValue(
        flutterwaveVerification
      );

      await paymentController.verifyFlutterwavePayment(req, res, next);

      expect(PaymentService.verifyFlutterwavePayment).toHaveBeenCalledWith(
        req.params.reference
      );
      expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: { response: flutterwaveVerification },
      });
    });
  });
});
