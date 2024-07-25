"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="78a746b9-a163-54cd-82b5-df9a050b5ee3")}catch(e){}}();

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
const authController = __importStar(require("../controllers/authController"));
const userService = __importStar(require("../services/userService"));
const appError_1 = __importDefault(require("../utils/appError"));
const testHelpers_1 = require("../utils/testHelpers");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
jest.mock("../services/userService");
jest.mock("jsonwebtoken");
describe("Auth Controller", () => {
    let next;
    beforeEach(() => {
        next = jest.fn();
        jest.resetAllMocks();
    });
    describe("register", () => {
        it("should register a new user", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const newUser = {
                username: "testuser",
                email: "test@example.com",
                password: "password123",
            };
            const createdUser = Object.assign({ _id: new mongoose_1.Types.ObjectId() }, newUser);
            req.body = newUser;
            userService.register.mockResolvedValue(createdUser);
            yield authController.register(req, res, next);
            expect(userService.register).toHaveBeenCalledWith(newUser.username, newUser.email, newUser.password);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: "Registration successful. Please check your email for verification.",
                user: createdUser,
            });
        }));
        it("should handle errors during registration", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const newUser = {
                username: "testuser",
                email: "test@example.com",
                password: "password123",
            };
            req.body = newUser;
            userService.register.mockRejectedValue(new Error("Registration failed"));
            yield authController.register(req, res, next);
            expect(userService.register).toHaveBeenCalledWith(newUser.username, newUser.email, newUser.password);
            expect(next).toHaveBeenCalledWith(expect.any(Error));
        }));
    });
    describe("login", () => {
        it("should log in a user and return tokens", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const loginData = {
                email: "test@example.com",
                password: "password123",
            };
            const user = Object.assign({ id: new mongoose_1.Types.ObjectId() }, loginData);
            req.body = loginData;
            userService.login.mockResolvedValue({ user });
            jsonwebtoken_1.default.sign
                .mockReturnValueOnce("accessToken")
                .mockReturnValueOnce("refreshToken");
            yield authController.login(req, res, next);
            expect(userService.login).toHaveBeenCalledWith(loginData.email, loginData.password);
            expect(jsonwebtoken_1.default.sign).toHaveBeenCalledTimes(2);
            expect(res.cookie).toHaveBeenCalledTimes(2);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Login successful",
                user,
                accessToken: "accessToken",
                refreshToken: "refreshToken",
            });
        }));
    });
    describe("refreshTokens", () => {
        it("should refresh tokens when given a valid refresh token", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const userId = new mongoose_1.Types.ObjectId().toString();
            req.cookies = { refreshToken: "validRefreshToken" };
            jsonwebtoken_1.default.verify.mockReturnValue({ id: userId });
            jsonwebtoken_1.default.sign
                .mockReturnValueOnce("newAccessToken")
                .mockReturnValueOnce("newRefreshToken");
            yield authController.refreshTokens(req, res, next);
            expect(jsonwebtoken_1.default.verify).toHaveBeenCalledWith("validRefreshToken", env_1.default.REFRESH_TOKEN_SECRET);
            expect(jsonwebtoken_1.default.sign).toHaveBeenCalledTimes(2);
            expect(res.cookie).toHaveBeenCalledTimes(2);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                message: "Tokens refreshed successfully",
                accessToken: "newAccessToken",
                refreshToken: "newRefreshToken",
            });
        }));
        it("should handle missing refresh token", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            req.cookies = {};
            yield authController.refreshTokens(req, res, next);
            expect(next).toHaveBeenCalledWith(expect.any(appError_1.default));
            expect(next.mock.calls[0][0].message).toBe("Refresh token is required");
            expect(next.mock.calls[0][0].statusCode).toBe(400);
        }));
        it("should handle invalid refresh token", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            req.cookies = { refreshToken: "invalidRefreshToken" };
            jsonwebtoken_1.default.verify.mockImplementation(() => {
                throw new Error("Invalid token");
            });
            yield authController.refreshTokens(req, res, next);
            expect(next).toHaveBeenCalledWith(expect.any(appError_1.default));
            expect(next.mock.calls[0][0].message).toBe("Invalid or expired refresh token");
            expect(next.mock.calls[0][0].statusCode).toBe(401);
        }));
    });
});
//# sourceMappingURL=authController.test.js.map
//# debugId=78a746b9-a163-54cd-82b5-df9a050b5ee3
