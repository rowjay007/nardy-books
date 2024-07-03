import express from "express";

const router = express.Router();

router.get("/debug-sentry", (req, res) => {
  throw new Error("Nardy Book Sentry error!");
});

export default router;
