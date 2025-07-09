import { Request, Response, NextFunction } from 'express';
export declare class LoggingMiddleware {
    private logger;
    constructor();
    logRequest: (req: Request, res: Response, next: NextFunction) => void;
}
