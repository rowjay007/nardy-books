"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="d296d33a-6f45-589e-a24f-5bd3c0978754")}catch(e){}}();

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
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
const userModel_1 = __importDefault(require("../models/userModel"));
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const appError_1 = __importDefault(require("../utils/appError"));
const emailUtils_1 = require("../utils/emailUtils");
const cache_1 = __importStar(require("../utils/cache"));
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
const register = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const verificationToken = crypto_1.default.randomBytes(32).toString("hex");
    const user = new userModel_1.default({
        username,
        email,
        password,
        verificationToken,
    });
    yield user.save();
    const verificationLink = `${env_1.default.EMAIL_VERIFICATION_URL}/${verificationToken}`;
    yield Promise.all([
        (0, emailUtils_1.sendWelcomeEmail)(email, username, verificationLink),
        (0, emailUtils_1.sendVerificationEmail)(email, verificationLink),
    ]);
    cache_1.default.flushAll();
    return user;
});
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository_1.default.findUserByEmail(email);
    if (!user)
        throw new appError_1.default("Invalid email or password", 401);
    const isPasswordCorrect = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordCorrect)
        throw new appError_1.default("Invalid email or password", 401);
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    yield userRepository_1.default.setRefreshToken(user._id, refreshToken);
    return { user, accessToken, refreshToken };
});
const logout = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield userRepository_1.default.removeRefreshToken(userId);
    cache_1.default.flushAll();
});
const requestPasswordReset = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository_1.default.findUserByEmail(email);
    if (!user)
        throw new appError_1.default("User not found", 404);
    const token = crypto_1.default.randomBytes(20).toString("hex");
    const expires = new Date(Date.now() + 3600000);
    yield userRepository_1.default.setResetPasswordToken(user._id, token, expires);
    const resetLink = `${env_1.default.RESET_PASSWORD_URL}/reset-password/${token}`;
    yield (0, emailUtils_1.sendResetPasswordEmail)(email, resetLink);
    return token;
});
const resetPassword = (token, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository_1.default.findByResetPasswordToken(token);
    if (!user)
        throw new appError_1.default("Invalid or expired token", 400);
    user.password = yield bcrypt_1.default.hash(newPassword, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    yield user.save();
    cache_1.default.flushAll();
    return user;
});
const changePassword = (userId, currentPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository_1.default.findUserById(userId);
    if (!user)
        throw new appError_1.default("User not found", 404);
    const isPasswordCorrect = yield bcrypt_1.default.compare(currentPassword, user.password);
    if (!isPasswordCorrect)
        throw new appError_1.default("Current password is incorrect", 401);
    user.password = yield bcrypt_1.default.hash(newPassword, 12);
    yield user.save();
    cache_1.default.flushAll();
    return user;
});
const verifyEmail = (verificationToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findOneAndUpdate({ verificationToken }, { $set: { isEmailVerified: true, verificationToken: undefined } }, { new: true });
    if (!user) {
        throw new appError_1.default("Invalid verification token.", 400);
    }
    cache_1.default.flushAll();
    return user;
});
const resendVerificationEmail = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository_1.default.findUserById(userId);
    if (!user)
        throw new appError_1.default("User not found", 404);
    const verificationToken = crypto_1.default.randomBytes(32).toString("hex");
    user.verificationToken = verificationToken;
    yield user.save();
    const verificationLink = `${process.env.EMAIL_VERIFICATION_URL}/verify-email/${verificationToken}`;
    yield (0, emailUtils_1.sendVerificationEmail)(user.email, verificationLink);
    cache_1.default.flushAll();
});
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = `user_${userId}`;
    let user = cache_1.default.get(cacheKey);
    if (user === undefined) {
        user = yield userRepository_1.default.findUserById(userId);
        if (user) {
            cache_1.default.set(cacheKey, user, cache_1.CACHE_TTL_SECONDS);
        }
    }
    return user;
});
const getAllUsers = (filter, sort, limit, skip) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = `allUsers_${JSON.stringify({ filter, sort, limit, skip })}`;
    let users = cache_1.default.get(cacheKey);
    if (!users) {
        users = yield userRepository_1.default.findUsers(filter, sort, limit, skip);
        cache_1.default.set(cacheKey, users, cache_1.CACHE_TTL_SECONDS);
    }
    return users;
});
const updateUser = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository_1.default.updateUser(userId, updateData);
    if (user) {
        cache_1.default.flushAll();
    }
    return user;
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield userRepository_1.default.deleteUser(userId);
    cache_1.default.flushAll();
});
exports.default = {
    register,
    login,
    logout,
    requestPasswordReset,
    resetPassword,
    changePassword,
    verifyEmail,
    resendVerificationEmail,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
};
//# sourceMappingURL=userService.js.map
//# debugId=d296d33a-6f45-589e-a24f-5bd3c0978754
