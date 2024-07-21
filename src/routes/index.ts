import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../config/swaggerConfig";
import authorRoutes from "./authorRoutes";
import baseUrlRoutes from "./baseUrlRoutes";
import bookRoutes from "./bookRoutes";
import genreRoutes from "./genreRoutes";
import healthRoutes from "./healthRoutes";
import metricsRoutes from "./metricsRoutes";
import paymentRoutes from "./paymentRoutes";
import publisherRoutes from "./publisherRoutes";
import reviewRoutes from "./reviewRoutes";
import sentryRoutes from "./sentryRoutes";
import subscriptionRoutes from "./subscriptionRoutes";
import userRoutes from "./userRoutes";
import cacheRoutes from "./cacheRoutes";
import cookieRoutes from "./cookieRoutes";

const router = express.Router();
const apiV1Router = express.Router();

apiV1Router.use("/", baseUrlRoutes);
apiV1Router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
apiV1Router.use("/health", healthRoutes);
apiV1Router.use("/auth", userRoutes);
apiV1Router.use("/authors", authorRoutes);
apiV1Router.use("/books", bookRoutes);
apiV1Router.use("/genres", genreRoutes);
apiV1Router.use("/publishers", publisherRoutes);
apiV1Router.use("/reviews", reviewRoutes);
apiV1Router.use("/subscriptions", subscriptionRoutes);
apiV1Router.use("/payments", paymentRoutes);
apiV1Router.use("/cache", cacheRoutes);
apiV1Router.use("/cookies", cookieRoutes); 
apiV1Router.use(metricsRoutes);
apiV1Router.use(sentryRoutes);

router.use("/api/v1", apiV1Router);

export default router;
