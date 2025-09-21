// Core logging functionality
export { LoggerService } from './logger.service';
export { loggerConfig } from './logger.config';

// Interfaces and types
export * from '../interfaces/logger.interfaces';

// Decorators
export * from './decorators/log.decorator';

// Utilities
export { LoggingUtils } from './utils/logging.utils';

// Specialized loggers
export { DatabaseLogger } from './database/database-logger';
export { AuditLogger, type AuditLogEntry } from './audit/audit-logger';

// Import the service for singleton creation
import { LoggerService } from './logger.service';

// Create singleton instance for easy access
export const logger = LoggerService.getInstance();
