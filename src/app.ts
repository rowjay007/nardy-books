import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import bookRoutes from "./routes/book.route";

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/v1", bookRoutes);

export default app;
