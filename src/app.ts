import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import bookRoutes from "./routes/book.route";
import reviewRoutes from "./routes/review.route";

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/v1/books", bookRoutes);
app.use("/v1/books/:bookId/reviews", reviewRoutes);


export default app;
