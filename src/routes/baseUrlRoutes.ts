import express from "express";

const router = express.Router();

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

export default router;
