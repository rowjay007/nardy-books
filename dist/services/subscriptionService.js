"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="040a1a47-b60e-5fd9-8dfd-fe37d80d0e61")}catch(e){}}();

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
const cache_1 = __importStar(require("../utils/cache"));
const createSubscription = (subscriptionData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield subscriptionRepository.createSubscription(subscriptionData);
});
exports.createSubscription = createSubscription;
const getSubscriptions = (filter, sort, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return yield subscriptionRepository.getSubscriptions(filter, sort, page, limit);
});
exports.getSubscriptions = getSubscriptions;
const getSubscriptionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const cacheKey = `subscription_${id}`;
    let subscription = (_a = cache_1.default.get(cacheKey)) !== null && _a !== void 0 ? _a : null;
    if (subscription === null) {
        subscription = yield subscriptionRepository.getSubscriptionById(id);
        if (subscription) {
            cache_1.default.set(cacheKey, subscription, cache_1.CACHE_TTL_SECONDS);
        }
    }
    return subscription;
});
exports.getSubscriptionById = getSubscriptionById;
const updateSubscription = (id, subscriptionData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedSubscription = yield subscriptionRepository.updateSubscription(id, subscriptionData);
    if (updatedSubscription) {
        const cacheKey = `subscription_${id}`;
        cache_1.default.set(cacheKey, updatedSubscription, cache_1.CACHE_TTL_SECONDS);
    }
    return updatedSubscription;
});
exports.updateSubscription = updateSubscription;
const deleteSubscription = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedSubscription = yield subscriptionRepository.deleteSubscription(id);
    if (deletedSubscription) {
        const cacheKey = `subscription_${id}`;
        cache_1.default.del(cacheKey);
    }
    return deletedSubscription;
});
exports.deleteSubscription = deleteSubscription;
//# sourceMappingURL=subscriptionService.js.map
//# debugId=040a1a47-b60e-5fd9-8dfd-fe37d80d0e61
