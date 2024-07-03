"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="2fcef5cb-79be-5277-a0fa-a0d16d43464c")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Booking Management API",
        version: "1.0.0",
        description: "API documentation for the booking management system.",
    },
    servers: [
        {
            url: "http://localhost:3001/api/v1",
            description: "Development server",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        }
    },
    security: [{ bearerAuth: [] }],
};
exports.default = swaggerDefinition;
//# sourceMappingURL=swaggerDef.js.map
//# debugId=2fcef5cb-79be-5277-a0fa-a0d16d43464c
