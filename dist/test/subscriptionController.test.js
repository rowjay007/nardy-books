"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="cdb8e072-df81-567c-8532-7152ae672858")}catch(e){}}();

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
const subscriptionService = __importStar(require("../services/subscriptionService"));
const subscriptionController = __importStar(require("../controllers/subscriptionController"));
const appError_1 = __importDefault(require("../utils/appError"));
const testHelpers_1 = require("../utils/testHelpers");
jest.mock("../services/subscriptionService");
describe("Subscription Controller", () => {
    const next = jest.fn();
    describe("createSubscription", () => {
        it("should create a subscription and return it", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const subscriptionData = { plan: "premium", userId: "123" };
            const createdSubscription = Object.assign(Object.assign({}, subscriptionData), { _id: "sub1" });
            req.body = subscriptionData;
            subscriptionService.createSubscription.mockResolvedValue(createdSubscription);
            yield subscriptionController.createSubscription(req, res, next);
            expect(subscriptionService.createSubscription).toHaveBeenCalledWith(subscriptionData);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(createdSubscription);
        }));
    });
    describe("getSubscriptions", () => {
        it("should return all subscriptions", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const subscriptions = [{ _id: "sub1", plan: "premium" }];
            req.query = {
                filter: JSON.stringify({}),
                sort: JSON.stringify({ createdAt: -1 }),
                page: "1",
                limit: "10",
            };
            subscriptionService.getSubscriptions.mockResolvedValue(subscriptions);
            yield subscriptionController.getSubscriptions(req, res, next);
            expect(subscriptionService.getSubscriptions).toHaveBeenCalledWith({}, { createdAt: -1 }, 1, 10);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(subscriptions);
        }));
    });
    describe("getSubscriptionById", () => {
        it("should return a subscription by ID", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const subscription = { _id: "sub1", plan: "premium" };
            req.params = { id: "sub1" };
            subscriptionService.getSubscriptionById.mockResolvedValue(subscription);
            yield subscriptionController.getSubscriptionById(req, res, next);
            expect(subscriptionService.getSubscriptionById).toHaveBeenCalledWith("sub1");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(subscription);
        }));
        it("should return 404 if subscription not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            req.params = { id: "nonexistent" };
            subscriptionService.getSubscriptionById.mockResolvedValue(null);
            yield subscriptionController.getSubscriptionById(req, res, next);
            expect(subscriptionService.getSubscriptionById).toHaveBeenCalledWith("nonexistent");
            expect(next).toHaveBeenCalledWith(new appError_1.default("Subscription not found", 404));
        }));
    });
    describe("updateSubscription", () => {
        it("should update a subscription and return it", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            const updatedSubscription = { _id: "sub1", plan: "basic" };
            req.params = { id: "sub1" };
            req.body = { plan: "basic" };
            subscriptionService.updateSubscription.mockResolvedValue(updatedSubscription);
            yield subscriptionController.updateSubscription(req, res, next);
            expect(subscriptionService.updateSubscription).toHaveBeenCalledWith("sub1", req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedSubscription);
        }));
        it("should return 404 if subscription not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            req.params = { id: "nonexistent" };
            req.body = { plan: "basic" };
            subscriptionService.updateSubscription.mockResolvedValue(null);
            yield subscriptionController.updateSubscription(req, res, next);
            expect(subscriptionService.updateSubscription).toHaveBeenCalledWith("nonexistent", req.body);
            expect(next).toHaveBeenCalledWith(new appError_1.default("Subscription not found", 404));
        }));
    });
    describe("deleteSubscription", () => {
        it("should delete a subscription and return success message", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            req.params = { id: "sub1" };
            subscriptionService.deleteSubscription.mockResolvedValue(true);
            yield subscriptionController.deleteSubscription(req, res, next);
            expect(subscriptionService.deleteSubscription).toHaveBeenCalledWith("sub1");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                message: "Subscription successfully deleted",
                data: null,
            });
        }));
        it("should return 404 if subscription not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, testHelpers_1.mockRequest)();
            const res = (0, testHelpers_1.mockResponse)();
            req.params = { id: "nonexistent" };
            subscriptionService.deleteSubscription.mockResolvedValue(false);
            yield subscriptionController.deleteSubscription(req, res, next);
            expect(subscriptionService.deleteSubscription).toHaveBeenCalledWith("nonexistent");
            expect(next).toHaveBeenCalledWith(new appError_1.default("Subscription not found", 404));
        }));
    });
});
//# sourceMappingURL=subscriptionController.test.js.map
//# debugId=cdb8e072-df81-567c-8532-7152ae672858
