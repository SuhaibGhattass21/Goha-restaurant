"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = exports.swaggerOptions = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const dto_swagger_schemas_1 = require("./schemas/dto-swagger.schemas");
exports.swaggerOptions = {
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
            schemas: dto_swagger_schemas_1.swaggerSchemas,
        }
    },
    apis: [
        './src/interfaces/config/swagger/schemas/*.ts',
        './src/interfaces/config/swagger/schemas/dto-swagger.schemas.ts',
    ],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(exports.swaggerOptions);
//# sourceMappingURL=swagger.config.js.map