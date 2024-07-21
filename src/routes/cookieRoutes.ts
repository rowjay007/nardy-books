import express from "express";
import { Request, Response } from "express";

const router = express.Router();

router.get("/set-cookie", (req: Request, res: Response) => {
  res.cookie("myCookie", "cookieValue", {
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production", 
    maxAge: 24 * 60 * 60 * 1000, 
  });
  res.send("Cookie has been set");
});

router.get("/get-cookie", (req: Request, res: Response) => {
  const myCookie = req.cookies["myCookie"];
  if (myCookie) {
    res.send(`Cookie value: ${myCookie}`);
  } else {
    res.send("No cookie found");
  }
});

router.get("/delete-cookie", (req: Request, res: Response) => {
  res.clearCookie("myCookie");
  res.send("Cookie has been deleted");
});

export default router;
