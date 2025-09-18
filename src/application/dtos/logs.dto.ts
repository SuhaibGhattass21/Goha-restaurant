import { IsOptional, IsString, IsInt, Min, Max, IsDateString, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';

export class LogQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => parseInt(value))
  limit?: number = 50;

  @IsOptional()
  @IsString()
  @IsIn(['error', 'warn', 'info', 'debug', 'verbose', 'http'])
  level?: string;

  @IsOptional()
  @IsString()
  component?: string;

  @IsOptional()
  @IsString()
  operation?: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  traceId?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  search?: string;
}

export class LogStatsDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  component?: string;
}

export class LogAnalysisDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(30)
  @Transform(({ value }) => parseInt(value))
  days?: number = 7;

  @IsOptional()
  @IsString()
  @IsIn(['errors', 'performance', 'security', 'business'])
  type?: string = 'errors';
}

export class LogResponseDto {
  logs: LogEntry[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  component?: string;
  operation?: string;
  userId?: string;
  traceId?: string;
  ip?: string;
  userAgent?: string;
  responseTime?: number;
  statusCode?: number;
  error?: any;
  metadata?: any;
}

export interface LogStats {
  totalLogs: number;
  errorCount: number;
  warnCount: number;
  infoCount: number;
  debugCount: number;
  averageResponseTime?: number;
  topErrors: Array<{ message: string; count: number }>;
  topComponents: Array<{ component: string; count: number }>;
  hourlyDistribution: Array<{ hour: number; count: number }>;
}

export interface LogAnalysis {
  type: string;
  period: string;
  summary: {
    totalEvents: number;
    uniquePatterns: number;
    criticalEvents: number;
  };
  patterns: Array<{
    pattern: string;
    count: number;
    percentage: number;
    severity: 'low' | 'medium' | 'high' | 'critical';
  }>;
  trends: Array<{
    date: string;
    count: number;
  }>;
  recommendations: string[];
}
