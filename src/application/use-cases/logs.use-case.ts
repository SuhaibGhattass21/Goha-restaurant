import fs from 'fs';
import path from 'path';
import { LogQueryDto, LogStatsDto, LogAnalysisDto, LogResponseDto, LogEntry, LogStats, LogAnalysis } from '../dtos/logs.dto';
import { LoggingConfigManager } from '../../infrastructure/logger/config/logging.config';

export class LogsUseCases {
  private loggingConfig = LoggingConfigManager.getInstance();

  async getLogs(query: LogQueryDto): Promise<LogResponseDto> {
    const { page = 1, limit = 50, level, component, operation, userId, traceId, startDate, endDate, search } = query;
    
    const logDir = this.loggingConfig.getLogDirectory();
    const logFiles = this.getLogFiles(logDir);
    
    let allLogs: LogEntry[] = [];
    
    // Read from appropriate log files based on level filter
    const filesToRead = level ? [`${level}.log`] : ['combined.log'];
    
    for (const fileName of filesToRead) {
      const filePath = path.join(logDir, fileName);
      if (fs.existsSync(filePath)) {
        const logs = await this.readLogsFromFile(filePath);
        allLogs = allLogs.concat(logs);
      }
    }
    
    // Apply filters
    let filteredLogs = this.applyFilters(allLogs, {
      level,
      component,
      operation,
      userId,
      traceId,
      startDate,
      endDate,
      search
    });
    
    // Sort by timestamp (newest first)
    filteredLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    // Apply pagination
    const total = filteredLogs.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedLogs = filteredLogs.slice(startIndex, endIndex);
    
    return {
      logs: paginatedLogs,
      total,
      page,
      limit,
      hasNext: endIndex < total,
      hasPrevious: page > 1
    };
  }

  async getLogStats(query: LogStatsDto): Promise<LogStats> {
    const { startDate, endDate, component } = query;
    const logDir = this.loggingConfig.getLogDirectory();
    const combinedLogPath = path.join(logDir, 'combined.log');
    
    if (!fs.existsSync(combinedLogPath)) {
      throw new Error('Log file not found');
    }
    
    const logs = await this.readLogsFromFile(combinedLogPath);
    let filteredLogs = this.applyFilters(logs, { startDate, endDate, component });
    
    const stats: LogStats = {
      totalLogs: filteredLogs.length,
      errorCount: filteredLogs.filter(log => log.level === 'error').length,
      warnCount: filteredLogs.filter(log => log.level === 'warn').length,
      infoCount: filteredLogs.filter(log => log.level === 'info').length,
      debugCount: filteredLogs.filter(log => log.level === 'debug').length,
      topErrors: this.getTopErrors(filteredLogs),
      topComponents: this.getTopComponents(filteredLogs),
      hourlyDistribution: this.getHourlyDistribution(filteredLogs)
    };
    
    // Calculate average response time if available
    const responseTimes = filteredLogs
      .map(log => log.responseTime)
      .filter(time => time !== undefined) as number[];
    
    if (responseTimes.length > 0) {
      stats.averageResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    }
    
    return stats;
  }

  async analyzeLogPatterns(query: LogAnalysisDto): Promise<LogAnalysis> {
    const { days = 7, type = 'errors' } = query;
    const logDir = this.loggingConfig.getLogDirectory();
    
    let logFile: string;
    switch (type) {
      case 'errors':
        logFile = 'error.log';
        break;
      case 'security':
        logFile = 'security.log';
        break;
      case 'business':
        logFile = 'business.log';
        break;
      case 'performance':
      default:
        logFile = 'combined.log';
        break;
    }
    
    const filePath = path.join(logDir, logFile);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Log file ${logFile} not found`);
    }
    
    const logs = await this.readLogsFromFile(filePath);
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const recentLogs = logs.filter(log => new Date(log.timestamp) >= cutoffDate);
    
    return this.performLogAnalysis(recentLogs, type, days);
  }

  async getLogFileInfo(): Promise<Array<{ name: string; size: number; lastModified: string }>> {
    const logDir = this.loggingConfig.getLogDirectory();
    
    if (!fs.existsSync(logDir)) {
      return [];
    }
    
    return fs.readdirSync(logDir)
      .filter(file => file.endsWith('.log'))
      .map(file => {
        const filePath = path.join(logDir, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          size: stats.size,
          lastModified: stats.mtime.toISOString()
        };
      });
  }

  async exportLogs(query: LogQueryDto): Promise<Buffer> {
    const logs = await this.getLogs({ ...query, limit: 10000 }); // Export more logs
    const csvContent = this.convertLogsToCsv(logs.logs);
    return Buffer.from(csvContent, 'utf-8');
  }

  private getLogFiles(logDir: string): string[] {
    if (!fs.existsSync(logDir)) {
      return [];
    }
    return fs.readdirSync(logDir).filter(file => file.endsWith('.log'));
  }

  private async readLogsFromFile(filePath: string): Promise<LogEntry[]> {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n').filter(line => line.trim());
      
      return lines.map(line => {
        try {
          return JSON.parse(line) as LogEntry;
        } catch {
          // Handle non-JSON log lines
          return {
            timestamp: new Date().toISOString(),
            level: 'info',
            message: line,
            metadata: { raw: true }
          };
        }
      });
    } catch (error) {
      console.error(`Error reading log file ${filePath}:`, error);
      return [];
    }
  }

  private applyFilters(logs: LogEntry[], filters: any): LogEntry[] {
    return logs.filter(log => {
      if (filters.level && log.level !== filters.level) return false;
      if (filters.component && log.component !== filters.component) return false;
      if (filters.operation && log.operation !== filters.operation) return false;
      if (filters.userId && log.userId !== filters.userId) return false;
      if (filters.traceId && log.traceId !== filters.traceId) return false;
      
      if (filters.startDate && new Date(log.timestamp) < new Date(filters.startDate)) return false;
      if (filters.endDate && new Date(log.timestamp) > new Date(filters.endDate)) return false;
      
      if (filters.search && !log.message.toLowerCase().includes(filters.search.toLowerCase())) return false;
      
      return true;
    });
  }

  private getTopErrors(logs: LogEntry[]): Array<{ message: string; count: number }> {
    const errorLogs = logs.filter(log => log.level === 'error');
    const errorCounts = new Map<string, number>();
    
    errorLogs.forEach(log => {
      const message = log.message.substring(0, 100); // Truncate long messages
      errorCounts.set(message, (errorCounts.get(message) || 0) + 1);
    });
    
    return Array.from(errorCounts.entries())
      .map(([message, count]) => ({ message, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  private getTopComponents(logs: LogEntry[]): Array<{ component: string; count: number }> {
    const componentCounts = new Map<string, number>();
    
    logs.forEach(log => {
      if (log.component) {
        componentCounts.set(log.component, (componentCounts.get(log.component) || 0) + 1);
      }
    });
    
    return Array.from(componentCounts.entries())
      .map(([component, count]) => ({ component, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  private getHourlyDistribution(logs: LogEntry[]): Array<{ hour: number; count: number }> {
    const hourCounts = new Array(24).fill(0);
    
    logs.forEach(log => {
      const hour = new Date(log.timestamp).getHours();
      hourCounts[hour]++;
    });
    
    return hourCounts.map((count, hour) => ({ hour, count }));
  }

  private performLogAnalysis(logs: LogEntry[], type: string, days: number): LogAnalysis {
    const patterns = new Map<string, number>();
    
    logs.forEach(log => {
      let pattern: string;
      
      switch (type) {
        case 'errors':
          pattern = log.message.split(' ').slice(0, 5).join(' '); // First 5 words
          break;
        case 'security':
          pattern = `${log.operation || 'unknown'}_${log.component || 'unknown'}`;
          break;
        case 'business':
          pattern = `${log.component || 'unknown'}_${log.operation || 'unknown'}`;
          break;
        default:
          pattern = log.component || 'unknown';
      }
      
      patterns.set(pattern, (patterns.get(pattern) || 0) + 1);
    });
    
    const totalEvents = logs.length;
    const patternArray = Array.from(patterns.entries())
      .map(([pattern, count]) => ({
        pattern,
        count,
        percentage: (count / totalEvents) * 100,
        severity: this.determineSeverity(count, totalEvents, type)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);
    
    const trends = this.generateTrends(logs, days);
    const recommendations = this.generateRecommendations(patternArray, type);
    
    return {
      type,
      period: `${days} days`,
      summary: {
        totalEvents,
        uniquePatterns: patterns.size,
        criticalEvents: patternArray.filter(p => p.severity === 'critical').length
      },
      patterns: patternArray,
      trends,
      recommendations
    };
  }

  private determineSeverity(count: number, total: number, type: string): 'low' | 'medium' | 'high' | 'critical' {
    const percentage = (count / total) * 100;
    
    if (type === 'errors') {
      if (percentage > 20) return 'critical';
      if (percentage > 10) return 'high';
      if (percentage > 5) return 'medium';
      return 'low';
    }
    
    if (percentage > 30) return 'critical';
    if (percentage > 15) return 'high';
    if (percentage > 5) return 'medium';
    return 'low';
  }

  private generateTrends(logs: LogEntry[], days: number): Array<{ date: string; count: number }> {
    const dailyCounts = new Map<string, number>();
    
    logs.forEach(log => {
      const date = new Date(log.timestamp).toISOString().split('T')[0];
      dailyCounts.set(date, (dailyCounts.get(date) || 0) + 1);
    });
    
    const trends = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      trends.push({
        date,
        count: dailyCounts.get(date) || 0
      });
    }
    
    return trends;
  }

  private generateRecommendations(patterns: any[], type: string): string[] {
    const recommendations = [];
    
    const criticalPatterns = patterns.filter(p => p.severity === 'critical');
    const highPatterns = patterns.filter(p => p.severity === 'high');
    
    if (criticalPatterns.length > 0) {
      recommendations.push(`Immediate attention required: ${criticalPatterns.length} critical patterns detected`);
    }
    
    if (highPatterns.length > 0) {
      recommendations.push(`Monitor closely: ${highPatterns.length} high-priority patterns identified`);
    }
    
    if (type === 'errors') {
      if (patterns.length > 10) {
        recommendations.push('Consider implementing error categorization and automated alerting');
      }
    }
    
    if (type === 'performance') {
      const avgResponseTime = patterns.find(p => p.pattern.includes('responseTime'));
      if (avgResponseTime && avgResponseTime.count > 100) {
        recommendations.push('Performance optimization needed - high response times detected');
      }
    }
    
    if (recommendations.length === 0) {
      recommendations.push('System appears stable - continue monitoring');
    }
    
    return recommendations;
  }

  private convertLogsToCsv(logs: LogEntry[]): string {
    const headers = ['timestamp', 'level', 'message', 'component', 'operation', 'userId', 'traceId', 'ip', 'responseTime'];
    const csvLines = [headers.join(',')];
    
    logs.forEach(log => {
      const row = headers.map(header => {
        const value = (log as any)[header] || '';
        return `"${String(value).replace(/"/g, '""')}"`;
      });
      csvLines.push(row.join(','));
    });
    
    return csvLines.join('\n');
  }
}
