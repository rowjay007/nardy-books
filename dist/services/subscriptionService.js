"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="6736dec2-6240-51ce-aeb4-9c8be0e26217")}catch(e){}}();

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubscription = exports.updateSubscription = exports.getSubscriptionById = exports.getSubscriptions = exports.createSubscription = void 0;
const subscriptionRepository = __importStar(require("../repositories/subscriptionRepository"));
const createSubscription = (subscriptionData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield subscriptionRepository.createSubscription(subscriptionData);
});
exports.createSubscription = createSubscription;
const getSubscriptions = (filter, sort, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return yield subscriptionRepository.getSubscriptions(filter, sort, page, limit);
});
exports.getSubscriptions = getSubscriptions;
const getSubscriptionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield subscriptionRepository.getSubscriptionById(id);
});
exports.getSubscriptionById = getSubscriptionById;
const updateSubscription = (id, subscriptionData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield subscriptionRepository.updateSubscription(id, subscriptionData);
});
exports.updateSubscription = updateSubscription;
const deleteSubscription = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield subscriptionRepository.deleteSubscription(id);
});
exports.deleteSubscription = deleteSubscription;
//# sourceMappingURL=subscriptionService.js.map
//# debugId=6736dec2-6240-51ce-aeb4-9c8be0e26217
