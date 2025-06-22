import swaggerJSDoc from 'swagger-jsdoc';

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
    },
    apis: [
        './src/interfaces/http/routes/**/*.ts', // points to your route definitions with swagger comments
        './src/application/dtos/**/*.ts',
    ],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
