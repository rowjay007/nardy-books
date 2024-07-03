"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="97f22671-66e1-5514-ab5c-9ad6f9097d85")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
const appError_1 = __importDefault(require("../utils/appError"));
const protect = (req, res, next) => {
    const token = extractTokenFromHeader(req);
    if (!token) {
        return next(new appError_1.default("Unauthorized access", 401));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.default.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        return next(new appError_1.default("Invalid token", 401));
    }
};
exports.protect = protect;
/**
 * Extracts JWT token from Authorization header
 * @param req Express request object
 * @returns JWT token string or undefined
 */
const extractTokenFromHeader = (req) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        return authHeader.split(" ")[1];
    }
    return undefined;
};
//# sourceMappingURL=authMiddleware.js.map
//# debugId=97f22671-66e1-5514-ab5c-9ad6f9097d85
