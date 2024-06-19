import express from "express";
import userRoutes from "./userRoutes";
import authorRoutes from "./authorRoutes";
import bookRoutes from "./bookRoutes";

const router = express.Router();

const apiV1Router = express.Router();

apiV1Router.use("/users", userRoutes);
apiV1Router.use("/authors", authorRoutes);
apiV1Router.use("/books", bookRoutes);

router.use("/api/v1", apiV1Router);

export default router;
