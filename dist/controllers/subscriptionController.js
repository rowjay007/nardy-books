"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="9d669f3b-30cc-5ee6-a1c9-7e09bd6aaaea")}catch(e){}}();

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
exports.deleteSubscription = exports.updateSubscription = exports.getSubscriptionById = exports.getSubscriptions = exports.createSubscription = void 0;
const subscriptionService = __importStar(require("../services/subscriptionService"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
/**
 * Controller function create a subscription
 * @param req Express request object with body containing subscription data
 * @param res Express response object
 * @param next Express next function
 */
exports.createSubscription = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subscription = yield subscriptionService.createSubscription(req.body);
    res.status(201).json(subscription);
}));
/**
 * Controller function get all subscriptions
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 */
exports.getSubscriptions = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sort, page, limit } = req.query;
    const subscriptions = yield subscriptionService.getSubscriptions(filter ? JSON.parse(filter) : {}, sort ? JSON.parse(sort) : { createdAt: -1 }, parseInt(page, 10) || 1, parseInt(limit, 10) || 10);
    res.status(200).json(subscriptions);
}));
/**
 * Controller function get a subscription by ID
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 */
exports.getSubscriptionById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const subscription = yield subscriptionService.getSubscriptionById(req.params.id);
    if (!subscription) {
        return next(new appError_1.default("Subscription not found", 404)); // Ensure `next` is called here
    }
    res.status(200).json(subscription);
}));
/**
 * Controller function update a subscription
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 */
exports.updateSubscription = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subscription = yield subscriptionService.updateSubscription(req.params.id, req.body);
    if (!subscription) {
        throw new appError_1.default("Subscription not found", 404);
    }
    res.status(200).json(subscription);
}));
/**
 * Controller function delete a subscription
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 */
exports.deleteSubscription = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield subscriptionService.deleteSubscription(req.params.id);
    res.status(200).json({
        status: "success",
        message: "Subscription successfully deleted",
        data: null,
    });
}));
//# sourceMappingURL=subscriptionController.js.map
//# debugId=9d669f3b-30cc-5ee6-a1c9-7e09bd6aaaea
