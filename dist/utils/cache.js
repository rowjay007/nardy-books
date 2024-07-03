"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="d2df4aa4-0609-57b6-8929-d0ae0c3db25d")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flushCache = exports.delCache = exports.getCache = exports.setCache = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const cache = new node_cache_1.default({ stdTTL: 100, checkperiod: 120 });
const setCache = (key, value, ttl = 100) => {
    cache.set(key, value, ttl);
};
exports.setCache = setCache;
const getCache = (key) => {
    return cache.get(key);
};
exports.getCache = getCache;
const delCache = (key) => {
    cache.del(key);
};
exports.delCache = delCache;
const flushCache = () => {
    cache.flushAll();
};
exports.flushCache = flushCache;
//# sourceMappingURL=cache.js.map
//# debugId=d2df4aa4-0609-57b6-8929-d0ae0c3db25d
