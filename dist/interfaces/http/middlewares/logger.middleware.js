"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingMiddleware = void 0;
const logger_service_1 = require("@infrastructure/logger/logger.service");
class LoggingMiddleware {
    constructor() {
        this.logRequest = (req, res, next) => {
            const start = Date.now();
            this.logger.info('Incoming request', {
                method: req.method,
                url: req.url,
                userAgent: req.get('User-Agent'),
                ip: req.ip,
                userId: req.user?.id || 'anonymous'
            });
            res.on('finish', () => {
                const duration = Date.now() - start;
                this.logger.info('Request completed', {
                    method: req.method,
                    url: req.url,
                    statusCode: res.statusCode,
                    duration: `${duration}ms`,
                    userId: req.user?.id || 'anonymous'
                });
            });
            next();
        };
        this.logger = new logger_service_1.LoggerService();
    }
}
exports.LoggingMiddleware = LoggingMiddleware;
//# sourceMappingURL=logger.middleware.js.map