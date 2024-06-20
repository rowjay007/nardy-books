import express from "express";
import userRoutes from "./userRoutes";
import authorRoutes from "./authorRoutes";
import bookRoutes from "./bookRoutes";
import genreRoutes from "./genreRoutes";
import publisherRoutes from "./publisherRoutes";
import reviewRoutes from "./reviewRoutes";

const router = express.Router();
const apiV1Router = express.Router();

apiV1Router.use("/users", userRoutes);
apiV1Router.use("/authors", authorRoutes);
apiV1Router.use("/books", bookRoutes);
apiV1Router.use("/genres", genreRoutes);
apiV1Router.use("/publishers", publisherRoutes);
apiV1Router.use("/reviews", reviewRoutes);

router.use("/api/v1", apiV1Router);

export default router;
