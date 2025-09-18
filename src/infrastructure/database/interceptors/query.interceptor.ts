import { DataSource } from 'typeorm';
import { DatabaseLogger } from '../../logger/database/database-logger';
import { LoggingUtils } from '../../logger/utils/logging.utils';

export class QueryInterceptor {
    private static isInitialized = false;

    static initialize(dataSource: DataSource): void {
        if (QueryInterceptor.isInitialized) {
            return;
        }

        // Log database connection events
        dataSource.driver.connect().then(() => {
            DatabaseLogger.logConnection('CONNECT', {
                database: dataSource.options.database,
                host: (dataSource.options as any).host,
                port: (dataSource.options as any).port
            });
        }).catch((error) => {
            DatabaseLogger.logConnection('ERROR', error);
        });

        QueryInterceptor.isInitialized = true;
    }

    static extractTableName(query: string): string | undefined {
        const normalizedQuery = query.trim().toLowerCase();
        
        // Extract table name from common SQL operations
        const patterns = [
            /(?:from|into|update|join)\s+["`]?(\w+)["`]?/i,
            /insert\s+into\s+["`]?(\w+)["`]?/i,
            /delete\s+from\s+["`]?(\w+)["`]?/i
        ];

        for (const pattern of patterns) {
            const match = normalizedQuery.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }

        return undefined;
    }

    static logQuery(
        query: string,
        parameters: any[] = [],
        duration: number,
        tableName?: string,
        userId?: string
    ): void {
        DatabaseLogger.logQuery(query, parameters, Date.now() - duration, tableName, userId);
    }

    static logQueryError(
        query: string,
        error: Error,
        parameters: any[] = [],
        tableName?: string,
        userId?: string
    ): void {
        DatabaseLogger.logError(query, error, parameters, tableName, userId);
    }

    static createQueryTimer(query: string, tableName?: string, userId?: string): () => void {
        return DatabaseLogger.createQueryTimer(query, tableName, userId);
    }
}
