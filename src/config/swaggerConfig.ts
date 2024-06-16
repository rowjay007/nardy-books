import swaggerJsdoc from "swagger-jsdoc";
import swaggerDefinition from "./swaggerDef";

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts", "./src/models/*.ts"], 
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
