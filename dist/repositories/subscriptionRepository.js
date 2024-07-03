"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f8709497-909d-571f-93b4-d344f408a344")}catch(e){}}();

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
const subscriptionModel_1 = __importDefault(require("../models/subscriptionModel"));
const mongoose_1 = require("mongoose");
const appError_1 = __importDefault(require("../utils/appError"));
const createSubscription = (subscriptionData) => __awaiter(void 0, void 0, void 0, function* () {
    const subscription = new subscriptionModel_1.default(subscriptionData);
    return yield subscription.save();
});
exports.createSubscription = createSubscription;
const getSubscriptions = (filter, sort, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        populate: "users",
        sort,
        skip: (page - 1) * limit,
        limit,
    };
    return yield subscriptionModel_1.default.find(filter, null, options);
});
exports.getSubscriptions = getSubscriptions;
const getSubscriptionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        throw new appError_1.default("Invalid ID", 400);
    return yield subscriptionModel_1.default.findById(id).populate("users");
});
exports.getSubscriptionById = getSubscriptionById;
const updateSubscription = (id, subscriptionData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        throw new appError_1.default("Invalid ID", 400);
    return yield subscriptionModel_1.default.findByIdAndUpdate(id, subscriptionData, {
        new: true,
        runValidators: true,
    });
});
exports.updateSubscription = updateSubscription;
const deleteSubscription = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        throw new appError_1.default("Invalid ID", 400);
    return yield subscriptionModel_1.default.findByIdAndDelete(id);
});
exports.deleteSubscription = deleteSubscription;
//# sourceMappingURL=subscriptionRepository.js.map
//# debugId=f8709497-909d-571f-93b4-d344f408a344
