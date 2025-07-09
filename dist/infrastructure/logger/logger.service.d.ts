import { ILogger } from './interfaces/logger.interface';
export declare class LoggerService implements ILogger {
    private logger;
    constructor();
    info(message: string, meta?: any): void;
    error(message: string, error?: Error, meta?: any): void;
    warn(message: string, meta?: any): void;
    debug(message: string, meta?: any): void;
}
