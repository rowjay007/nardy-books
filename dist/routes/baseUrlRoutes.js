"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="6653d28a-f8c4-5220-9132-ebc76ed4c28b")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Base
 *   description: Base endpoint
 */
/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message for the API
 *     tags: [Base]
 *     responses:
 *       200:
 *         description: Welcome message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Welcome to Nardy Book Management API"
 *                 maintainedBy:
 *                   type: string
 *                   example: "Rowland Adimoha"
 *       500:
 *         description: Some server error
 */
router.get("/", (req, res) => {
    res.status(200).send({
        message: "Welcome to Nardy Book Management API",
        maintainedBy: "Rowland Adimoha",
    });
});
exports.default = router;
//# sourceMappingURL=baseUrlRoutes.js.map
//# debugId=6653d28a-f8c4-5220-9132-ebc76ed4c28b
