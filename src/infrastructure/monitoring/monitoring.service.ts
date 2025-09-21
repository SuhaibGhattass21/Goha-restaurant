import { AlertRule, SystemMetrics } from '../../infrastructure/interfaces/montioring.interfaces';
import { LoggerService } from '../logger/logger.service';
import { LoggingUtils } from '../logger/utils/logging.utils';

export class MonitoringService {
    private static instance: MonitoringService;
    private logger: LoggerService;
    private alertRules: AlertRule[] = [];
    private metricsHistory: SystemMetrics[] = [];
    private monitoringInterval?: NodeJS.Timeout;

    private constructor() {
        this.logger = LoggerService.getInstance();
        this.initializeDefaultAlertRules();
    }

    static getInstance(): MonitoringService {
        if (!MonitoringService.instance) {
            MonitoringService.instance = new MonitoringService();
        }
        return MonitoringService.instance;
    }

    private initializeDefaultAlertRules(): void {
        this.alertRules = [
            {
                name: 'HIGH_MEMORY_USAGE',
                condition: (metrics) => metrics.memoryUsage.heapUsed > 512 * 1024 * 1024, // 512MB
                severity: 'HIGH',
                message: 'High memory usage detected',
                cooldownPeriod: 5 * 60 * 1000 // 5 minutes
            },
            {
                name: 'CRITICAL_MEMORY_USAGE',
                condition: (metrics) => metrics.memoryUsage.heapUsed > 1024 * 1024 * 1024, // 1GB
                severity: 'CRITICAL',
                message: 'Critical memory usage detected',
                cooldownPeriod: 2 * 60 * 1000 // 2 minutes
            },
            {
                name: 'HIGH_CPU_USAGE',
                condition: (metrics) => metrics.cpuUsage > 80,
                severity: 'MEDIUM',
                message: 'High CPU usage detected',
                cooldownPeriod: 5 * 60 * 1000 // 5 minutes
            }
        ];
    }

    startMonitoring(intervalMs: number = 30000): void {
        this.logger.info('Starting system monitoring', {
            component: 'MONITORING_SERVICE'
        } as any);

        this.monitoringInterval = setInterval(() => {
            this.collectMetrics();
        }, intervalMs);
    }

    stopMonitoring(): void {
        if (this.monitoringInterval) {
            clearInterval(this.monitoringInterval);
            this.monitoringInterval = undefined;
            this.logger.info('Stopped system monitoring', {
                component: 'MONITORING_SERVICE'
            });
        }
    }

    private async collectMetrics(): Promise<void> {
        try {
            const metrics: SystemMetrics = {
                memoryUsage: process.memoryUsage(),
                cpuUsage: await this.getCpuUsage(),
                uptime: process.uptime(),
                timestamp: new Date()
            };

            // Store metrics (keep only last 1000 entries)
            this.metricsHistory.push(metrics);
            if (this.metricsHistory.length > 1000) {
                this.metricsHistory.shift();
            }

            // Log metrics
            this.logger.debug('System metrics collected', {
                component: 'MONITORING_SERVICE',
                metrics
            } as any);

            // Check alert rules
            this.checkAlertRules(metrics);

        } catch (error) {
            this.logger.error('Failed to collect system metrics', error as Error, {
                component: 'MONITORING_SERVICE'
            });
        }
    }

    private async getCpuUsage(): Promise<number> {
        // Simple CPU usage calculation (this is a simplified version)
        const startUsage = process.cpuUsage();
        
        return new Promise((resolve) => {
            setTimeout(() => {
                const endUsage = process.cpuUsage(startUsage);
                const total = endUsage.user + endUsage.system;
                const cpuPercent = (total / 1000000) * 100; // Convert to percentage
                resolve(Math.min(cpuPercent, 100));
            }, 100);
        });
    }

    private checkAlertRules(metrics: SystemMetrics): void {
        const now = new Date();

        this.alertRules.forEach(rule => {
            // Check cooldown period
            if (rule.lastTriggered) {
                const timeSinceLastTrigger = now.getTime() - rule.lastTriggered.getTime();
                if (timeSinceLastTrigger < rule.cooldownPeriod) {
                    return; // Still in cooldown
                }
            }

            // Check condition
            if (rule.condition(metrics)) {
                rule.lastTriggered = now;
                this.triggerAlert(rule, metrics);
            }
        });
    }

    private triggerAlert(rule: AlertRule, metrics: SystemMetrics): void {
        const alertMessage = `${rule.message} - ${JSON.stringify({
            memoryUsageGB: (metrics.memoryUsage.heapUsed / 1024 / 1024 / 1024).toFixed(2),
            cpuUsage: metrics.cpuUsage.toFixed(2),
            uptime: metrics.uptime
        })}`;

        LoggingUtils.logSystemAlert(
            rule.severity === 'CRITICAL' ? 'CRITICAL' :
            rule.severity === 'HIGH' ? 'ERROR' :
            'WARNING',
            alertMessage,
            {
                alertRule: rule.name,
                severity: rule.severity,
                component: 'MONITORING_SERVICE'
            }
        );

        this.sendNotification(rule, alertMessage);
    }

    private sendNotification(rule: AlertRule, message: string): void {
        // To integrate with:
        // - Email service (nodemailer, SendGrid, etc.)
        // - Slack API
        // - SMS service (Twilio, etc.)
        // - Push notification service
        
        this.logger.warn('Alert notification triggered', {
            component: 'NOTIFICATION_SERVICE'
        } as any);
    }

    getMetrics(): SystemMetrics[] {
        return [...this.metricsHistory];
    }

    getCurrentMetrics(): SystemMetrics | undefined {
        return this.metricsHistory[this.metricsHistory.length - 1];
    }

    addAlertRule(rule: AlertRule): void {
        this.alertRules.push(rule);
        this.logger.info('Alert rule added', {
            component: 'MONITORING_SERVICE'
        } as any);
    }

    removeAlertRule(ruleName: string): void {
        const index = this.alertRules.findIndex(rule => rule.name === ruleName);
        if (index !== -1) {
            this.alertRules.splice(index, 1);
            this.logger.info('Alert rule removed', {
                component: 'MONITORING_SERVICE'
            } as any);
        }
    }

    // Graceful shutdown
    async shutdown(): Promise<void> {
        this.stopMonitoring();
        this.logger.info('Monitoring service shutdown completed', {
            component: 'MONITORING_SERVICE'
        });
    }
}
