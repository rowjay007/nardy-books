"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="062ae3d6-b3b7-594c-9cac-c46b01b1cd84")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Sentry
 *   description: Sentry error handling
 */
/**
 * @swagger
 * /debug-sentry:
 *   get:
 *     summary: Trigger a Sentry error for debugging
 *     tags: [Sentry]
 *     responses:
 *       500:
 *         description: Sentry error triggered
 */
router.get("/debug-sentry", (req, res) => {
    throw new Error("Nardy Book Sentry error!");
});
exports.default = router;
//# sourceMappingURL=sentryRoutes.js.map
//# debugId=062ae3d6-b3b7-594c-9cac-c46b01b1cd84
