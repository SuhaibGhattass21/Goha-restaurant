import winston from 'winston';
import path from 'path';
import fs from 'fs';
import { LoggerConfig } from '../../infrastructure/interfaces/logger.interfaces';


// Ensure logs directory exists
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

export const loggerConfig: LoggerConfig = {
    level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'development' ? 'debug' : 'info'),
    isDevelopment: process.env.NODE_ENV === 'development',
    logDirectory: logsDir,
    enableFileLogging: process.env.ENABLE_FILE_LOGGING !== 'false',
    enableConsoleLogging: process.env.ENABLE_CONSOLE_LOGGING !== 'false',
    enableDatabaseLogging: process.env.ENABLE_DB_LOGGING === 'true',
    maxFileSize: process.env.LOG_MAX_FILE_SIZE || '20m',
    maxFiles: process.env.LOG_MAX_FILES || '14d',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        winston.format.errors({ stack: true }),
        winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
        winston.format.json()
    )
};

export const createLogFormat = (isDevelopment: boolean) => {
    if (isDevelopment) {
        return winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({ format: 'HH:mm:ss.SSS' }),
            winston.format.printf(({ timestamp, level, message, metadata, stack }) => {
                let log = `${timestamp} [${level}]: ${message}`;
                
                if (metadata && Object.keys(metadata).length > 0) {
                    log += ` ${JSON.stringify(metadata, null, 2)}`;
                }
                
                if (stack) {
                    log += `\n${stack}`;
                }
                
                return log;
            })
        );
    }
    
    return loggerConfig.format;
};

export const createTransports = (config: LoggerConfig): winston.transport[] => {
    const transports: winston.transport[] = [];
    
    // Console transport
    if (config.enableConsoleLogging) {
        transports.push(
            new winston.transports.Console({
                format: createLogFormat(config.isDevelopment),
                level: config.level
            })
        );
    }
    
    // File transports
    if (config.enableFileLogging) {
        // Error logs
        transports.push(
            new winston.transports.File({
                filename: path.join(config.logDirectory, 'error.log'),
                level: 'error',
                format: config.format,
                maxsize: parseInt(config.maxFileSize) * 1024 * 1024,
                maxFiles: 5,
                tailable: true
            })
        );
        
        // Combined logs
        transports.push(
            new winston.transports.File({
                filename: path.join(config.logDirectory, 'combined.log'),
                format: config.format,
                maxsize: parseInt(config.maxFileSize) * 1024 * 1024,
                maxFiles: 7,
                tailable: true
            })
        );
        
        // HTTP logs
        transports.push(
            new winston.transports.File({
                filename: path.join(config.logDirectory, 'http.log'),
                level: 'http',
                format: config.format,
                maxsize: parseInt(config.maxFileSize) * 1024 * 1024,
                maxFiles: 3,
                tailable: true
            })
        );
        
        // Database logs
        transports.push(
            new winston.transports.File({
                filename: path.join(config.logDirectory, 'database.log'),
                format: config.format,
                maxsize: parseInt(config.maxFileSize) * 1024 * 1024,
                maxFiles: 3,
                tailable: true
            })
        );
        
        // Security logs
        transports.push(
            new winston.transports.File({
                filename: path.join(config.logDirectory, 'security.log'),
                format: config.format,
                maxsize: parseInt(config.maxFileSize) * 1024 * 1024,
                maxFiles: 10,
                tailable: true
            })
        );
        
        // Business logs
        transports.push(
            new winston.transports.File({
                filename: path.join(config.logDirectory, 'business.log'),
                format: config.format,
                maxsize: parseInt(config.maxFileSize) * 1024 * 1024,
                maxFiles: 7,
                tailable: true
            })
        );
    }
    
    return transports;
};