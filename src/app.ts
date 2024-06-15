import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db";
import logger from "./config/logger";
import AppError from "./middlewares/errorHandling";
import errorMiddleware from "./middlewares/errorMiddleware";


const app = express();

(async () => {

  await connectDB();
  logger.info("Database connected");


  app.use(morgan("dev"));
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));



  app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

  app.use(errorMiddleware);
})();

export default app;
