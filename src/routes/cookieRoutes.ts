import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const myCookie = req.cookies["myCookie"];
  if (myCookie) {
    res.status(200).json({
      status: "success",
      data: { myCookie },
    });
  } else {
    res.status(404).json({
      status: "error",
      message: "No cookie found",
    });
  }
});

router.post("/", (req: Request, res: Response) => {
  const { value } = req.body;
  res.cookie("myCookie", value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    status: "success",
    message: "Cookie has been set",
  });
});

router.delete("/", (req: Request, res: Response) => {
  res.clearCookie("myCookie");
  res.status(200).json({
    status: "success",
    message: "Cookie has been deleted",
  });
});

export default router;
