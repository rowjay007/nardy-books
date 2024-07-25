"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="3a99771c-43c0-5564-ad21-30efbd669a6c")}catch(e){}}();

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
exports.removeRefreshToken = exports.setRefreshToken = exports.findByResetPasswordToken = exports.setResetPasswordToken = exports.deleteUser = exports.updateUser = exports.findUsers = exports.findUserById = exports.findUserByEmail = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const appError_1 = __importDefault(require("../utils/appError"));
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new userModel_1.default(userData);
    yield user.save();
    return user;
});
exports.createUser = createUser;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return userModel_1.default.findOne({ email });
});
exports.findUserByEmail = findUserByEmail;
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return userModel_1.default.findById(id);
});
exports.findUserById = findUserById;
const findUsers = (filter, sort, limit, skip) => __awaiter(void 0, void 0, void 0, function* () {
    return userModel_1.default.find(filter).sort(sort).limit(limit).skip(skip);
});
exports.findUsers = findUsers;
const updateUser = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return userModel_1.default.findByIdAndUpdate(id, updateData, { new: true });
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userModel_1.default.findByIdAndDelete(id);
    return result !== null;
});
exports.deleteUser = deleteUser;
const setResetPasswordToken = (id, token, expires) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(id);
    if (!user)
        throw new appError_1.default("User not found", 404);
    user.resetPasswordToken = token;
    user.resetPasswordExpires = expires;
    yield user.save();
    return user;
});
exports.setResetPasswordToken = setResetPasswordToken;
const findByResetPasswordToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return userModel_1.default.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: new Date() },
    });
});
exports.findByResetPasswordToken = findByResetPasswordToken;
const setRefreshToken = (id, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(id);
    if (!user)
        throw new appError_1.default("User not found", 404);
    user.refreshToken = refreshToken;
    yield user.save();
    return user;
});
exports.setRefreshToken = setRefreshToken;
const removeRefreshToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(id);
    if (!user)
        throw new appError_1.default("User not found", 404);
    user.refreshToken = undefined;
    yield user.save();
    return user;
});
exports.removeRefreshToken = removeRefreshToken;
//# sourceMappingURL=userRepository.js.map
//# debugId=3a99771c-43c0-5564-ad21-30efbd669a6c
