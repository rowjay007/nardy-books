import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to Nardy Book Management API",
    maintainedBy: "Rowland Adimoha",
  });
});

export default router;
