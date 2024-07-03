"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="30f4e601-72ee-56dc-bd2f-1c0cf225184b")}catch(e){}}();

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
exports.verifyPayment = exports.initializePayment = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = __importDefault(require("../config/env"));
const PAYSTACK_TEST_SECRET_KEY = env_1.default.PAYSTACK_TEST_SECRET_KEY;
const initializePayment = (amount, email, reference) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post("https://api.paystack.co/transaction/initialize", { amount: amount * 100, email, reference }, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_TEST_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error("Failed to initialize payment with Paystack.");
    }
});
exports.initializePayment = initializePayment;
const verifyPayment = (reference) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
            Authorization: `Bearer ${PAYSTACK_TEST_SECRET_KEY}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
});
exports.verifyPayment = verifyPayment;
//# sourceMappingURL=paystack.js.map
//# debugId=30f4e601-72ee-56dc-bd2f-1c0cf225184b
