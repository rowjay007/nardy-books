"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="d640d3f1-71a5-5c73-9993-3d4a408c84d8")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueReference = void 0;
const uuid_1 = require("uuid");
const generateUniqueReference = (prefix) => {
    const uuid = (0, uuid_1.v4)().replace(/-/g, "").substring(0, 8);
    return `${prefix}${uuid}`;
};
exports.generateUniqueReference = generateUniqueReference;
//# sourceMappingURL=referenceTag.js.map
//# debugId=d640d3f1-71a5-5c73-9993-3d4a408c84d8
