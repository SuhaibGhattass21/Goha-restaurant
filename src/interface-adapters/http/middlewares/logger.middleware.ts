import { LoggerService } from '../../../infrastructure/logger/logger.service';
import { LoggingUtils } from '../../../infrastructure/logger/utils/logging.utils';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        username: string;
        permissions: string[];
    };
    traceId?: string;
    logger?: LoggerService;
}

export class LoggingMiddleware {
    private logger: LoggerService;

    constructor() {
        this.logger = LoggerService.getInstance();
    }

    // Enhanced request logging with trace ID and performance monitoring
    logRequest = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const startTime = Date.now();
        const traceId = uuidv4();
        
        // Add trace ID to request for downstream use
        req.traceId = traceId;
        req.logger = LoggingUtils.createRequestLogger(traceId, req.user?.userId);

        // Add trace ID to response headers for debugging
        res.setHeader('X-Trace-ID', traceId);

        // Log incoming request
        this.logger.logHttpRequest('Incoming HTTP request', {
            traceId,
            method: req.method,
            url: req.originalUrl,
            userAgent: req.get('User-Agent'),
            ip: req.ip || req.connection.remoteAddress,
            userId: req.user?.userId || 'anonymous',
            duration: 0,
            statusCode: 0
        });

        // Log request body for POST/PUT/PATCH (sanitized)
        if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
            this.logger.debug('Request body', {
                traceId,
                body: LoggingUtils.sanitizeData(req.body),
                contentType: req.get('Content-Type')
            } as any);
        }

        // Log query parameters
        if (Object.keys(req.query).length > 0) {
            this.logger.debug('Query parameters', {
                traceId,
                query: req.query
            } as any);
        }

        res.on('finish', () => {
            const duration = Date.now() - startTime;

            // Log completed request
            LoggingUtils.logApiAccess(
                req.method,
                req.originalUrl,
                res.statusCode,
                duration,
                req.user?.userId,
                req.ip || req.connection.remoteAddress,
                req.get('User-Agent')
            );

            // Log slow requests
            if (duration > 5000) {
                this.logger.warn('Slow HTTP request detected', {
                    traceId,
                    method: req.method,
                    url: req.originalUrl,
                    duration,
                    statusCode: res.statusCode,
                    userId: req.user?.userId
                });
            }

            // Log errors (4xx/5xx status codes)
            if (res.statusCode >= 400) {
                const logLevel = res.statusCode >= 500 ? 'error' : 'warn';
                const message = `HTTP ${res.statusCode} response`;
                
                if (logLevel === 'error') {
                    this.logger.error(message, undefined, {
                        traceId,
                        method: req.method,
                        url: req.originalUrl,
                        statusCode: res.statusCode,
                        duration,
                        userId: req.user?.userId,
                        ip: req.ip || req.connection.remoteAddress
                    });
                } else {
                    this.logger.warn(message, {
                        traceId,
                        method: req.method,
                        url: req.originalUrl,
                        statusCode: res.statusCode,
                        duration,
                        userId: req.user?.userId,
                        ip: req.ip || req.connection.remoteAddress
                    });
                }
            }
        });

        next();
    };

    // Middleware to log authentication events
    logAuthEvent = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const originalJson = res.json;
        
        res.json = function(data: any) {
            // Log authentication events based on response
            if (req.path.includes('/auth/login')) {
                const event = res.statusCode === 200 ? 'LOGIN_SUCCESS' : 'LOGIN_FAILURE';
                LoggingUtils.logAuthEvent(
                    event,
                    req.body?.username || 'unknown',
                    req.ip || req.connection.remoteAddress || 'unknown',
                    req.get('User-Agent')
                );
            }
            
            return originalJson.call(this, data);
        };

        next();
    };

    // Middleware to log validation errors
    logValidationErrors = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const originalJson = res.json;
        
        res.json = function(data: any) {
            if (res.statusCode === 400 && data.errors) {
                LoggingUtils.logValidationErrors(
                    `${req.method} ${req.path}`,
                    data.errors,
                    {
                        traceId: req.traceId,
                        userId: req.user?.userId,
                        url: req.originalUrl,
                        method: req.method
                    }
                );
            }
            
            return originalJson.call(this, data);
        };

        next();
    };

    // Middleware to log security events
    logSecurityEvents = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const originalJson = res.json;
        
        res.json = function(data: any) {
            // Log authorization failures
            if (res.statusCode === 403) {
                LoggingUtils.logAuthorizationEvent(
                    'PERMISSION_DENIED',
                    req.user?.userId || 'anonymous',
                    req.originalUrl,
                    data.message,
                    req.ip || req.connection.remoteAddress
                );
            }
            
            // Log unauthorized access attempts
            if (res.statusCode === 401) {
                LoggingUtils.logAuthorizationEvent(
                    'UNAUTHORIZED_ACCESS',
                    req.user?.userId || 'anonymous',
                    req.originalUrl,
                    undefined,
                    req.ip || req.connection.remoteAddress
                );
            }
            
            return originalJson.call(this, data);
        };

        next();
    };

    // Comprehensive logging middleware that combines all logging features
    comprehensive = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        this.logRequest(req, res, () => {
            this.logAuthEvent(req, res, () => {
                this.logValidationErrors(req, res, () => {
                    this.logSecurityEvents(req, res, next);
                });
            });
        });
    };
}