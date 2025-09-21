import path from 'path';

export interface LoggingConfig {
  level: string;
  enableFileLogging: boolean;
  enableConsoleLogging: boolean;
  enableDatabaseLogging: boolean;
  maxFileSize: string;
  maxFiles: string;
  logDirectory: string;
  rotationInterval: string;
  compressionEnabled: boolean;
  alerting: {
    enabled: boolean;
    thresholds: {
      errorRate: number;
      memoryUsage: number;
      cpuUsage: number;
      responseTime: number;
      diskSpace: number;
    };
    notifications: {
      email?: {
        enabled: boolean;
        recipients: string[];
        smtpConfig?: {
          host: string;
          port: number;
          secure: boolean;
          auth: {
            user: string;
            pass: string;
          };
        };
      };
      slack?: {
        enabled: boolean;
        webhookUrl: string;
        channel: string;
      };
      webhook?: {
        enabled: boolean;
        url: string;
        headers?: Record<string, string>;
      };
    };
  };
  sanitization: {
    enabled: boolean;
    sensitiveFields: string[];
    maskingChar: string;
    maskingStrategy: 'partial' | 'full' | 'hash';
  };
  performance: {
    trackMemoryUsage: boolean;
    trackCpuUsage: boolean;
    slowQueryThreshold: number;
    slowRequestThreshold: number;
    samplingRate: number;
  };
  security: {
    enableSecurityLogging: boolean;
    trackFailedLogins: boolean;
    trackAuthorizationFailures: boolean;
    suspiciousActivityThreshold: number;
    blockSuspiciousIps: boolean;
  };
}

export class LoggingConfigManager {
  private static instance: LoggingConfigManager;
  private config: LoggingConfig;

  private constructor() {
    this.config = this.loadConfig();
  }

  public static getInstance(): LoggingConfigManager {
    if (!LoggingConfigManager.instance) {
      LoggingConfigManager.instance = new LoggingConfigManager();
    }
    return LoggingConfigManager.instance;
  }

  private loadConfig(): LoggingConfig {
    const defaultConfig: LoggingConfig = {
      level: process.env.LOG_LEVEL || 'info',
      enableFileLogging: process.env.ENABLE_FILE_LOGGING !== 'false',
      enableConsoleLogging: process.env.ENABLE_CONSOLE_LOGGING !== 'false',
      enableDatabaseLogging: process.env.ENABLE_DB_LOGGING === 'true',
      maxFileSize: process.env.LOG_MAX_FILE_SIZE || '20m',
      maxFiles: process.env.LOG_MAX_FILES || '14d',
      logDirectory: process.env.LOG_DIRECTORY || path.join(process.cwd(), 'logs'),
      rotationInterval: process.env.LOG_ROTATION_INTERVAL || 'daily',
      compressionEnabled: process.env.LOG_COMPRESSION_ENABLED === 'true',
      
      alerting: {
        enabled: process.env.ALERTING_ENABLED === 'true',
        thresholds: {
          errorRate: parseFloat(process.env.ALERT_ERROR_RATE || '0.05'),
          memoryUsage: parseInt(process.env.ALERT_MEMORY_USAGE || '512') * 1024 * 1024,
          cpuUsage: parseFloat(process.env.ALERT_CPU_USAGE || '80'),
          responseTime: parseInt(process.env.ALERT_RESPONSE_TIME || '5000'),
          diskSpace: parseFloat(process.env.ALERT_DISK_SPACE || '85'),
        },
        notifications: {
          email: {
            enabled: process.env.EMAIL_NOTIFICATIONS_ENABLED === 'true',
            recipients: process.env.EMAIL_RECIPIENTS?.split(',') || [],
            smtpConfig: process.env.SMTP_HOST ? {
              host: process.env.SMTP_HOST,
              port: parseInt(process.env.SMTP_PORT || '587'),
              secure: process.env.SMTP_SECURE === 'true',
              auth: {
                user: process.env.SMTP_USER || '',
                pass: process.env.SMTP_PASS || '',
              },
            } : undefined,
          },
          slack: {
            enabled: process.env.SLACK_NOTIFICATIONS_ENABLED === 'true',
            webhookUrl: process.env.SLACK_WEBHOOK_URL || '',
            channel: process.env.SLACK_CHANNEL || '#alerts',
          },
          webhook: {
            enabled: process.env.WEBHOOK_NOTIFICATIONS_ENABLED === 'true',
            url: process.env.WEBHOOK_URL || '',
            headers: process.env.WEBHOOK_HEADERS ? JSON.parse(process.env.WEBHOOK_HEADERS) : {},
          },
        },
      },

      sanitization: {
        enabled: process.env.LOG_SANITIZATION_ENABLED !== 'false',
        sensitiveFields: process.env.SENSITIVE_FIELDS?.split(',') || [
          'password', 'token', 'secret', 'key', 'authorization',
          'ssn', 'credit_card', 'phone', 'email', 'address'
        ],
        maskingChar: process.env.MASKING_CHAR || '*',
        maskingStrategy: (process.env.MASKING_STRATEGY as 'partial' | 'full' | 'hash') || 'partial',
      },

      performance: {
        trackMemoryUsage: process.env.TRACK_MEMORY_USAGE !== 'false',
        trackCpuUsage: process.env.TRACK_CPU_USAGE !== 'false',
        slowQueryThreshold: parseInt(process.env.SLOW_QUERY_THRESHOLD || '1000'),
        slowRequestThreshold: parseInt(process.env.SLOW_REQUEST_THRESHOLD || '5000'),
        samplingRate: parseFloat(process.env.PERFORMANCE_SAMPLING_RATE || '1.0'),
      },

      security: {
        enableSecurityLogging: process.env.SECURITY_LOGGING_ENABLED !== 'false',
        trackFailedLogins: process.env.TRACK_FAILED_LOGINS !== 'false',
        trackAuthorizationFailures: process.env.TRACK_AUTH_FAILURES !== 'false',
        suspiciousActivityThreshold: parseInt(process.env.SUSPICIOUS_ACTIVITY_THRESHOLD || '5'),
        blockSuspiciousIps: process.env.BLOCK_SUSPICIOUS_IPS === 'true',
      },
    };

    return defaultConfig;
  }

  public getConfig(): LoggingConfig {
    return { ...this.config };
  }

  public updateConfig(updates: Partial<LoggingConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  public isProductionMode(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  public isDevelopmentMode(): boolean {
    return process.env.NODE_ENV === 'development';
  }

  public getLogLevel(): string {
    return this.config.level;
  }

  public shouldLogToFile(): boolean {
    return this.config.enableFileLogging;
  }

  public shouldLogToConsole(): boolean {
    return this.config.enableConsoleLogging;
  }

  public shouldLogToDatabase(): boolean {
    return this.config.enableDatabaseLogging;
  }

  public getAlertingConfig() {
    return this.config.alerting;
  }

  public getSanitizationConfig() {
    return this.config.sanitization;
  }

  public getPerformanceConfig() {
    return this.config.performance;
  }

  public getSecurityConfig() {
    return this.config.security;
  }

  public getLogDirectory(): string {
    return this.config.logDirectory;
  }

  public validateConfig(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate log level
    const validLevels = ['error', 'warn', 'info', 'debug', 'verbose'];
    if (!validLevels.includes(this.config.level)) {
      errors.push(`Invalid log level: ${this.config.level}. Must be one of: ${validLevels.join(', ')}`);
    }

    // Validate alerting configuration
    if (this.config.alerting.enabled) {
      const { notifications } = this.config.alerting;
      
      if (notifications.email?.enabled && (!notifications.email.recipients.length || !notifications.email.smtpConfig)) {
        errors.push('Email notifications enabled but missing recipients or SMTP configuration');
      }

      if (notifications.slack?.enabled && !notifications.slack.webhookUrl) {
        errors.push('Slack notifications enabled but missing webhook URL');
      }

      if (notifications.webhook?.enabled && !notifications.webhook.url) {
        errors.push('Webhook notifications enabled but missing URL');
      }
    }

    // Validate thresholds
    const { thresholds } = this.config.alerting;
    if (thresholds.errorRate < 0 || thresholds.errorRate > 1) {
      errors.push('Error rate threshold must be between 0 and 1');
    }

    if (thresholds.cpuUsage < 0 || thresholds.cpuUsage > 100) {
      errors.push('CPU usage threshold must be between 0 and 100');
    }

    if (thresholds.diskSpace < 0 || thresholds.diskSpace > 100) {
      errors.push('Disk space threshold must be between 0 and 100');
    }

    // Validate performance config
    const { samplingRate } = this.config.performance;
    if (samplingRate < 0 || samplingRate > 1) {
      errors.push('Performance sampling rate must be between 0 and 1');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  public exportConfig(): string {
    return JSON.stringify(this.config, null, 2);
  }

  public importConfig(configJson: string): void {
    try {
      const importedConfig = JSON.parse(configJson);
      this.config = { ...this.config, ...importedConfig };
    } catch (error) {
      throw new Error(`Failed to import configuration: ${error}`);
    }
  }
}

export const loggingConfig = LoggingConfigManager.getInstance();
