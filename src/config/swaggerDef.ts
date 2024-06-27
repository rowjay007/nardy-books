const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Booking Management API",
    version: "1.0.0",
    description: "API documentation for the booking management system.",
  },
  servers: [
    {
      url: "http://localhost:3001/api/v1",
      description: "Development server",
    },
  ],
  components: { 
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    }
  },
   security: [{ bearerAuth: [] }],
};

export default swaggerDefinition;