import { Request, Response, NextFunction } from 'express';
import { AuthUseCases } from '../../../application/use-cases/auth.use-case';
export interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        username: string;
        permissions: string[];
    };
}
export declare class AuthMiddleware {
    private authUsecases;
    constructor(authUsecases: AuthUseCases);
    authenticate: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
    optionalAuth: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
}
