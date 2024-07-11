import express, { Request, Response } from "express";
import cache from "../utils/cache";

const router = express.Router();

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
router.get("/", (req: Request, res: Response) => {
  const keys = cache.keys();
  const cacheContents: Record<string, any> = {};

  keys.forEach((key) => {
    cacheContents[key] = cache.get(key);
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
router.delete("/", (req: Request, res: Response) => {
  cache.flushAll();
  res.status(200).json({
    status: "success",
    message: "Cache cleared",
  });
});

export default router;
