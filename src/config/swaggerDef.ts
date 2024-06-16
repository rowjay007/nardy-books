// swaggerDef.ts
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Booking Management API",
    version: "1.0.0",
    description: "API documentation for the booking management system.",
  },
  servers: [
    {
      url: "/api/v1",
    },
  ],
};

export default swaggerDefinition;