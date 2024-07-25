"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="c29592c8-2754-584e-8141-1b200664c3f1")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = (fn) => (req, res, next) => {
    fn(req, res, next).catch(next);
};
exports.default = catchAsync;
//# sourceMappingURL=catchAsync.js.map
//# debugId=c29592c8-2754-584e-8141-1b200664c3f1
