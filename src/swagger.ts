
// src/swagger.ts
import swaggerJsDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Booking Management API',
            version: '1.0.0',
            description: 'API documentation for a booking management system.',
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
                description: 'Local server',
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Path to the route files where JSDoc comments are added for API endpoints
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
