import express, { Request, Response } from "express";
import cache from "../utils/cache";

const router = express.Router();

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

router.delete("/", (req: Request, res: Response) => {
  cache.flushAll();
  res.status(200).json({
    status: "success",
    message: "Cache cleared",
  });
});

export default router;
