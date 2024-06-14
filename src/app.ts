import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger"; // Import the swagger configuration file

// Load environment variables
dotenv.config();

// Create an Express application instance
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route for user-related endpoints
app.use("/api/v1/users", userRoutes);

// Swagger documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Export the Express application instance for server setup
export default app;
