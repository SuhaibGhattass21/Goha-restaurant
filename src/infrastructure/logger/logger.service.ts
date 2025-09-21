import winston from 'winston';
import { v4 as uuidv4 } from 'uuid';
import { ILogger, LogContext, DatabaseLogContext, BusinessLogContext, SecurityLogContext } from '../interfaces/logger.interfaces';
import { loggerConfig, createTransports } from './logger.config';

export class LoggerService implements ILogger {
    private logger: winston.Logger;
    private static instance: LoggerService;

    constructor() {
        // Add custom log levels
        const customLevels = {
            levels: {
                error: 0,
                warn: 1,
                info: 2,
                http: 3,
                verbose: 4,
                debug: 5
            },
            colors: {
                error: 'red',
                warn: 'yellow',
                info: 'cyan',
                http: 'magenta',
                verbose: 'white',
                debug: 'green'
            }
        };

        winston.addColors(customLevels.colors);

        this.logger = winston.createLogger({
            level: loggerConfig.level,
            levels: customLevels.levels,
            format: loggerConfig.format,
            transports: createTransports(loggerConfig),
            defaultMeta: {
                service: 'goha-restaurant',
                environment: process.env.NODE_ENV || 'development',
                version: process.env.APP_VERSION || '1.0.0'
            }
        });

        // Handle uncaught exceptions and rejections
        this.logger.exceptions.handle(
            new winston.transports.File({ 
                filename: `${loggerConfig.logDirectory}/exceptions.log`,
                format: loggerConfig.format
            })
        );

        this.logger.rejections.handle(
            new winston.transports.File({ 
                filename: `${loggerConfig.logDirectory}/rejections.log`,
                format: loggerConfig.format
            })
        );
    }

    public static getInstance(): LoggerService {
        if (!LoggerService.instance) {
            LoggerService.instance = new LoggerService();
        }
        return LoggerService.instance;
    }

    info(message: string, meta?: LogContext): void {
        this.logger.info(message, this.enrichMetadata(meta));
    }

    error(message: string, error?: Error, meta?: LogContext): void {
        const enrichedMeta = this.enrichMetadata(meta);
        if (error) {
            enrichedMeta.error = {
                name: error.name,
                message: error.message,
                stack: error.stack
            };
        }
        this.logger.error(message, enrichedMeta);
    }

    warn(message: string, meta?: LogContext): void {
        this.logger.warn(message, this.enrichMetadata(meta));
    }

    debug(message: string, meta?: LogContext): void {
        this.logger.debug(message, this.enrichMetadata(meta));
    }

    verbose(message: string, meta?: LogContext): void {
        this.logger.verbose(message, this.enrichMetadata(meta));
    }

    http(message: string, meta?: LogContext): void {
        this.logger.http(message, this.enrichMetadata(meta));
    }

    // Specialized logging methods
    logDatabaseOperation(message: string, context: DatabaseLogContext): void {
        const enrichedContext = {
            ...this.enrichMetadata(context),
            logType: 'DATABASE'
        };
        this.logger.info(message, enrichedContext);
    }

    logBusinessOperation(message: string, context: BusinessLogContext): void {
        const enrichedContext = {
            ...this.enrichMetadata(context),
            logType: 'BUSINESS'
        };
        this.logger.info(message, enrichedContext);
    }

    logSecurityEvent(message: string, context: SecurityLogContext): void {
        const enrichedContext = {
            ...this.enrichMetadata(context),
            logType: 'SECURITY'
        };
        
        // Security events should always be logged at appropriate level
        const level = context.riskLevel === 'CRITICAL' || context.riskLevel === 'HIGH' ? 'error' : 'warn';
        this.logger.log(level, message, enrichedContext);
    }

    logHttpRequest(message: string, context: LogContext & { 
        method: string, 
        url: string, 
        statusCode: number, 
        duration: number 
    }): void {
        const enrichedContext = {
            ...this.enrichMetadata(context),
            logType: 'HTTP'
        };
        this.http(message, enrichedContext);
    }

    logValidationError(message: string, validationErrors: any[], context?: LogContext): void {
        const enrichedContext = {
            ...this.enrichMetadata(context),
            logType: 'VALIDATION',
            validationErrors
        };
        this.warn(message, enrichedContext);
    }

    logPerformance(message: string, context: LogContext & { duration: number, operation: string }): void {
        const enrichedContext = {
            ...this.enrichMetadata(context),
            logType: 'PERFORMANCE'
        };
        
        // Log slow operations as warnings
        const level = context.duration > 5000 ? 'warn' : 'info';
        this.logger.log(level, message, enrichedContext);
    }

    private enrichMetadata(meta?: LogContext): any {
        const baseMetadata = {
            timestamp: new Date().toISOString(),
            traceId: meta?.traceId || this.generateTraceId(),
            ...meta
        };

        // Remove undefined values
        return Object.fromEntries(
            Object.entries(baseMetadata).filter(([_, value]) => value !== undefined)
        );
    }

    private generateTraceId(): string {
        return uuidv4();
    }

    // Method to create child logger with persistent context
    createChildLogger(context: LogContext): LoggerService {
        const childLogger = new LoggerService();
        childLogger.logger = this.logger.child(this.enrichMetadata(context));
        return childLogger;
    }

    // Method to handle graceful shutdown
    async shutdown(): Promise<void> {
        return new Promise((resolve) => {
            this.logger.on('finish', resolve);
            this.logger.end();
        });
    }
}