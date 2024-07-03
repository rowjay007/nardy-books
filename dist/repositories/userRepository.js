"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="b4bede6f-51f1-53a7-bb60-ac603bd6db28")}catch(e){}}();

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
const userModel_1 = __importDefault(require("../models/userModel"));
const appError_1 = __importDefault(require("../utils/appError"));
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new userModel_1.default(userData);
    yield user.save();
    return user;
});
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return userModel_1.default.findOne({ email });
});
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return userModel_1.default.findById(id);
});
const findUsers = (filter, sort, limit, skip) => __awaiter(void 0, void 0, void 0, function* () {
    return userModel_1.default.find(filter).sort(sort).limit(limit).skip(skip);
});
const updateUser = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findByIdAndUpdate(id, updateData, { new: true });
    if (!user)
        throw new appError_1.default("User not found", 404);
    return user;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findByIdAndDelete(id);
    if (!user)
        throw new appError_1.default("User not found", 404);
    return user;
});
const setResetPasswordToken = (id, token, expires) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(id);
    if (!user)
        throw new appError_1.default("User not found", 404);
    user.resetPasswordToken = token;
    user.resetPasswordExpires = expires;
    yield user.save();
    return user;
});
const findByResetPasswordToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return userModel_1.default.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: new Date() },
    });
});
const setRefreshToken = (id, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(id);
    if (!user)
        throw new appError_1.default("User not found", 404);
    user.refreshToken = refreshToken;
    yield user.save();
    return user;
});
const removeRefreshToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(id);
    if (!user)
        throw new appError_1.default("User not found", 404);
    user.refreshToken = undefined;
    yield user.save();
    return user;
});
exports.default = {
    createUser,
    findUserByEmail,
    findUserById,
    findUsers,
    updateUser,
    deleteUser,
    setResetPasswordToken,
    findByResetPasswordToken,
    setRefreshToken,
    removeRefreshToken,
};
//# sourceMappingURL=userRepository.js.map
//# debugId=b4bede6f-51f1-53a7-bb60-ac603bd6db28
