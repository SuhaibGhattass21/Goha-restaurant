import { LoggerService } from '../../../infrastructure/logger/logger.service';
import { LoggingUtils } from '../../../infrastructure/logger/utils/logging.utils';
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        username: string;
        permissions: string[];
    };
    traceId?: string;
    startTime?: number;
}

export class PerformanceMiddleware {
    private static logger = LoggerService.getInstance();
    private static slowRequestThreshold = 5000; // 5 seconds
    private static warnRequestThreshold = 2000; // 2 seconds

    static trackPerformance = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        req.startTime = Date.now();
        const traceId = req.traceId || LoggingUtils.generateCorrelationId();
        req.traceId = traceId;

        // Log request start
        PerformanceMiddleware.logger.debug('Request started', {
            traceId,
            method: req.method,
            url: req.originalUrl,
            userId: req.user?.userId,
            ip: req.ip || req.connection.remoteAddress,
            userAgent: req.get('User-Agent')
        });

        // Monitor response
        res.on('finish', () => {
            const duration = Date.now() - (req.startTime || Date.now());
            
            // Log performance metrics
            PerformanceMiddleware.logger.logPerformance('Request completed', {
                traceId,
                method: req.method,
                url: req.originalUrl,
                statusCode: res.statusCode,
                duration,
                operation: `${req.method} ${req.originalUrl}`,
                userId: req.user?.userId
            });

            // Log slow requests
            if (duration > PerformanceMiddleware.slowRequestThreshold) {
                LoggingUtils.logSystemAlert(
                    'WARNING',
                    `Very slow request detected: ${req.method} ${req.originalUrl} took ${duration}ms`,
                    {
                        traceId,
                        duration,
                        userId: req.user?.userId,
                        severity: 'HIGH',
                        component: 'PERFORMANCE_MONITOR'
                    }
                );
            } else if (duration > PerformanceMiddleware.warnRequestThreshold) {
                PerformanceMiddleware.logger.warn('Slow request detected', {
                    traceId,
                    method: req.method,
                    url: req.originalUrl,
                    duration,
                    userId: req.user?.userId
                });
            }

            // Log API access metrics
            LoggingUtils.logApiAccess(
                req.method,
                req.originalUrl,
                res.statusCode,
                duration,
                req.user?.userId,
                req.ip,
                req.get('User-Agent')
            );
        });

        next();
    };

    static memoryUsage = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const memBefore = process.memoryUsage();
        
        res.on('finish', () => {
            const memAfter = process.memoryUsage();
            const memDiff = {
                rss: memAfter.rss - memBefore.rss,
                heapUsed: memAfter.heapUsed - memBefore.heapUsed,
                heapTotal: memAfter.heapTotal - memBefore.heapTotal,
                external: memAfter.external - memBefore.external
            };

            // Log significant memory usage
            if (memDiff.heapUsed > 50 * 1024 * 1024) { // 50MB
                PerformanceMiddleware.logger.warn('High memory usage detected', {
                    traceId: req.traceId,
                    method: req.method,
                    url: req.originalUrl,
                    userId: req.user?.userId
                } as any);
            }
        });

        next();
    };
}
