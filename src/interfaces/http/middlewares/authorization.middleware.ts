import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware';
import { AppDataSource } from '../../../infrastructure/database/postgres/db';
import { User, UserPermission } from '../../../infrastructure/database/models';

export class AuthorizationMiddleware {
    private static async fetchCurrentPermissions(userId: string): Promise<string[]> {
        const repo = AppDataSource.getRepository(User);
        const user = await repo.findOne({
            where: { id: userId },
            relations: ['userPermissions', 'userPermissions.permission'],
        });
        if (!user || !user.userPermissions) return [];
        return (user.userPermissions as UserPermission[])
            .filter(up => !up.is_revoked)
            .map(up => up.permission.name);
    }

    static requirePermission(permission: string) {
        return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
                return;
            }

            const permissions = await AuthorizationMiddleware.fetchCurrentPermissions(req.user.userId);
            if (!permissions.includes(permission)) {
                res.status(403).json({
                    success: false,
                    message: `Permission '${permission}' required`
                });
                return;
            }

            next();
        };
    }

    static requireAnyPermission(permissions: string[]) {
        return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
                return;
            }

            const currentPermissions = await AuthorizationMiddleware.fetchCurrentPermissions(req.user.userId);
            const hasPermission = permissions.some(permission => currentPermissions.includes(permission));

            if (!hasPermission) {
                res.status(403).json({
                    success: false,
                    message: `One of these permissions required: ${permissions.join(', ')}`
                });
                return;
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
        return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
                return;
            }

            const resourceUserId = (req.params as any)[resourceUserIdField] || (req.body as any)[resourceUserIdField];

            if (resourceUserId !== req.user.userId) {
                const currentPermissions = await AuthorizationMiddleware.fetchCurrentPermissions(req.user.userId);
                if (!currentPermissions.includes('OWNER_ACCESS')) {
                    res.status(403).json({
                        success: false,
                        message: 'Access denied: Can only access own resources'
                    });
                    return;
                }
            }

            next();
        };
    }
}