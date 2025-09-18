import { LoggerService } from '../logger.service';
import { LoggingUtils } from '../utils/logging.utils';

export interface AuditLogEntry {
    entityType: string;
    entityId: string;
    action: 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW';
    userId: string;
    timestamp: Date;
    oldValues?: any;
    newValues?: any;
    changes?: string[];
    ipAddress?: string;
    userAgent?: string;
    sessionId?: string;
}

export class AuditLogger {
    private static logger = LoggerService.getInstance();
    
    /**
     * Log audit events for entity changes
     */
    static logAuditEvent(entry: AuditLogEntry): void {
        const message = `Audit: ${entry.action} ${entry.entityType} (ID: ${entry.entityId}) by user ${entry.userId}`;
        
        AuditLogger.logger.logBusinessOperation(message, {
            entityType: entry.entityType,
            entityId: entry.entityId,
            action: entry.action,
            userId: entry.userId,
            previousState: entry.oldValues,
            newState: entry.newValues,
            ip: entry.ipAddress,
            userAgent: entry.userAgent
        });

        // Also log to dedicated audit file
        AuditLogger.logger.info(message, {
            logType: 'AUDIT',
            auditEntry: {
                ...entry,
                changes: entry.changes?.join(', ')
            }
        } as any);
    }

    /**
     * Log user authentication audit events
     */
    static logAuthAudit(
        userId: string,
        action: 'LOGIN' | 'LOGOUT' | 'PASSWORD_CHANGE' | 'PERMISSION_GRANTED' | 'PERMISSION_REVOKED',
        ipAddress: string,
        userAgent?: string,
        additionalData?: any
    ): void {
        const entry: AuditLogEntry = {
            entityType: 'USER',
            entityId: userId,
            action: action as any,
            userId: userId,
            timestamp: new Date(),
            ipAddress,
            userAgent,
            newValues: additionalData
        };

        AuditLogger.logAuditEvent(entry);
    }

    /**
     * Log financial transaction audit events
     */
    static logFinancialAudit(
        transactionType: 'ORDER' | 'PAYMENT' | 'REFUND' | 'EXPENSE',
        transactionId: string,
        amount: number,
        userId: string,
        action: 'CREATE' | 'UPDATE' | 'DELETE',
        oldValues?: any,
        newValues?: any
    ): void {
        const entry: AuditLogEntry = {
            entityType: transactionType,
            entityId: transactionId,
            action,
            userId,
            timestamp: new Date(),
            oldValues,
            newValues
        };

        // Financial events are critical, log at warn level
        const message = `Financial Audit: ${action} ${transactionType} (ID: ${transactionId}, Amount: ${amount}) by user ${userId}`;
        
        AuditLogger.logger.warn(message, {
            logType: 'FINANCIAL_AUDIT',
            auditEntry: entry,
            amount,
            transactionType
        } as any);
    }

    /**
     * Log inventory audit events
     */
    static logInventoryAudit(
        itemId: string,
        action: 'STOCK_IN' | 'STOCK_OUT' | 'ADJUSTMENT' | 'TRANSFER',
        quantity: number,
        userId: string,
        reason?: string,
        oldQuantity?: number,
        newQuantity?: number
    ): void {
        const entry: AuditLogEntry = {
            entityType: 'INVENTORY',
            entityId: itemId,
            action: action as any,
            userId,
            timestamp: new Date(),
            oldValues: oldQuantity ? { quantity: oldQuantity } : undefined,
            newValues: { quantity: newQuantity, reason }
        };

        AuditLogger.logAuditEvent(entry);
    }

    /**
     * Log security-related audit events
     */
    static logSecurityAudit(
        event: 'FAILED_LOGIN' | 'ACCOUNT_LOCKED' | 'PRIVILEGE_ESCALATION' | 'SUSPICIOUS_ACTIVITY',
        userId: string,
        ipAddress: string,
        details?: any
    ): void {
        const entry: AuditLogEntry = {
            entityType: 'SECURITY',
            entityId: userId,
            action: 'VIEW' as any,
            userId: userId,
            timestamp: new Date(),
            ipAddress,
            newValues: { event, details }
        };

        // Security events are critical
        const message = `Security Audit: ${event} for user ${userId} from ${ipAddress}`;
        
        AuditLogger.logger.error(message, undefined, {
            logType: 'SECURITY_AUDIT',
            auditEntry: entry,
            securityEvent: event,
            riskLevel: 'HIGH'
        } as any);
    }

    /**
     * Log system configuration changes
     */
    static logConfigAudit(
        configType: string,
        action: 'CREATE' | 'UPDATE' | 'DELETE',
        userId: string,
        oldConfig?: any,
        newConfig?: any
    ): void {
        const entry: AuditLogEntry = {
            entityType: 'CONFIGURATION',
            entityId: configType,
            action,
            userId,
            timestamp: new Date(),
            oldValues: oldConfig,
            newValues: newConfig,
            changes: oldConfig && newConfig ? AuditLogger.getChangedFields(oldConfig, newConfig) : undefined
        };

        AuditLogger.logAuditEvent(entry);
    }

    /**
     * Helper method to detect changed fields between old and new values
     */
    private static getChangedFields(oldValues: any, newValues: any): string[] {
        const changes: string[] = [];
        
        if (!oldValues || !newValues) {
            return changes;
        }

        const allKeys = new Set([...Object.keys(oldValues), ...Object.keys(newValues)]);
        
        for (const key of allKeys) {
            if (oldValues[key] !== newValues[key]) {
                changes.push(key);
            }
        }

        return changes;
    }

    /**
     * Generate audit report for a specific time period
     */
    static generateAuditReport(
        startDate: Date,
        endDate: Date,
        entityType?: string,
        userId?: string
    ): void {
        const message = `Audit report generated for period ${startDate.toISOString()} to ${endDate.toISOString()}`;
        
        AuditLogger.logger.info(message, {
            logType: 'AUDIT_REPORT',
            reportPeriod: {
                start: startDate.toISOString(),
                end: endDate.toISOString(),
                entityType,
                userId
            }
        } as any);
    }
}
