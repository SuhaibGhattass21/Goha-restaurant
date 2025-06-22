import { body, param, ValidationChain } from 'express-validator';

export class PermissionValidator {
    static create(): ValidationChain[] {
        return [
            body('name').notEmpty().isString(),
            body('description').optional().isString(),
            body('granted_by').isUUID(),
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
}
