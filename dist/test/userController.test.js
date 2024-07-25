"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="21fd1c70-d05b-583b-b700-7ebb3a178295")}catch(e){}}();

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
const mongoose_1 = require("mongoose");
const userController = __importStar(require("../controllers/userController"));
const userService = __importStar(require("../services/userService"));
const appError_1 = __importDefault(require("../utils/appError"));
const testHelpers_1 = require("../utils/testHelpers");
jest.mock("../services/userService");
describe("User Controller", () => {
    const next = jest.fn();
    describe("getUserById", () => {
        it("should handle invalid user ID", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            req.params = {}; // No ID provided
            yield userController.getUserById(req, res, next);
            expect(next).toHaveBeenCalledWith(new appError_1.default("No user ID provided", 400));
        }));
        it("should return a user by id", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const userId = new mongoose_1.Types.ObjectId();
            const user = { _id: userId, username: "JohnDoe" };
            req.params = { id: userId.toHexString() };
            userService.getUserById.mockResolvedValue(user);
            yield userController.getUserById(req, res, next);
            expect(userService.getUserById).toHaveBeenCalledWith(userId.toHexString());
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: { user },
            });
        }));
        it("should return 404 if user not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const userId = new mongoose_1.Types.ObjectId();
            req.params = { id: userId.toHexString() };
            userService.getUserById.mockResolvedValue(null);
            yield userController.getUserById(req, res, next);
            expect(userService.getUserById).toHaveBeenCalledWith(userId.toHexString());
            expect(next).toHaveBeenCalledWith(new appError_1.default("User not found", 404));
        }));
    });
    describe("updateUser", () => {
        it("should handle invalid user ID", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            req.params = {}; // No ID provided
            req.body = { username: "JaneDoe" };
            yield userController.updateUserById(req, res, next);
            expect(next).toHaveBeenCalledWith(new appError_1.default("No user ID provided", 400));
        }));
        it("should update a user and return it", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const userId = new mongoose_1.Types.ObjectId();
            const updatedUser = { _id: userId, username: "JaneDoe" };
            req.params = { id: userId.toHexString() };
            req.body = { username: "JaneDoe" };
            userService.updateUser.mockResolvedValue(updatedUser);
            yield userController.updateUserById(req, res, next);
            expect(userService.updateUser).toHaveBeenCalledWith(userId.toHexString(), req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                data: { user: updatedUser },
            });
        }));
        it("should return 404 if user not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const userId = new mongoose_1.Types.ObjectId();
            req.params = { id: userId.toHexString() };
            req.body = { username: "JaneDoe" };
            userService.updateUser.mockResolvedValue(null);
            yield userController.updateUserById(req, res, next);
            expect(userService.updateUser).toHaveBeenCalledWith(userId.toHexString(), req.body);
            expect(next).toHaveBeenCalledWith(new appError_1.default("User not found", 404));
        }));
    });
    describe("deleteUser", () => {
        it("should handle invalid user ID", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            req.params = {};
            yield userController.deleteUserById(req, res, next);
            expect(next).toHaveBeenCalledWith(new appError_1.default("No user ID provided", 400));
        }));
        it("should delete a user and return success message", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const userId = new mongoose_1.Types.ObjectId();
            req.params = { id: userId.toHexString() };
            userService.deleteUser.mockResolvedValue(true);
            yield userController.deleteUserById(req, res, next);
            expect(userService.deleteUser).toHaveBeenCalledWith(userId.toHexString());
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                message: "User successfully deleted",
                data: null,
            });
        }));
        it("should return 404 if user not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const userId = new mongoose_1.Types.ObjectId();
            req.params = { id: userId.toHexString() };
            userService.deleteUser.mockResolvedValue(false);
            yield userController.deleteUserById(req, res, next);
            expect(userService.deleteUser).toHaveBeenCalledWith(userId.toHexString());
            expect(next).toHaveBeenCalledWith(new appError_1.default("User not found", 404));
        }));
    });
});
//# sourceMappingURL=userController.test.js.map
//# debugId=21fd1c70-d05b-583b-b700-7ebb3a178295
