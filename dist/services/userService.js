"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="6c83f979-10c3-5e37-b8ca-e395a70aef59")}catch(e){}}();

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
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.getUserById = exports.resendVerificationEmail = exports.verifyEmail = exports.changePassword = exports.resetPassword = exports.requestPasswordReset = exports.logout = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const userRepository = __importStar(require("../repositories/userRepository"));
const appError_1 = __importDefault(require("../utils/appError"));
const env_1 = __importDefault(require("../config/env"));
const cache_1 = __importStar(require("../utils/cache"));
const emailUtils_1 = require("../utils/emailUtils");
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
        password, // Password will be hashed by the pre-save hook
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
exports.register = register;
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email.includes("@") || !email.split("@")[1].includes(".")) {
        throw new appError_1.default("Invalid email format", 400);
    }
    const user = yield userRepository.findUserByEmail(email);
    if (!user)
        throw new appError_1.default("Invalid email or password", 401);
    if (!user.isEmailVerified) {
        throw new appError_1.default("Email not verified", 401);
    }
    const isPasswordCorrect = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordCorrect)
        throw new appError_1.default("Invalid email or password", 401);
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    yield userRepository.setRefreshToken(user._id, refreshToken);
    return { user, accessToken, refreshToken };
});
exports.login = login;
const logout = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield userRepository.removeRefreshToken(userId);
    cache_1.default.flushAll();
});
exports.logout = logout;
const requestPasswordReset = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.findUserByEmail(email);
    if (!user)
        throw new appError_1.default("User not found", 404);
    const token = crypto_1.default.randomBytes(20).toString("hex");
    const expires = new Date(Date.now() + 3600000);
    yield userRepository.setResetPasswordToken(user._id, token, expires);
    const resetLink = `${env_1.default.RESET_PASSWORD_URL}/reset-password/${token}`;
    yield (0, emailUtils_1.sendResetPasswordEmail)(email, resetLink);
    return token;
});
exports.requestPasswordReset = requestPasswordReset;
const resetPassword = (token, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.findByResetPasswordToken(token);
    if (!user)
        throw new appError_1.default("Invalid or expired token", 400);
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    yield user.save();
    cache_1.default.flushAll();
    return user;
});
exports.resetPassword = resetPassword;
const changePassword = (userId, currentPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.findUserById(userId);
    if (!user)
        throw new appError_1.default("User not found", 404);
    const isPasswordCorrect = yield bcrypt_1.default.compare(currentPassword, user.password);
    if (!isPasswordCorrect)
        throw new appError_1.default("Current password is incorrect", 401);
    user.password = newPassword;
    yield user.save();
    cache_1.default.flushAll();
    return user;
});
exports.changePassword = changePassword;
const verifyEmail = (verificationToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findOneAndUpdate({ verificationToken }, { $set: { isEmailVerified: true, verificationToken: undefined } }, { new: true });
    if (!user) {
        throw new appError_1.default("Invalid verification token.", 400);
    }
    cache_1.default.flushAll();
    return user;
});
exports.verifyEmail = verifyEmail;
const resendVerificationEmail = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.findUserById(userId);
    if (!user)
        throw new appError_1.default("User not found", 404);
    const verificationToken = crypto_1.default.randomBytes(32).toString("hex");
    user.verificationToken = verificationToken;
    yield user.save();
    const verificationLink = `${env_1.default.EMAIL_VERIFICATION_URL}/verify-email/${verificationToken}`;
    yield (0, emailUtils_1.sendVerificationEmail)(user.email, verificationLink);
    cache_1.default.flushAll();
});
exports.resendVerificationEmail = resendVerificationEmail;
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = `user_${userId}`;
    let user = cache_1.default.get(cacheKey);
    if (user === undefined) {
        user = yield userRepository.findUserById(userId);
        if (user) {
            cache_1.default.set(cacheKey, user, cache_1.CACHE_TTL_SECONDS);
        }
    }
    return user;
});
exports.getUserById = getUserById;
const getAllUsers = (filter, sort, limit, skip) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = `allUsers_${JSON.stringify({ filter, sort, limit, skip })}`;
    let users = cache_1.default.get(cacheKey);
    if (!users) {
        users = yield userRepository.findUsers(filter, sort, limit, skip);
        cache_1.default.set(cacheKey, users, cache_1.CACHE_TTL_SECONDS);
    }
    return users;
});
exports.getAllUsers = getAllUsers;
const updateUser = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.updateUser(userId, updateData);
    if (user) {
        cache_1.default.flushAll();
    }
    return user;
});
exports.updateUser = updateUser;
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userRepository.deleteUser(userId);
    cache_1.default.flushAll();
    return result !== null;
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=userService.js.map
//# debugId=6c83f979-10c3-5e37-b8ca-e395a70aef59
