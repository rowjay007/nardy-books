import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import limiter from "./config/rateLimiter";
import compression from "compression";
import errorMiddleware from "./middlewares/errorMiddleware";
import router from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swaggerConfig";
import AppError from "./utils/appError";

const app = express();



app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(limiter); 

app.use(router);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorMiddleware);

export default app;
