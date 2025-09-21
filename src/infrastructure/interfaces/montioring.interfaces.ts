export interface SystemMetrics {
    memoryUsage: NodeJS.MemoryUsage;
    cpuUsage: number;
    uptime: number;
    timestamp: Date;
}

export interface AlertRule {
    name: string;
    condition: (metrics: SystemMetrics) => boolean;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    message: string;
    cooldownPeriod: number; // in milliseconds
    lastTriggered?: Date;
}
