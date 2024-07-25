"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="390690ea-edb2-59ef-ad24-50e8337f4cd5")}catch(e){}}();

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PaymentService = __importStar(require("../services/paymentService"));
const paymentController = __importStar(require("../controllers/paymentController"));
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../utils/appError"));
jest.mock("../services/paymentService");
const mockRequest = (body = {}, params = {}, query = {}) => {
    return { body, params, query };
};
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn().mockReturnThis();
    return res;
};
const mockNext = () => jest.fn();
describe("Payment Controller", () => {
    describe("createPayment", () => {
        it("should create a payment and return it", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = mockRequest({ amount: 100, email: "test@example.com" });
            const res = mockResponse();
            const next = mockNext();
            const paymentData = { id: "1", amount: 100, email: "test@example.com" };
            PaymentService.createPayment.mockResolvedValue(paymentData);
            yield paymentController.createPayment(req, res, next);
            expect(PaymentService.createPayment).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(http_status_1.default.CREATED);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: { payment: paymentData },
            });
        }));
    });
    describe("getPaymentById", () => {
        it("should return a payment by ID", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = mockRequest({}, { id: "1" });
            const res = mockResponse();
            const next = mockNext();
            const paymentData = { id: "1", amount: 100, email: "test@example.com" };
            PaymentService.getPaymentById.mockResolvedValue(paymentData);
            yield paymentController.getPaymentById(req, res, next);
            expect(PaymentService.getPaymentById).toHaveBeenCalledWith(req.params.id);
            expect(res.status).toHaveBeenCalledWith(http_status_1.default.OK);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: { payment: paymentData },
            });
        }));
        it("should return 404 if payment not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = mockRequest({}, { id: "1" });
            const res = mockResponse();
            const next = mockNext();
            PaymentService.getPaymentById.mockResolvedValue(null);
            yield paymentController.getPaymentById(req, res, next);
            expect(next).toHaveBeenCalledWith(new appError_1.default("Payment not found", http_status_1.default.NOT_FOUND));
        }));
    });
    describe("getAllPayments", () => {
        it("should return all payments with filters", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = mockRequest({}, {}, { filter: "{}", sort: "{}", page: "1", limit: "10" });
            const res = mockResponse();
            const next = mockNext();
            const paymentsData = [
                { id: "1", amount: 100, email: "test@example.com" },
            ];
            PaymentService.getAllPayments.mockResolvedValue(paymentsData);
            yield paymentController.getAllPayments(req, res, next);
            expect(PaymentService.getAllPayments).toHaveBeenCalledWith({}, {}, 1, 10);
            expect(res.status).toHaveBeenCalledWith(http_status_1.default.OK);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: { payments: paymentsData },
            });
        }));
    });
    describe("updatePayment", () => {
        it("should update a payment and return it", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = mockRequest({ amount: 200 }, { id: "1" });
            const res = mockResponse();
            const next = mockNext();
            const updatedPayment = {
                id: "1",
                amount: 200,
                email: "test@example.com",
            };
            PaymentService.updatePayment.mockResolvedValue(updatedPayment);
            yield paymentController.updatePayment(req, res, next);
            expect(PaymentService.updatePayment).toHaveBeenCalledWith(req.params.id, req.body);
            expect(res.status).toHaveBeenCalledWith(http_status_1.default.OK);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: { payment: updatedPayment },
            });
        }));
        it("should return 404 if payment not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = mockRequest({ amount: 200 }, { id: "1" });
            const res = mockResponse();
            const next = mockNext();
            PaymentService.updatePayment.mockResolvedValue(null);
            yield paymentController.updatePayment(req, res, next);
            expect(next).toHaveBeenCalledWith(new appError_1.default("Payment not found", http_status_1.default.NOT_FOUND));
        }));
    });
    describe("deletePayment", () => {
        it("should delete a payment and return success message", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = mockRequest({}, { id: "1" });
            const res = mockResponse();
            const next = mockNext();
            yield paymentController.deletePayment(req, res, next);
            expect(PaymentService.deletePayment).toHaveBeenCalledWith(req.params.id);
            expect(res.status).toHaveBeenCalledWith(http_status_1.default.OK);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                message: "Payment successfully deleted",
                data: null,
            });
        }));
    });
    describe("processPaystackPayment", () => {
        it("should process a Paystack payment and return response and reference", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = mockRequest({ amount: 100, email: "test@example.com" });
            const res = mockResponse();
            const next = mockNext();
            const paystackResponse = { status: "success" };
            const reference = "PSK_12345";
            PaymentService.processPaystackPayment.mockResolvedValue({
                response: paystackResponse,
                reference,
            });
            yield paymentController.processPaystackPayment(req, res, next);
            expect(PaymentService.processPaystackPayment).toHaveBeenCalledWith(req.body.amount, req.body.email);
            expect(res.status).toHaveBeenCalledWith(http_status_1.default.OK);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: { response: paystackResponse, reference },
            });
        }));
    });
    describe("verifyPaystackPayment", () => {
        it("should verify a Paystack payment and return response", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = mockRequest({}, { reference: "PSK_12345" });
            const res = mockResponse();
            const next = mockNext();
            const paystackVerification = { status: "success" };
            PaymentService.verifyPaystackPayment.mockResolvedValue(paystackVerification);
            yield paymentController.verifyPaystackPayment(req, res, next);
            expect(PaymentService.verifyPaystackPayment).toHaveBeenCalledWith(req.params.reference);
            expect(res.status).toHaveBeenCalledWith(http_status_1.default.OK);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: { response: paystackVerification },
            });
        }));
    });
    describe("processFlutterwavePayment", () => {
        it("should process a Flutterwave payment and return response and reference", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = mockRequest({ amount: 100, email: "test@example.com" });
            const res = mockResponse();
            const next = mockNext();
            const flutterwaveResponse = { status: "success" };
            const reference = "FLW_12345";
            PaymentService.processFlutterwavePayment.mockResolvedValue({
                response: flutterwaveResponse,
                reference,
            });
            yield paymentController.processFlutterwavePayment(req, res, next);
            expect(PaymentService.processFlutterwavePayment).toHaveBeenCalledWith(req.body.amount, req.body.email);
            expect(res.status).toHaveBeenCalledWith(http_status_1.default.OK);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: { response: flutterwaveResponse, reference },
            });
        }));
    });
    describe("verifyFlutterwavePayment", () => {
        it("should verify a Flutterwave payment and return response", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = mockRequest({}, { reference: "FLW_12345" });
            const res = mockResponse();
            const next = mockNext();
            const flutterwaveVerification = { status: "success" };
            PaymentService.verifyFlutterwavePayment.mockResolvedValue(flutterwaveVerification);
            yield paymentController.verifyFlutterwavePayment(req, res, next);
            expect(PaymentService.verifyFlutterwavePayment).toHaveBeenCalledWith(req.params.reference);
            expect(res.status).toHaveBeenCalledWith(http_status_1.default.OK);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: { response: flutterwaveVerification },
            });
        }));
    });
});
//# sourceMappingURL=paymentController.test.js.map
//# debugId=390690ea-edb2-59ef-ad24-50e8337f4cd5
