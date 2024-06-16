import express from "express";
import userRoutes from "./userRoutes";

const router = express.Router();

const apiV1Router = express.Router();

apiV1Router.use("/users", userRoutes);

router.use("/api/v1", apiV1Router);

export default router;
