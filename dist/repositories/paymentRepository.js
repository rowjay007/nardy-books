"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="cf2723e3-f725-5fe2-89e5-589c85d393a5")}catch(e){}}();

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
exports.remove = exports.update = exports.findAll = exports.findById = exports.create = void 0;
const paymentModel_1 = __importDefault(require("../models/paymentModel"));
const create = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = new paymentModel_1.default(paymentData);
    return payment.save();
});
exports.create = create;
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return paymentModel_1.default.findById(id).populate("user").exec();
});
exports.findById = findById;
const findAll = (filter, sort, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const query = buildQuery(filter)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit);
    return query.exec();
});
exports.findAll = findAll;
const update = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return paymentModel_1.default.findByIdAndUpdate(id, updateData, { new: true }).exec();
});
exports.update = update;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return paymentModel_1.default.findByIdAndDelete(id).exec();
});
exports.remove = remove;
function buildQuery(filter) {
    let query = paymentModel_1.default.find();
    if (filter.method) {
        query = query.where("method").equals(filter.method);
    }
    if (filter.status) {
        query = query.where("status").equals(filter.status);
    }
    return query;
}
//# sourceMappingURL=paymentRepository.js.map
//# debugId=cf2723e3-f725-5fe2-89e5-589c85d393a5
