"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="0915d5bb-7850-508f-acbf-d4b28b2c856b")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CACHE_TTL_SECONDS = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
exports.CACHE_TTL_SECONDS = 600;
const cache = new node_cache_1.default({ stdTTL: exports.CACHE_TTL_SECONDS, checkperiod: 120 });
exports.default = cache;
//# sourceMappingURL=cache.js.map
//# debugId=0915d5bb-7850-508f-acbf-d4b28b2c856b
