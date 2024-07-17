"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="24aa5987-ff1b-5af6-a6a4-a940c871444b")}catch(e){}}();

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
exports.verifyFlutterwavePayment = exports.processFlutterwavePayment = exports.verifyPaystackPayment = exports.processPaystackPayment = exports.deletePayment = exports.updatePayment = exports.getAllPayments = exports.getPaymentById = exports.createPayment = void 0;
const PaymentService = __importStar(require("../services/paymentService"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const http_status_1 = __importDefault(require("http-status"));
/**
 * Controller function to create a payment
 * @param {Request} req - Express request object with body containing payment data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the payment data
 */
exports.createPayment = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield PaymentService.createPayment(req.body);
    res
        .status(http_status_1.default.CREATED)
        .json({ status: "success", data: { payment } });
}));
/**
 * Controller function to get a payment by ID
 * @param {Request} req - Express request object with params containing payment ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the payment data
 */
exports.getPaymentById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield PaymentService.getPaymentById(req.params.id);
    if (!payment) {
        return next(new appError_1.default("Payment not found", http_status_1.default.NOT_FOUND));
    }
    res.status(http_status_1.default.OK).json({ status: "success", data: { payment } });
}));
/**
 * Controller function to get all payments
 * @param {Request} req - Express request object with query parameters for filtering, sorting, pagination
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the payments data
 */
exports.getAllPayments = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sort, page, limit } = req.query;
    const payments = yield PaymentService.getAllPayments(JSON.parse(filter || "{}"), JSON.parse(sort || "{}"), parseInt(page, 10) || 1, parseInt(limit, 10) || 10);
    res.status(http_status_1.default.OK).json({ status: "success", data: { payments } });
}));
/**
 * Controller function to update a payment by ID
 * @param {Request} req - Express request object with params containing payment ID and body containing update data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the updated payment data
 */
exports.updatePayment = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield PaymentService.updatePayment(req.params.id, req.body);
    if (!payment) {
        return next(new appError_1.default("Payment not found", http_status_1.default.NOT_FOUND));
    }
    res.status(http_status_1.default.OK).json({ status: "success", data: { payment } });
}));
/**
 * Controller function to delete a payment by ID
 * @param {Request} req - Express request object with params containing payment ID
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object indicating successful deletion
 */
exports.deletePayment = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield PaymentService.deletePayment(req.params.id);
    res.status(http_status_1.default.OK).json({
        status: "success",
        message: "Payment successfully deleted",
        data: null,
    });
}));
/**
 * Controller function to process a Paystack payment
 * @param {Request} req - Express request object with body containing amount and email
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the payment response and reference
 */
exports.processPaystackPayment = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, email } = req.body;
    const { response, reference } = yield PaymentService.processPaystackPayment(amount, email);
    res
        .status(http_status_1.default.OK)
        .json({ status: "success", data: { response, reference } });
}));
/**
 * Controller function to verify a Paystack payment
 * @param {Request} req - Express request object with params containing payment reference
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the payment verification response
 */
exports.verifyPaystackPayment = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { reference } = req.params;
    const response = yield PaymentService.verifyPaystackPayment(reference);
    res.status(http_status_1.default.OK).json({ status: "success", data: { response } });
}));
/**
 * Controller function to process a Flutterwave payment
 * @param {Request} req - Express request object with body containing amount and email
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the payment response and reference
 */
exports.processFlutterwavePayment = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, email } = req.body;
    const { response, reference } = yield PaymentService.processFlutterwavePayment(amount, email);
    res
        .status(http_status_1.default.OK)
        .json({ status: "success", data: { response, reference } });
}));
/**
 * Controller function to verify a Flutterwave payment
 * @param {Request} req - Express request object with params containing payment reference
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the payment verification response
 */
exports.verifyFlutterwavePayment = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { reference } = req.params;
    const response = yield PaymentService.verifyFlutterwavePayment(reference);
    res.status(http_status_1.default.OK).json({ status: "success", data: { response } });
}));
//# sourceMappingURL=paymentController.js.map
//# debugId=24aa5987-ff1b-5af6-a6a4-a940c871444b
