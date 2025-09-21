import type { Request, Response, NextFunction } from "express"
import { LoggerService } from '../../../infrastructure/logger/logger.service'
import { LoggingUtils } from '../../../infrastructure/logger/utils/logging.utils'
import { AuthenticatedRequest } from "../../interfaces/auth.interfaces";
import { AppError } from "../../interfaces/logs.interfaces";


export const errorHandler = (error: AppError, req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const logger = LoggerService.getInstance();
    const traceId = req.traceId || LoggingUtils.generateCorrelationId();
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    const isDev = process.env.NODE_ENV === "development";

    // Enhanced logging with context
    logger.error('Request error occurred', error, {
        traceId,
        userId: req.user?.userId,
        method: req.method,
        url: req.originalUrl,
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent'),
        statusCode
    });

    // Log suspicious activity for certain error types
    if (error.name === 'ValidationError' || error.message.includes('UNAUTHORIZED')) {
        LoggingUtils.logSuspiciousActivity(
            `Error: ${error.name} - ${error.message}`,
            req.user?.userId || 'anonymous',
            'MEDIUM',
            req.ip
        );
    }

    // Log critical errors as system alerts
    if (statusCode >= 500) {
        LoggingUtils.logSystemAlert(
            'ERROR',
            `Critical error in ${req.method} ${req.originalUrl}: ${error.message}`,
            {
                traceId,
                userId: req.user?.userId,
                severity: 'HIGH',
                component: 'ERROR_HANDLER'
            }
        );
    }

    res.status(statusCode).json({
        success: false,
        message: isDev ? message : (statusCode >= 500 ? 'Internal Server Error' : message),
        traceId,
        timestamp: new Date().toISOString(),
        ...(isDev && { stack: error.stack }),
    });
}

export const notFoundHandler = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const logger = LoggerService.getInstance();
    const traceId = req.traceId || LoggingUtils.generateCorrelationId();
    
    logger.warn('Route not found', {
        traceId,
        method: req.method,
        url: req.originalUrl,
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent')
    });

    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
        traceId,
        timestamp: new Date().toISOString()
    });
}

export const validationErrorHandler = (errors: any[], req: AuthenticatedRequest, res: Response) => {
    const traceId = req.traceId || LoggingUtils.generateCorrelationId();
    
    LoggingUtils.logValidationErrors(
        `${req.method} ${req.originalUrl}`,
        errors,
        {
            traceId,
            userId: req.user?.userId,
            ip: req.ip
        }
    );

    res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
        traceId,
        timestamp: new Date().toISOString()
    });
}
