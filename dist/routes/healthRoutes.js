"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="d69b70e2-986f-52c0-a220-38be54aa5f8a")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Health check
 */
/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Health check endpoint up and running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Health check endpoint up and running
 */
router.get("/", (req, res) => {
    console.log("Health route accessed");
    res.json({ message: "Health check endpoint up and running" });
});
exports.default = router;
//# sourceMappingURL=healthRoutes.js.map
//# debugId=d69b70e2-986f-52c0-a220-38be54aa5f8a
