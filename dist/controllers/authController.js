"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="c9082cad-5d25-52f0-b76d-5c377e05fced")}catch(e){}}();

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
exports.resendVerificationEmail = exports.verifyEmail = exports.changePassword = exports.resetPassword = exports.requestPasswordReset = exports.logout = exports.refreshTokens = exports.login = exports.register = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
const userService = __importStar(require("../services/userService"));
const appError_1 = __importDefault(require("../utils/appError"));
const generateAccessToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, env_1.default.JWT_SECRET, {
        expiresIn: "1h",
    });
};
const generateRefreshToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, env_1.default.REFRESH_TOKEN_SECRET, {
        expiresIn: env_1.default.REFRESH_TOKEN_EXPIRATION,
    });
};
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const user = yield userService.register(username, email, password);
        res.status(http_status_1.default.CREATED).json({
            message: "Registration successful. Please check your email for verification.",
            user,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
/**
 * Controller function to log in a user
 * @param {Request} req - Express request object containing login credentials in the body
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with success message, user data, access token, and refresh token
 */
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { user } = yield userService.login(email, password);
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: env_1.default.NODE_ENV === "production",
            maxAge: 3600000,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: env_1.default.NODE_ENV === "production",
            maxAge: parseInt(env_1.default.REFRESH_TOKEN_EXPIRATION) * 24 * 60 * 60 * 1000,
        });
        res.status(http_status_1.default.OK).json({
            message: "Login successful",
            user,
            accessToken,
            refreshToken,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
/**
 * Controller function to refresh access and refresh tokens
 * @param {Request} req - Express request object with body containing refreshToken
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with new access and refresh tokens
 */
const refreshTokens = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return next(new appError_1.default("Refresh token is required", http_status_1.default.BAD_REQUEST));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, env_1.default.REFRESH_TOKEN_SECRET);
        const accessToken = generateAccessToken(decoded.id);
        const newRefreshToken = generateRefreshToken(decoded.id);
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: env_1.default.NODE_ENV === "production",
            maxAge: 3600000,
        });
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: env_1.default.NODE_ENV === "production",
            maxAge: parseInt(env_1.default.REFRESH_TOKEN_EXPIRATION) * 24 * 60 * 60 * 1000,
        });
        res.status(http_status_1.default.OK).json({
            status: "success",
            message: "Tokens refreshed successfully",
            accessToken,
            refreshToken: newRefreshToken,
        });
    }
    catch (error) {
        next(new appError_1.default("Invalid or expired refresh token", http_status_1.default.UNAUTHORIZED));
    }
});
exports.refreshTokens = refreshTokens;
/**
 * Controller function to log out a user
 * @param {AuthenticatedRequest} req - Express request object extended with user information
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with a success message
 */
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(http_status_1.default.OK).json({
            message: "Logout successful",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.logout = logout;
/**
 * Controller function to request a password reset for a user
 * @param {Request} req - Express request object with body containing email
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with a password reset token
 */
const requestPasswordReset = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const token = yield userService.requestPasswordReset(email);
        res.status(http_status_1.default.OK).json({
            status: "success",
            data: { token },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.requestPasswordReset = requestPasswordReset;
/**
 * Controller function to reset a user's password using a reset token
 * @param {Request} req - Express request object with params containing token and body containing newPassword
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the updated user data
 */
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const { newPassword } = req.body;
    try {
        const user = yield userService.resetPassword(token, newPassword);
        res.status(http_status_1.default.OK).json({
            status: "success",
            data: { user },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.resetPassword = resetPassword;
/**
 * Controller function to change a user's password
 * @param {AuthenticatedRequest} req - Express request object extended with user information
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the updated user data
 */
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { currentPassword, newPassword } = req.body;
    const userId = getUserIdFromRequest(req);
    try {
        if (!userId) {
            throw new appError_1.default("User not authenticated", http_status_1.default.UNAUTHORIZED);
        }
        const user = yield userService.changePassword(userId, currentPassword, newPassword);
        res.status(http_status_1.default.OK).json({
            status: "success",
            data: { user },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.changePassword = changePassword;
/**
 * Controller function to verify a user's email using a verification token
 * @param {Request} req - Express request object with params containing token
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the updated user data
 */
const verifyEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    try {
        const user = yield userService.verifyEmail(token);
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
/**
 * Controller function to resend a verification email to the authenticated user
 * @param {AuthenticatedRequest} req - Express request object extended with user information
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object indicating success message
 */
const resendVerificationEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = getUserIdFromRequest(req);
    try {
        if (!userId) {
            throw new appError_1.default("User not authenticated", http_status_1.default.UNAUTHORIZED);
        }
        yield userService.resendVerificationEmail(userId);
        res.status(http_status_1.default.OK).json({
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
 * Helper function to extract user ID from the request
 * @param {AuthenticatedRequest} req - Express request object extended with user information
 * @returns {string | undefined} - User ID if found, otherwise undefined
 */
const getUserIdFromRequest = (req) => {
    const user = req.user;
    return user === null || user === void 0 ? void 0 : user.id;
};
//# sourceMappingURL=authController.js.map
//# debugId=c9082cad-5d25-52f0-b76d-5c377e05fced
