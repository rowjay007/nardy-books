import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("Health route accessed");
  res.json({ message: "Health check endpoint up and running" });
});

export default router;
