import express from "express";

const router = express.Router();

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

export default router;
