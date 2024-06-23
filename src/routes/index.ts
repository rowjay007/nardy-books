import express from "express";
import authorRoutes from "./authorRoutes";
import bookRoutes from "./bookRoutes";
import genreRoutes from "./genreRoutes";
import paymentRoutes from "./paymentRoutes";
import publisherRoutes from "./publisherRoutes";
import reviewRoutes from "./reviewRoutes";
import subscriptionRoutes from "./subscriptionRoutes";
import userRoutes from "./userRoutes";
import notificationRoutes from "./notificationRoutes";

const router = express.Router();
const apiV1Router = express.Router();

apiV1Router.use("/users", userRoutes);
apiV1Router.use("/authors", authorRoutes);
apiV1Router.use("/books", bookRoutes);
apiV1Router.use("/genres", genreRoutes);
apiV1Router.use("/publishers", publisherRoutes);
apiV1Router.use("/reviews", reviewRoutes);
apiV1Router.use("/subscriptions", subscriptionRoutes);
apiV1Router.use("/payments", paymentRoutes);
apiV1Router.use("/notifications", notificationRoutes);

router.use("/api/v1", apiV1Router);

export default router;
