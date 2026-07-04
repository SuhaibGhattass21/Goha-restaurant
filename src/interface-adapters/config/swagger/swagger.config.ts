import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerSchemas } from './schemas/dto-swagger.schemas';

const defaultProtocol = process.env.HTTPS_ENABLED === 'true' ? 'https' : 'http';
const defaultServerUrl = process.env.API_URL || `${defaultProtocol}://localhost:${process.env.PORT || 3000}/api/v1`;

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
                url: defaultServerUrl,
                description: 'Development server',
            },
        ],
        components: {
            schemas: swaggerSchemas,
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter your JWT token in the format "Bearer {token}"'
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: [
        './src/interfaces/config/swagger/schemas/*.ts',
        './src/interfaces/config/swagger/schemas/dto-swagger.schemas.ts',
    ],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
