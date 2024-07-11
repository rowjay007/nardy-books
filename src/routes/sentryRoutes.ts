import express from "express";

const router = express.Router();

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

export default router;
