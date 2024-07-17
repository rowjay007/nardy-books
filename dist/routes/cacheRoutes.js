"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="fa663e11-a157-5fff-8e5a-b3135de9130e")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cache_1 = __importDefault(require("../utils/cache"));
const router = express_1.default.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Cache:
 *       type: object
 *       properties:
 *         key:
 *           type: string
 *           description: The key of the cache entry
 *         value:
 *           type: object
 *           description: The value of the cache entry
 */
/**
 * @swagger
 * tags:
 *   name: Cache
 *   description: Cache management
 */
/**
 * @swagger
 * /cache:
 *   get:
 *     summary: Get all cache entries
 *     tags: [Cache]
 *     responses:
 *       200:
 *         description: A list of cache entries
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 $ref: '#/components/schemas/Cache'
 *       500:
 *         description: Some server error
 */
router.get("/", (req, res) => {
    const keys = cache_1.default.keys();
    const cacheContents = {};
    keys.forEach((key) => {
        cacheContents[key] = cache_1.default.get(key);
    });
    res.status(200).json({
        status: "success",
        data: cacheContents,
    });
});
/**
 * @swagger
 * /cache:
 *   delete:
 *     summary: Clear all cache entries
 *     tags: [Cache]
 *     responses:
 *       200:
 *         description: Cache cleared successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Cache cleared
 *       500:
 *         description: Some server error
 */
router.delete("/", (req, res) => {
    cache_1.default.flushAll();
    res.status(200).json({
        status: "success",
        message: "Cache cleared",
    });
});
exports.default = router;
//# sourceMappingURL=cacheRoutes.js.map
//# debugId=fa663e11-a157-5fff-8e5a-b3135de9130e
