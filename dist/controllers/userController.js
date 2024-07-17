"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="9e8e5464-1b54-5dd6-8dc3-bb61727a5269")}catch(e){}}();

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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = void 0;
const userService_1 = __importDefault(require("../services/userService"));
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
    const users = yield userService_1.default.getAllUsers(filter, sort, limit, skip);
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
    const user = yield userService_1.default.getUserById(userId);
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
exports.updateUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const updateData = req.body;
    const updatedUser = yield userService_1.default.updateUser(userId, updateData);
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
exports.deleteUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    yield userService_1.default.deleteUser(userId);
    res.status(200).json({
        status: "success",
        message: "User successfully deleted",
        data: null,
    });
}));
//# sourceMappingURL=userController.js.map
//# debugId=9e8e5464-1b54-5dd6-8dc3-bb61727a5269
