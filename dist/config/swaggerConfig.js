"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f0da1660-e5aa-518e-91f6-466236debfb8")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDef_1 = __importDefault(require("./swaggerDef"));
const options = {
    swaggerDefinition: swaggerDef_1.default,
    apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
//# sourceMappingURL=swaggerConfig.js.map
//# debugId=f0da1660-e5aa-518e-91f6-466236debfb8
