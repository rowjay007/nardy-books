"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="b93b2071-373c-5c11-908f-cfd5f8849638")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
exports.default = catchAsync;
//# sourceMappingURL=catchAsync.js.map
//# debugId=b93b2071-373c-5c11-908f-cfd5f8849638
