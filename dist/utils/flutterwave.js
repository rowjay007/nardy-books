"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="53b09db0-1433-5f55-aa75-03d03a5d7854")}catch(e){}}();

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
exports.verifyFlutterwavePayment = exports.initializeFlutterwavePayment = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = __importDefault(require("../config/env"));
const FLUTTERWAVE_TEST_SECRET_KEY = env_1.default.FLUTTERWAVE_TEST_SECRET_KEY;
const initializeFlutterwavePayment = (amount, email, reference) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post("https://api.flutterwave.com/v3/payments", {
        tx_ref: reference,
        amount,
        currency: "NGN",
        redirect_url: "https://your-redirect-url.com",
        customer: {
            email,
        },
    }, {
        headers: {
            Authorization: `Bearer ${FLUTTERWAVE_TEST_SECRET_KEY}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
});
exports.initializeFlutterwavePayment = initializeFlutterwavePayment;
const verifyFlutterwavePayment = (reference) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://api.flutterwave.com/v3/transactions/${reference}/verify`, {
        headers: {
            Authorization: `Bearer ${FLUTTERWAVE_TEST_SECRET_KEY}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
});
exports.verifyFlutterwavePayment = verifyFlutterwavePayment;
//# sourceMappingURL=flutterwave.js.map
//# debugId=53b09db0-1433-5f55-aa75-03d03a5d7854
