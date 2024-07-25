"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="2ed4715c-69b8-5826-ba88-4b37fdee4e60")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.mockResponse = exports.mockRequest = void 0;
const mockRequest = () => ({
    body: {},
    params: {},
    query: {},
    headers: {},
});
exports.mockRequest = mockRequest;
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.cookie = jest.fn().mockReturnValue(res);
    return res;
};
exports.mockResponse = mockResponse;
//# sourceMappingURL=testHelpers.js.map
//# debugId=2ed4715c-69b8-5826-ba88-4b37fdee4e60
