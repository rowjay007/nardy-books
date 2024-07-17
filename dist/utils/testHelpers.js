"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="b5870c6d-6d34-5091-8fa2-2b68ffdb038a")}catch(e){}}();

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
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
    };
    return res;
};
exports.mockResponse = mockResponse;
//# sourceMappingURL=testHelpers.js.map
//# debugId=b5870c6d-6d34-5091-8fa2-2b68ffdb038a
