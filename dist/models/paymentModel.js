"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="c6ad973a-b5d7-52f3-bd32-cbc2ca4a3d39")}catch(e){}}();

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
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const mongoose_1 = __importStar(require("mongoose"));
const PaymentSchema = new mongoose_1.Schema({
    amount: { type: Number, required: true, index: true },
    method: { type: String, required: true, index: true },
    status: { type: String, required: true, index: true },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    date: { type: Date, default: Date.now, index: true },
    reference: { type: String, required: true, unique: true },
});
PaymentSchema.pre("save", function (next) {
    if (typeof this.date === "string") {
        const parsedDate = (0, date_fns_1.parse)(this.date, "dd-MM-yyyy", new Date());
        if ((0, date_fns_1.isValid)(parsedDate)) {
            this.date = parsedDate;
        }
        else {
            return next(new Error("Invalid date format, should be DD-MM-YYYY"));
        }
    }
    next();
});
const Payment = mongoose_1.default.model("Payment", PaymentSchema);
exports.default = Payment;
//# sourceMappingURL=paymentModel.js.map
//# debugId=c6ad973a-b5d7-52f3-bd32-cbc2ca4a3d39
