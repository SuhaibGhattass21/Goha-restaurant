import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AuthUseCases } from '../../../application/use-cases/auth.use-case';

export interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        username: string;
        permissions: string[];
    };
}

export class AuthMiddleware {
    constructor(private authUsecases: AuthUseCases) { }

    static authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                res.status(401).json({
                    success: false,
                    message: 'Access token required'
                });
                return;
            }

            const token = authHeader.substring(7);
            const decoded = this.authUsecases.verifyToken(token);

            req.user = {
                userId: decoded.userId,
                username: decoded.username,
                permissions: decoded.permissions || []
            };

            next();
        } catch (error: any) {
            res.status(401).json({
                success: false,
                message: 'Invalid or expired token'
            });
            return;
        }
    };

    optionalAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization;

            if (authHeader && authHeader.startsWith('Bearer ')) {
                const token = authHeader.substring(7);
                const decoded = this.authUsecases.verifyToken(token);

                req.user = {
                    userId: decoded.userId,
                    username: decoded.username,
                    permissions: decoded.permissions || []
                };
            }

            next();
        } catch (error) {
            next();
        }
    };
}