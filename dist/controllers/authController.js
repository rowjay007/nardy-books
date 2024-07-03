"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="0d4b19c8-0ce8-5a53-a4a7-833f8d6e90e5")}catch(e){}}();

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
exports.generateRefreshToken = exports.generateAccessToken = exports.resendVerificationEmail = exports.verifyEmail = exports.changePassword = exports.resetPassword = exports.requestPasswordReset = exports.refreshTokens = exports.logout = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
const userService_1 = __importDefault(require("../services/userService"));
const appError_1 = __importDefault(require("../utils/appError"));
const http_status_1 = __importDefault(require("http-status"));
const generateAccessToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, env_1.default.JWT_SECRET, {
        expiresIn: "1h",
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, env_1.default.REFRESH_TOKEN_SECRET, {
        expiresIn: env_1.default.REFRESH_TOKEN_EXPIRATION,
    });
};
exports.generateRefreshToken = generateRefreshToken;
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const user = yield userService_1.default.register(username, email, password);
        res.status(201).json({
            status: "success",
            data: { user },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const { user, accessToken } = yield userService_1.default.login(email, password);
        res.status(200).json({
            status: "success",
            data: { user, accessToken },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = getUserIdFromRequest(req);
    try {
        if (!userId) {
            throw new appError_1.default("User not authenticated", 401);
        }
        yield userService_1.default.logout(userId);
        res.status(204).json({
            status: "success",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.logout = logout;
const refreshTokens = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return next(new appError_1.default("Refresh token is required", 400));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, env_1.default.REFRESH_TOKEN_SECRET);
        const accessToken = generateAccessToken(decoded.id);
        const newRefreshToken = generateRefreshToken(decoded.id);
        res.status(200).json({
            status: "success",
            data: { accessToken, refreshToken: newRefreshToken },
        });
    }
    catch (error) {
        next(new appError_1.default("Invalid or expired refresh token", 401));
    }
});
exports.refreshTokens = refreshTokens;
const requestPasswordReset = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const token = yield userService_1.default.requestPasswordReset(email);
        res.status(200).json({
            status: "success",
            data: { token },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.requestPasswordReset = requestPasswordReset;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const { newPassword } = req.body;
    try {
        const user = yield userService_1.default.resetPassword(token, newPassword);
        res.status(200).json({
            status: "success",
            data: { user },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.resetPassword = resetPassword;
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { currentPassword, newPassword } = req.body;
    const userId = getUserIdFromRequest(req);
    try {
        if (!userId) {
            throw new appError_1.default("User not authenticated", 401);
        }
        const user = yield userService_1.default.changePassword(userId, currentPassword, newPassword);
        res.status(200).json({
            status: "success",
            data: { user },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.changePassword = changePassword;
const verifyEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    try {
        const user = yield userService_1.default.verifyEmail(token);
        res.status(http_status_1.default.OK).json({
            status: "success",
            message: "Email verified successfully.",
            data: { user },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.verifyEmail = verifyEmail;
const resendVerificationEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = getUserIdFromRequest(req);
    try {
        if (!userId) {
            throw new appError_1.default("User not authenticated", 401);
        }
        yield userService_1.default.resendVerificationEmail(userId);
        res.status(200).json({
            status: "success",
            message: "Verification email resent successfully",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.resendVerificationEmail = resendVerificationEmail;
/**
 * Helper function to get userId from request user
 * @param req Express request object
 * @returns User ID as string or undefined
 */
const getUserIdFromRequest = (req) => {
    const user = req.user;
    return user === null || user === void 0 ? void 0 : user.id;
};
//# sourceMappingURL=authController.js.map
//# debugId=0d4b19c8-0ce8-5a53-a4a7-833f8d6e90e5
