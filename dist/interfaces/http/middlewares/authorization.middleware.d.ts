import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware';
export declare class AuthorizationMiddleware {
    static requirePermission(permission: string): (req: AuthenticatedRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
    static requireAnyPermission(permissions: string[]): (req: AuthenticatedRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
    static requireRole(role: 'OWNER' | 'ADMIN' | 'CASHIER'): (req: AuthenticatedRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
    static requireOwnership(resourceUserIdField?: string): (req: AuthenticatedRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
}
