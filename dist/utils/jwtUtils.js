"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="3592f909-931e-57e5-bd64-61c8bb4e9542")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVerificationToken = exports.generateResetToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
const generateResetToken = (userId) => {
    const token = jsonwebtoken_1.default.sign({ userId }, env_1.default.JWT_SECRET, { expiresIn: "1h" });
    return token;
};
exports.generateResetToken = generateResetToken;
const generateVerificationToken = (userId) => {
    const token = jsonwebtoken_1.default.sign({ userId }, env_1.default.JWT_SECRET, { expiresIn: "1d" });
    return token;
};
exports.generateVerificationToken = generateVerificationToken;
//# sourceMappingURL=jwtUtils.js.map
//# debugId=3592f909-931e-57e5-bd64-61c8bb4e9542
