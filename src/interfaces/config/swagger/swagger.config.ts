import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerSchemas } from './schemas/dto-swagger.schemas';

export const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Goha Restaurant System API',
            version: '1.0.0',
            description: 'API documentation for Goha Restaurant Management System',
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
                description: 'Development server',
            },
        ],
        components: {
            schemas: swaggerSchemas,
        }
    },
    apis: [
        './src/interfaces/config/swagger/schemas/*.ts',
        './src/interfaces/config/swagger/schemas/dto-swagger.schemas.ts',
    ],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
