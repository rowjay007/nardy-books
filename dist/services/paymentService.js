"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="1e073bf2-57fd-5919-b84f-251b65edfac4")}catch(e){}}();

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyFlutterwavePayment = exports.processFlutterwavePayment = exports.verifyPaystackPayment = exports.processPaystackPayment = exports.deletePayment = exports.updatePayment = exports.getAllPayments = exports.getPaymentById = exports.createPayment = void 0;
const PaymentRepository = __importStar(require("../repositories/paymentRepository"));
const paystack_1 = require("../utils/paystack");
const flutterwave_1 = require("../utils/flutterwave");
const referenceTag_1 = require("../utils/referenceTag");
const createPayment = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    const reference = (0, referenceTag_1.generateUniqueReference)("ADM_");
    paymentData.reference = reference;
    return PaymentRepository.create(paymentData);
});
exports.createPayment = createPayment;
const getPaymentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return PaymentRepository.findById(id);
});
exports.getPaymentById = getPaymentById;
const getAllPayments = (filter, sort, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return PaymentRepository.findAll(filter, sort, page, limit);
});
exports.getAllPayments = getAllPayments;
const updatePayment = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return PaymentRepository.update(id, updateData);
});
exports.updatePayment = updatePayment;
const deletePayment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield PaymentRepository.remove(id);
});
exports.deletePayment = deletePayment;
const processPaystackPayment = (amount, email) => __awaiter(void 0, void 0, void 0, function* () {
    const reference = (0, referenceTag_1.generateUniqueReference)("PSK_");
    const response = yield (0, paystack_1.initializePayment)(amount, email, reference);
    return { response, reference };
});
exports.processPaystackPayment = processPaystackPayment;
const verifyPaystackPayment = (reference) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, paystack_1.verifyPayment)(reference);
});
exports.verifyPaystackPayment = verifyPaystackPayment;
const processFlutterwavePayment = (amount, email) => __awaiter(void 0, void 0, void 0, function* () {
    const reference = (0, referenceTag_1.generateUniqueReference)("FLW_");
    const response = yield (0, flutterwave_1.initializeFlutterwavePayment)(amount, email, reference);
    return { response, reference };
});
exports.processFlutterwavePayment = processFlutterwavePayment;
const verifyFlutterwavePayment = (reference) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, flutterwave_1.verifyFlutterwavePayment)(reference);
});
exports.verifyFlutterwavePayment = verifyFlutterwavePayment;
//# sourceMappingURL=paymentService.js.map
//# debugId=1e073bf2-57fd-5919-b84f-251b65edfac4
