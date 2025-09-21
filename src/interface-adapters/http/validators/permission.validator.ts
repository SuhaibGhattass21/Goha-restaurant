import { body, param, ValidationChain } from 'express-validator';

export class PermissionValidator {
    static create(): ValidationChain[] {
        return [
            body('name').notEmpty().isString(),
            body('description').optional().isString(),
        ];
    }

    static update(): ValidationChain[] {
        return [
            param('id').isUUID(),
            body('name').optional().isString(),
            body('description').optional().isString(),
            body('is_revoked').optional().isBoolean(),
        ];
    }

    static getById(): ValidationChain[] {
        return [param('id').isUUID()];
    }

    static getAdminId(): ValidationChain[] {
        return [param('adminId').isUUID().withMessage('Invalid admin ID')];
    }

    static getShiftId(): ValidationChain[] {
        return [param('shiftId').isUUID().withMessage('Invalid shift ID')];
    }

    static assignPermissions(): ValidationChain[] {
        return [
            body('userId').isUUID().withMessage('Invalid user ID'),
            body('permissionIds').isArray().withMessage('Permission IDs must be an array'),
            // body('permissionIds.*').isUUID().withMessage('Each permission ID must be a valid UUID'),
            body('grantedBy').isUUID().withMessage('Invalid granted_by user ID'),
        ];
    }

    static revokePermissions(): ValidationChain[] {
        return [
            body('userId').isUUID().withMessage('Invalid user ID'),
            body('permissionIds').isArray().withMessage('Permission IDs must be an array'),
            body('permissionIds.*').isUUID().withMessage('Each permission ID must be a valid UUID'),
        ];
    }

    static batchAssignPermission(): ValidationChain[] {
        return [
            body('permissionId').isUUID().withMessage('Invalid permission ID'),
            body('userIds').isArray().withMessage('User IDs must be an array'),
            body('userIds.*').isUUID().withMessage('Each user ID must be a valid UUID'),
            body('granted_by').isUUID().withMessage('Invalid granted_by user ID'),
        ];
    }

    static checkMultiplePermissions(): ValidationChain[] {
        return [
            param('userId').isUUID().withMessage('Invalid user ID'),
            body('permissionNames').isArray().withMessage('Permission names must be an array'),
            body('permissionNames.*').isString().withMessage('Each permission name must be a string'),
        ];
    }
}
