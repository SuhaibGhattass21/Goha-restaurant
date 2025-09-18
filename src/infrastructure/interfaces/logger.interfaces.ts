import winston from 'winston';

export interface ILogger {
    info(message: string, meta?: any): void;
    error(message: string, error?: Error, meta?: any): void;
    warn(message: string, meta?: any): void;
    debug(message: string, meta?: any): void;
    verbose(message: string, meta?: any): void;
    http(message: string, meta?: any): void;
    
    // Specialized logging methods
    logDatabaseOperation(message: string, context: DatabaseLogContext): void;
    logBusinessOperation(message: string, context: BusinessLogContext): void;
    logSecurityEvent(message: string, context: SecurityLogContext): void;
    logHttpRequest(message: string, context: LogContext & { 
        method: string, 
        url: string, 
        statusCode: number, 
        duration: number 
    }): void;
    logValidationError(message: string, validationErrors: any[], context?: LogContext): void;
    logPerformance(message: string, context: LogContext & { duration: number, operation: string }): void;
}

export interface LogContext {
    userId?: string;
    sessionId?: string;
    traceId?: string;
    component?: string;
    operation?: string;
    duration?: number;
    statusCode?: number;
    method?: string;
    url?: string;
    ip?: string;
    userAgent?: string;
    correlationId?: string;
    environment?: string;
    service?: string;
    version?: string;
    [key: string]: any; // Allow additional dynamic properties
}

export interface DatabaseLogContext extends LogContext {
    query?: string;
    queryTime?: number;
    affectedRows?: number;
    table?: string;
    connectionId?: string;
    transactionId?: string;
    queryType?: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'MIGRATION';
    parameters?: any[];
}

export interface BusinessLogContext extends LogContext {
    entityId?: string;
    entityType?: string;
    action?: string;
    previousState?: any;
    newState?: any;
    validationErrors?: any[];
    businessRule?: string;
    workflow?: string;
    category?: 'ORDER' | 'PAYMENT' | 'INVENTORY' | 'USER' | 'SHIFT' | 'PRODUCT' | 'CATEGORY';
}

export interface SecurityLogContext extends LogContext {
    securityEvent?: 'LOGIN_ATTEMPT' | 'LOGIN_SUCCESS' | 'LOGIN_FAILURE' | 'PERMISSION_DENIED' | 'TOKEN_VALIDATION' | 'UNAUTHORIZED_ACCESS' | 'SUSPICIOUS_ACTIVITY' | 'DATA_BREACH' | 'PRIVILEGE_ESCALATION';
    riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    resource?: string;
    permission?: string;
    attemptCount?: number;
    blocked?: boolean;
}

export interface PerformanceLogContext extends LogContext {
    operationType?: 'DATABASE' | 'API' | 'BUSINESS_LOGIC' | 'EXTERNAL_SERVICE';
    threshold?: number;
    memoryUsage?: number;
    cpuUsage?: number;
}

export interface AlertingLogContext extends LogContext {
    alertType?: 'ERROR' | 'WARNING' | 'CRITICAL' | 'INFO';
    alertRule?: string;
    severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    notificationChannel?: 'EMAIL' | 'SLACK' | 'SMS';
}

export interface LoggerConfig {
    level: string;
    isDevelopment: boolean;
    logDirectory: string;
    enableFileLogging: boolean;
    enableConsoleLogging: boolean;
    enableDatabaseLogging: boolean;
    maxFileSize: string;
    maxFiles: string;
    format: winston.Logform.Format;
}