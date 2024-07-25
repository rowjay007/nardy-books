"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="cf466a97-75f9-5f5f-9d4c-7b8d33711e44")}catch(e){}}();

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
exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getAllUsers = void 0;
const userService = __importStar(require("../services/userService"));
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
/**
 * Controller function to get all users
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 */
exports.getAllUsers = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    const sort = {};
    const limit = 10;
    const skip = 0;
    const users = yield userService.getAllUsers(filter, sort, limit, skip);
    res.status(200).json({
        status: "success",
        data: { users },
    });
}));
/**
 * Controller function to get a user by ID
 * @param req Express request object with params containing user ID
 * @param res Express response object
 * @param next Express next function
 */
exports.getUserById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    // Validate userId
    if (!userId) {
        return next(new appError_1.default("No user ID provided", 400));
    }
    const user = yield userService.getUserById(userId);
    if (!user) {
        return next(new appError_1.default("User not found", 404));
    }
    res.status(200).json({
        status: "success",
        data: { user },
    });
}));
/**
 * Controller function to update a user
 * @param req Express request object with params containing user ID and body containing update data
 * @param res Express response object
 * @param next Express next function
 */
exports.updateUserById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const updateData = req.body;
    if (!userId) {
        return next(new appError_1.default("No user ID provided", 400));
    }
    const updatedUser = yield userService.updateUser(userId, updateData);
    if (!updatedUser) {
        return next(new appError_1.default("User not found", 404));
    }
    res.status(200).json({
        status: "success",
        data: { user: updatedUser },
    });
}));
/**
 * Controller function to delete a user
 * @param req Express request object with params containing user ID
 * @param res Express response object
 * @param next Express next function
 */
exports.deleteUserById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    // Validate userId
    if (!userId) {
        return next(new appError_1.default("No user ID provided", 400));
    }
    const result = yield userService.deleteUser(userId);
    if (!result) {
        return next(new appError_1.default("User not found", 404));
    }
    res.status(200).json({
        status: "success",
        message: "User successfully deleted",
        data: null,
    });
}));
//# sourceMappingURL=userController.js.map
//# debugId=cf466a97-75f9-5f5f-9d4c-7b8d33711e44
