import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware';

export class AuthorizationMiddleware {
    static requirePermission(permission: string) {
        return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
                return; // Return early instead of returning the response
            }

            if (!req.user.permissions.includes(permission)) {
                res.status(403).json({
                    success: false,
                    message: `Permission '${permission}' required`
                });
                return; // Return early instead of returning the response
            }

            next();
        };
    }

    static requireAnyPermission(permissions: string[]) {
        return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
                return; // Return early instead of returning the response
            }

            const hasPermission = permissions.some(permission =>
                req.user!.permissions.includes(permission)
            );

            if (!hasPermission) {
                res.status(403).json({
                    success: false,
                    message: `One of these permissions required: ${permissions.join(', ')}`
                });
                return; // Return early instead of returning the response
            }

            next();
        };
    }

    // Role-based authorization
    static requireRole(role: 'OWNER' | 'ADMIN' | 'CASHIER') {
        const rolePermissions = {
            OWNER: ['OWNER_ACCESS'],
            ADMIN: ['ADMIN_ACCESS', 'MANAGE_INVENTORY', 'MANAGE_SHIFTS'],
            CASHIER: ['CASHIER_ACCESS', 'CREATE_ORDERS']
        };

        return AuthorizationMiddleware.requireAnyPermission(rolePermissions[role]);
    }

    static requireOwnership(resourceUserIdField: string = 'userId') {
        return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
                return; // Return early instead of returning the response
            }

            const resourceUserId = req.params[resourceUserIdField] || req.body[resourceUserIdField];

            if (resourceUserId !== req.user.userId && !req.user.permissions.includes('OWNER_ACCESS')) {
                res.status(403).json({
                    success: false,
                    message: 'Access denied: Can only access own resources'
                });
                return; // Return early instead of returning the response
            }

            next();
        };
    }
}