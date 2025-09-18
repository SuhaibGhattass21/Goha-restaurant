import { LoggerService } from '../logger.service';
import { LogContext, SecurityLogContext } from '../../interfaces/logger.interfaces';

export class LoggingUtils {
    private static logger = LoggerService.getInstance();

    /**
     * Creates a request-scoped logger with trace ID
     */
    static createRequestLogger(traceId: string, userId?: string): LoggerService {
        return LoggingUtils.logger.createChildLogger({
            traceId,
            userId
        });
    }

    /**
     * Logs authentication events
     */
    static logAuthEvent(
        event: 'LOGIN_ATTEMPT' | 'LOGIN_SUCCESS' | 'LOGIN_FAILURE' | 'LOGOUT',
        username: string,
        ip: string,
        userAgent?: string,
        additionalContext?: any
    ): void {
        const context: SecurityLogContext = {
            securityEvent: event as any,
            riskLevel: event === 'LOGIN_FAILURE' ? 'MEDIUM' : 'LOW',
            ip,
            userAgent,
            ...additionalContext
        };

        const message = `Authentication event: ${event} for user ${username}`;
        LoggingUtils.logger.logSecurityEvent(message, context);
    }

    /**
     * Logs authorization events
     */
    static logAuthorizationEvent(
        event: 'PERMISSION_DENIED' | 'UNAUTHORIZED_ACCESS',
        userId: string,
        resource: string,
        requiredPermission?: string,
        ip?: string
    ): void {
        const context: SecurityLogContext = {
            userId,
            securityEvent: event,
            riskLevel: 'MEDIUM',
            resource,
            permission: requiredPermission,
            ip
        };

        const message = `Authorization event: ${event} for user ${userId} on resource ${resource}`;
        LoggingUtils.logger.logSecurityEvent(message, context);
    }

    /**
     * Logs API access for monitoring and analytics
     */
    static logApiAccess(
        method: string,
        url: string,
        statusCode: number,
        duration: number,
        userId?: string,
        ip?: string,
        userAgent?: string
    ): void {
        const context = {
            method,
            url,
            statusCode,
            duration,
            userId,
            ip,
            userAgent
        };

        const message = `API Access: ${method} ${url} - ${statusCode} (${duration}ms)`;
        LoggingUtils.logger.logHttpRequest(message, context);
    }

    /**
     * Logs slow queries for performance monitoring
     */
    static logSlowQuery(
        query: string,
        duration: number,
        tableName?: string,
        context?: LogContext
    ): void {
        const message = `Slow query detected on table ${tableName || 'unknown'} (${duration}ms)`;
        LoggingUtils.logger.warn(message, {
            operation: 'SQL_QUERY',
            duration,
            component: 'DATABASE',
            ...context
        } as any);
    }

    /**
     * Logs validation errors with detailed context
     */
    static logValidationErrors(
        operation: string,
        errors: any[],
        context?: LogContext
    ): void {
        const message = `Validation errors in ${operation}`;
        LoggingUtils.logger.logValidationError(message, errors, context);
    }

    /**
     * Logs business operations for audit trail
     */
    static logBusinessOperation(
        entityType: string,
        entityId: string,
        action: string,
        userId: string,
        previousState?: any,
        newState?: any
    ): void {
        const message = `Business operation: ${action} on ${entityType} (${entityId})`;
        LoggingUtils.logger.logBusinessOperation(message, {
            entityType,
            entityId,
            action,
            userId,
            previousState,
            newState
        });
    }

    /**
     * Logs system alerts for monitoring
     */
    static logSystemAlert(
        alertType: 'ERROR' | 'WARNING' | 'CRITICAL' | 'INFO',
        message: string,
        context?: any
    ): void {
        switch (alertType) {
            case 'CRITICAL':
            case 'ERROR':
                LoggingUtils.logger.error(`ALERT: ${message}`, undefined, context);
                break;
            case 'WARNING':
                LoggingUtils.logger.warn(`ALERT: ${message}`, context);
                break;
            default:
                LoggingUtils.logger.info(`ALERT: ${message}`, context);
        }
    }

    /**
     * Logs suspicious activities for security monitoring
     */
    static logSuspiciousActivity(
        activity: string,
        userId: string,
        riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL',
        ip?: string,
        additionalContext?: any
    ): void {
        const context: SecurityLogContext = {
            userId,
            securityEvent: 'SUSPICIOUS_ACTIVITY',
            riskLevel,
            ip,
            ...additionalContext
        };

        const message = `Suspicious activity detected: ${activity} by user ${userId}`;
        LoggingUtils.logger.logSecurityEvent(message, context);
    }

    /**
     * Sanitizes sensitive data before logging
     */
    static sanitizeData(data: any): any {
        if (!data || typeof data !== 'object') {
            return data;
        }

        const sensitiveFields = [
            'password',
            'token',
            'secret',
            'key',
            'authorization',
            'credit_card',
            'ssn',
            'social_security',
            'pin',
            'cvv',
            'api_key',
            'private_key'
        ];

        function sanitizeObject(obj: any): any {
            if (Array.isArray(obj)) {
                return obj.map(item => sanitizeObject(item));
            }

            if (obj && typeof obj === 'object') {
                const result: any = {};
                for (const [key, value] of Object.entries(obj)) {
                    if (sensitiveFields.some(field => key.toLowerCase().includes(field))) {
                        result[key] = '[REDACTED]';
                    } else if (typeof value === 'object') {
                        result[key] = sanitizeObject(value);
                    } else {
                        result[key] = value;
                    }
                }
                return result;
            }

            return obj;
        }

        return sanitizeObject(data);
    }

    /**
     * Creates a performance timer
     */
    static createTimer(operation: string, context?: LogContext): () => void {
        const startTime = Date.now();
        
        return () => {
            const duration = Date.now() - startTime;
            LoggingUtils.logger.logPerformance(`Performance: ${operation}`, {
                operation,
                duration,
                ...context
            });
        };
    }

    /**
     * Creates correlation ID for tracking requests across services
     */
    static generateCorrelationId(): string {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
}