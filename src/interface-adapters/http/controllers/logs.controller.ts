import { Request, Response } from 'express';
import { LogsUseCases } from '../../../application/use-cases/logs.use-case';
import { LogQueryDto, LogStatsDto, LogAnalysisDto } from '../../../application/dtos/logs.dto';
import { LoggerService } from '../../../infrastructure/logger/logger.service';
import { LoggingUtils } from '../../../infrastructure/logger/utils/logging.utils';
import { AuthenticatedRequest } from '../../interfaces/auth.interfaces';


export class LogsController {
    private logger = LoggerService.getInstance();
    private logsUseCases = new LogsUseCases();

    async getLogs(req: AuthenticatedRequest, res: Response): Promise<void> {
        const traceId = req.traceId || LoggingUtils.generateCorrelationId();
        
        try {
            this.logger.info('Retrieving logs', {
                component: 'LOGS_CONTROLLER',
                operation: 'GET_LOGS',
                traceId,
                userId: req.user?.userId,
                query: LoggingUtils.sanitizeData(req.query)
            } as any);

            const query: LogQueryDto = {
                page: parseInt(req.query.page as string) || 1,
                limit: parseInt(req.query.limit as string) || 50,
                level: req.query.level as string,
                component: req.query.component as string,
                operation: req.query.operation as string,
                userId: req.query.userId as string,
                traceId: req.query.traceId as string,
                startDate: req.query.startDate as string,
                endDate: req.query.endDate as string,
                search: req.query.search as string
            };

            const result = await this.logsUseCases.getLogs(query);

            // Log successful retrieval
            this.logger.info('Logs retrieved successfully', {
                component: 'LOGS_CONTROLLER',
                operation: 'GET_LOGS',
                traceId,
                userId: req.user?.userId,
                resultCount: result.logs.length,
                totalCount: result.total
            } as any);

            res.status(200).json({
                success: true,
                data: result
            });

        } catch (error: any) {
            this.logger.error('Failed to retrieve logs', error, {
                component: 'LOGS_CONTROLLER',
                operation: 'GET_LOGS',
                traceId,
                userId: req.user?.userId
            } as any);

            res.status(500).json({
                success: false,
                message: 'Failed to retrieve logs',
                error: error.message,
                traceId
            });
        }
    }

    async getLogStats(req: AuthenticatedRequest, res: Response): Promise<void> {
        const traceId = req.traceId || LoggingUtils.generateCorrelationId();
        
        try {
            this.logger.info('Retrieving log statistics', {
                component: 'LOGS_CONTROLLER',
                operation: 'GET_LOG_STATS',
                traceId,
                userId: req.user?.userId
            } as any);

            const query: LogStatsDto = {
                startDate: req.query.startDate as string,
                endDate: req.query.endDate as string,
                component: req.query.component as string
            };

            const stats = await this.logsUseCases.getLogStats(query);

            this.logger.info('Log statistics retrieved successfully', {
                component: 'LOGS_CONTROLLER',
                operation: 'GET_LOG_STATS',
                traceId,
                userId: req.user?.userId,
                totalLogs: stats.totalLogs
            } as any);

            res.status(200).json({
                success: true,
                data: stats
            });

        } catch (error: any) {
            this.logger.error('Failed to retrieve log statistics', error, {
                component: 'LOGS_CONTROLLER',
                operation: 'GET_LOG_STATS',
                traceId,
                userId: req.user?.userId
            } as any);

            res.status(500).json({
                success: false,
                message: 'Failed to retrieve log statistics',
                error: error.message,
                traceId
            });
        }
    }

    async analyzeLogPatterns(req: AuthenticatedRequest, res: Response): Promise<void> {
        const traceId = req.traceId || LoggingUtils.generateCorrelationId();
        
        try {
            this.logger.info('Analyzing log patterns', {
                component: 'LOGS_CONTROLLER',
                operation: 'ANALYZE_LOG_PATTERNS',
                traceId,
                userId: req.user?.userId
            } as any);

            const query: LogAnalysisDto = {
                days: parseInt(req.query.days as string) || 7,
                type: req.query.type as string || 'errors'
            };

            const analysis = await this.logsUseCases.analyzeLogPatterns(query);

            this.logger.info('Log pattern analysis completed', {
                component: 'LOGS_CONTROLLER',
                operation: 'ANALYZE_LOG_PATTERNS',
                traceId,
                userId: req.user?.userId,
                analysisType: query.type,
                totalEvents: analysis.summary.totalEvents
            } as any);

            res.status(200).json({
                success: true,
                data: analysis
            });

        } catch (error: any) {
            this.logger.error('Failed to analyze log patterns', error, {
                component: 'LOGS_CONTROLLER',
                operation: 'ANALYZE_LOG_PATTERNS',
                traceId,
                userId: req.user?.userId
            } as any);

            res.status(500).json({
                success: false,
                message: 'Failed to analyze log patterns',
                error: error.message,
                traceId
            });
        }
    }

    async getLogFileInfo(req: AuthenticatedRequest, res: Response): Promise<void> {
        const traceId = req.traceId || LoggingUtils.generateCorrelationId();
        
        try {
            this.logger.info('Retrieving log file information', {
                component: 'LOGS_CONTROLLER',
                operation: 'GET_LOG_FILE_INFO',
                traceId,
                userId: req.user?.userId
            } as any);

            const fileInfo = await this.logsUseCases.getLogFileInfo();

            res.status(200).json({
                success: true,
                data: {
                    files: fileInfo,
                    totalFiles: fileInfo.length,
                    totalSize: fileInfo.reduce((sum, file) => sum + file.size, 0)
                }
            });

        } catch (error: any) {
            this.logger.error('Failed to retrieve log file information', error, {
                component: 'LOGS_CONTROLLER',
                operation: 'GET_LOG_FILE_INFO',
                traceId,
                userId: req.user?.userId
            } as any);

            res.status(500).json({
                success: false,
                message: 'Failed to retrieve log file information',
                error: error.message,
                traceId
            });
        }
    }

    async exportLogs(req: AuthenticatedRequest, res: Response): Promise<void> {
        const traceId = req.traceId || LoggingUtils.generateCorrelationId();
        
        try {
            this.logger.info('Exporting logs', {
                component: 'LOGS_CONTROLLER',
                operation: 'EXPORT_LOGS',
                traceId,
                userId: req.user?.userId
            } as any);

            const query: LogQueryDto = {
                level: req.query.level as string,
                component: req.query.component as string,
                operation: req.query.operation as string,
                userId: req.query.userId as string,
                traceId: req.query.traceId as string,
                startDate: req.query.startDate as string,
                endDate: req.query.endDate as string,
                search: req.query.search as string
            };

            const csvData = await this.logsUseCases.exportLogs(query);

            // Log successful export
            LoggingUtils.logBusinessOperation(
                'LOGS',
                'export',
                'EXPORT',
                req.user?.userId,
                undefined,
                { 
                    filters: query,
                    exportSize: csvData.length
                }
            );

            const filename = `logs_export_${new Date().toISOString().split('T')[0]}.csv`;

            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            res.setHeader('X-Trace-ID', traceId);

            res.send(csvData);

        } catch (error: any) {
            this.logger.error('Failed to export logs', error, {
                component: 'LOGS_CONTROLLER',
                operation: 'EXPORT_LOGS',
                traceId,
                userId: req.user?.userId
            } as any);

            res.status(500).json({
                success: false,
                message: 'Failed to export logs',
                error: error.message,
                traceId
            });
        }
    }

    async getRecentErrors(req: AuthenticatedRequest, res: Response): Promise<void> {
        const traceId = req.traceId || LoggingUtils.generateCorrelationId();
        
        try {
            const hours = parseInt(req.query.hours as string) || 24;
            const startDate = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

            const query: LogQueryDto = {
                level: 'error',
                startDate,
                limit: 100,
                page: 1
            };

            const result = await this.logsUseCases.getLogs(query);

            res.status(200).json({
                success: true,
                data: {
                    errors: result.logs,
                    count: result.total,
                    period: `${hours} hours`
                }
            });

        } catch (error: any) {
            this.logger.error('Failed to retrieve recent errors', error, {
                component: 'LOGS_CONTROLLER',
                operation: 'GET_RECENT_ERRORS',
                traceId,
                userId: req.user?.userId
            } as any);

            res.status(500).json({
                success: false,
                message: 'Failed to retrieve recent errors',
                error: error.message,
                traceId
            });
        }
    }

    async getSystemHealth(req: AuthenticatedRequest, res: Response): Promise<void> {
        const traceId = req.traceId || LoggingUtils.generateCorrelationId();
        
        try {
            // Get error rate over last hour
            const lastHour = new Date(Date.now() - 60 * 60 * 1000).toISOString();
            const errorQuery: LogQueryDto = { level: 'error', startDate: lastHour, limit: 1000 };
            const warningQuery: LogQueryDto = { level: 'warn', startDate: lastHour, limit: 1000 };
            const allQuery: LogQueryDto = { startDate: lastHour, limit: 1000 };

            const [errors, warnings, allLogs] = await Promise.all([
                this.logsUseCases.getLogs(errorQuery),
                this.logsUseCases.getLogs(warningQuery),
                this.logsUseCases.getLogs(allQuery)
            ]);

            const errorRate = allLogs.total > 0 ? (errors.total / allLogs.total) * 100 : 0;
            const warningRate = allLogs.total > 0 ? (warnings.total / allLogs.total) * 100 : 0;

            let healthStatus = 'healthy';
            if (errorRate > 5) healthStatus = 'critical';
            else if (errorRate > 2 || warningRate > 10) healthStatus = 'warning';
            else if (errorRate > 1 || warningRate > 5) healthStatus = 'caution';

            res.status(200).json({
                success: true,
                data: {
                    status: healthStatus,
                    errorRate: Math.round(errorRate * 100) / 100,
                    warningRate: Math.round(warningRate * 100) / 100,
                    totalLogs: allLogs.total,
                    errors: errors.total,
                    warnings: warnings.total,
                    period: '1 hour',
                    timestamp: new Date().toISOString()
                }
            });

        } catch (error: any) {
            this.logger.error('Failed to retrieve system health', error, {
                component: 'LOGS_CONTROLLER',
                operation: 'GET_SYSTEM_HEALTH',
                traceId,
                userId: req.user?.userId
            } as any);

            res.status(500).json({
                success: false,
                message: 'Failed to retrieve system health',
                error: error.message,
                traceId
            });
        }
    }
}
