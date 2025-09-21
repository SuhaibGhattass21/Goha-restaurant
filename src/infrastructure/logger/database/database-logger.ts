import { LoggerService } from '../logger.service';
import { LoggingUtils } from '../utils/logging.utils';

export class DatabaseLogger {
    private static logger = LoggerService.getInstance();
    private static slowQueryThreshold = 1000; // 1 second

    /**
     * Logs database queries with performance monitoring
     */
    static logQuery(
        query: string,
        parameters: any[] = [],
        startTime: number,
        tableName?: string,
        userId?: string
    ): void {
        const duration = Date.now() - startTime;
        
        // Log all queries in debug mode
        DatabaseLogger.logger.debug('Database query executed', {
            query: query.length > 500 ? `${query.substring(0, 500)}...` : query,
            parameters: parameters.length > 0 ? LoggingUtils.sanitizeData(parameters) : undefined,
            duration,
            table: tableName,
            userId
        } as any);

        // Log slow queries as warnings
        if (duration > DatabaseLogger.slowQueryThreshold) {
            LoggingUtils.logSlowQuery(query, duration, tableName, { userId });
        }
    }

    /**
     * Logs database errors
     */
    static logError(
        query: string,
        error: Error,
        parameters: any[] = [],
        tableName?: string,
        userId?: string
    ): void {
        DatabaseLogger.logger.error('Database query failed', error, {
            query: query.length > 500 ? `${query.substring(0, 500)}...` : query,
            parameters: parameters.length > 0 ? LoggingUtils.sanitizeData(parameters) : undefined,
            table: tableName,
            userId,
            errorCode: (error as any).code,
            errorDetail: (error as any).detail
        } as any);
    }

    /**
     * Logs database connection events
     */
    static logConnection(event: 'CONNECT' | 'DISCONNECT' | 'ERROR', details?: any): void {
        const message = `Database ${event.toLowerCase()}`;
        
        if (event === 'ERROR') {
            DatabaseLogger.logger.error(message, details, {
                component: 'DATABASE',
                operation: event
            });
        } else {
            DatabaseLogger.logger.info(message, {
                component: 'DATABASE',
                operation: event,
                ...details
            });
        }
    }

    /**
     * Logs transaction events
     */
    static logTransaction(
        event: 'START' | 'COMMIT' | 'ROLLBACK',
        transactionId?: string,
        userId?: string,
        reason?: string
    ): void {
        const message = `Database transaction ${event.toLowerCase()}`;
        
        DatabaseLogger.logger.info(message, {
            component: 'DATABASE',
            operation: `TRANSACTION_${event}`,
            userId,
            traceId: transactionId
        } as any);
    }

    /**
     * Creates a query timer for performance monitoring
     */
    static createQueryTimer(query: string, tableName?: string, userId?: string): () => void {
        const startTime = Date.now();
        
        return () => {
            DatabaseLogger.logQuery(query, [], startTime, tableName, userId);
        };
    }

    /**
     * Sets the slow query threshold
     */
    static setSlowQueryThreshold(milliseconds: number): void {
        DatabaseLogger.slowQueryThreshold = milliseconds;
        DatabaseLogger.logger.info('Slow query threshold updated', {
            component: 'DATABASE',
            operation: 'CONFIG_UPDATE'
        } as any);
    }
}
