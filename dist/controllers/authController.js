"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="d607db3c-933a-57cb-b4be-9db211a022b5")}catch(e){}}();

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
/**
 * Generates an access token for the given user ID
 * @param {string} userId - User ID
 * @returns {string} Generated access token
 */
const generateAccessToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, env_1.default.JWT_SECRET, {
        expiresIn: "1h",
    });
};
exports.generateAccessToken = generateAccessToken;
/**
 * Generates a refresh token for the given user ID
 * @param {string} userId - User ID
 * @returns {string} Generated refresh token
 */
const generateRefreshToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, env_1.default.REFRESH_TOKEN_SECRET, {
        expiresIn: env_1.default.REFRESH_TOKEN_EXPIRATION,
    });
};
exports.generateRefreshToken = generateRefreshToken;
/**
 * Controller function to register a new user
 * @param {Request} req - Express request object with body containing username, email, and password
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the created user data
 */
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const user = yield userService_1.default.register(username, email, password);
        res.status(http_status_1.default.CREATED).json({
            status: "success",
            data: { user },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
/**
 * Controller function to authenticate a user and generate access token
 * @param {Request} req - Express request object with body containing email and password
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with the authenticated user data and access token
 */
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const { user, accessToken } = yield userService_1.default.login(email, password);
        res.status(http_status_1.default.OK).json({
            status: "success",
            data: { user, accessToken },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
/**
 * Controller function to logout a user
 * @param {AuthenticatedRequest} req - Express request object extended with user information
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object indicating successful logout
 */
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = getUserIdFromRequest(req);
    try {
        if (!userId) {
            throw new appError_1.default("User not authenticated", http_status_1.default.UNAUTHORIZED);
        }
        yield userService_1.default.logout(userId);
        res.status(http_status_1.default.NO_CONTENT).json({
            status: "success",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.logout = logout;
/**
 * Controller function to refresh access and refresh tokens
 * @param {Request} req - Express request object with body containing refreshToken
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>} - Returns a JSON object with new access and refresh tokens
 */
const refreshTokens = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return next(new appError_1.default("Refresh token is required", http_status_1.default.BAD_REQUEST));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, env_1.default.REFRESH_TOKEN_SECRET);
        const accessToken = generateAccessToken(decoded.id);
        const newRefreshToken = generateRefreshToken(decoded.id);
        res.status(http_status_1.default.OK).json({
            status: "success",
            data: { accessToken, refreshToken: newRefreshToken },
        });
    }
    catch (error) {
        next(new appError_1.default("Invalid or expired refresh token", http_status_1.default.UNAUTHORIZED));
    }
});
exports.refreshTokens = refreshTokens;
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
        const token = yield userService_1.default.requestPasswordReset(email);
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
        const user = yield userService_1.default.resetPassword(token, newPassword);
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
        const user = yield userService_1.default.changePassword(userId, currentPassword, newPassword);
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
        yield userService_1.default.resendVerificationEmail(userId);
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
//# debugId=d607db3c-933a-57cb-b4be-9db211a022b5
