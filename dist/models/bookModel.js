"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="9a9c6707-4371-56b8-a6a5-dca1f4ac92ad")}catch(e){}}();

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
const mongoose_1 = __importStar(require("mongoose"));
const BookSchema = new mongoose_1.Schema({
    title: { type: String, required: true, index: true },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Author",
        required: true,
        index: true,
    },
    publisher: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Publisher",
        required: true,
        index: true,
    },
    genre: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Genre",
        required: true,
        index: true,
    },
    reviews: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Review" }],
    price: { type: Number, required: true, index: true },
});
const Book = mongoose_1.default.model("Book", BookSchema);
exports.default = Book;
//# sourceMappingURL=bookModel.js.map
//# debugId=9a9c6707-4371-56b8-a6a5-dca1f4ac92ad
