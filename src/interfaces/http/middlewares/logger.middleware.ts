import { LoggerService } from '@infrastructure/logger/logger.service';
import { Request, Response, NextFunction } from 'express';

export class LoggingMiddleware {
    private logger: LoggerService;

    constructor() {
        this.logger = new LoggerService();
    }

    logRequest = (req: Request, res: Response, next: NextFunction) => {
        const start = Date.now();

        this.logger.info('Incoming request', {
            method: req.method,
            url: req.url,
            userAgent: req.get('User-Agent'),
            ip: req.ip,
            userId: (req as any).user?.id || 'anonymous'
        });

        res.on('finish', () => {
            const duration = Date.now() - start;

            this.logger.info('Request completed', {
                method: req.method,
                url: req.url,
                statusCode: res.statusCode,
                duration: `${duration}ms`,
                userId: (req as any).user?.id || 'anonymous'
            });
        });

        next();
    };
}