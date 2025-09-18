import { LoggerService } from '../logger.service';
import { LogContext } from '../../interfaces/logger.interfaces';
import { LoggingUtils } from '../utils/logging.utils';

/**
 * Method decorator for automatic logging of method entry, exit, and errors
 */
export function LogMethod(context?: Partial<LogContext>) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        const logger = LoggerService.getInstance();

        descriptor.value = async function (...args: any[]) {
            const startTime = Date.now();
            const className = target.constructor.name;
            const methodName = propertyKey;
            const traceId = LoggingUtils.generateCorrelationId();
            
            const logContext: LogContext = {
                component: className,
                operation: methodName,
                traceId,
                ...context
            };

            logger.debug(`Entering method ${className}.${methodName}`, {
                ...logContext
            } as any);

            try {
                const result = await originalMethod.apply(this, args);
                const duration = Date.now() - startTime;
                
                logger.debug(`Exiting method ${className}.${methodName}`, {
                    ...logContext,
                    duration
                } as any);

                return result;
            } catch (error) {
                const duration = Date.now() - startTime;
                
                logger.error(`Error in method ${className}.${methodName}`, error as Error, {
                    ...logContext,
                    duration
                } as any);

                throw error;
            }
        };

        return descriptor;
    };
}

/**
 * Decorator for logging business operations with audit trail
 */
export function LogBusinessOperation(entityType: string, action?: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        const logger = LoggerService.getInstance();

        descriptor.value = async function (...args: any[]) {
            const startTime = Date.now();
            const className = target.constructor.name;
            const traceId = LoggingUtils.generateCorrelationId();
            const operationAction = action || propertyKey.toUpperCase();

            // Extract entity ID and user ID from arguments if possible
            const entityId = args[0]?.id || args[0] || 'unknown';
            const userId = this.userId || (args.find((arg: any) => arg?.userId))?.userId || 'system';

            logger.debug(`Business operation started: ${operationAction} on ${entityType}`, {
                component: className,
                operation: propertyKey,
                traceId
            } as any);

            try {
                const result = await originalMethod.apply(this, args);
                const duration = Date.now() - startTime;

                // Log successful business operation
                LoggingUtils.logBusinessOperation(
                    entityType,
                    String(entityId),
                    operationAction,
                    String(userId)
                );

                logger.debug(`Business operation completed: ${operationAction} on ${entityType}`, {
                    component: className,
                    operation: propertyKey,
                    duration,
                    traceId
                } as any);

                return result;
            } catch (error) {
                const duration = Date.now() - startTime;
                
                logger.error(`Business operation failed: ${operationAction} on ${entityType}`, error as Error, {
                    component: className,
                    operation: propertyKey,
                    duration,
                    traceId
                } as any);

                throw error;
            }
        };

        return descriptor;
    };
}
