"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionValidator = void 0;
const express_validator_1 = require("express-validator");
class PermissionValidator {
    static create() {
        return [
            (0, express_validator_1.body)('name').notEmpty().isString(),
            (0, express_validator_1.body)('description').optional().isString(),
        ];
    }
    static update() {
        return [
            (0, express_validator_1.param)('id').isUUID(),
            (0, express_validator_1.body)('name').optional().isString(),
            (0, express_validator_1.body)('description').optional().isString(),
            (0, express_validator_1.body)('is_revoked').optional().isBoolean(),
        ];
    }
    static getById() {
        return [(0, express_validator_1.param)('id').isUUID()];
    }
    static getAdminId() {
        return [(0, express_validator_1.param)('adminId').isUUID().withMessage('Invalid admin ID')];
    }
    static getShiftId() {
        return [(0, express_validator_1.param)('shiftId').isUUID().withMessage('Invalid shift ID')];
    }
    static assignPermissions() {
        return [
            (0, express_validator_1.body)('userId').isUUID().withMessage('Invalid user ID'),
            (0, express_validator_1.body)('permissionIds').isArray().withMessage('Permission IDs must be an array'),
            // body('permissionIds.*').isUUID().withMessage('Each permission ID must be a valid UUID'),
            (0, express_validator_1.body)('grantedBy').isUUID().withMessage('Invalid granted_by user ID'),
        ];
    }
    static revokePermissions() {
        return [
            (0, express_validator_1.body)('userId').isUUID().withMessage('Invalid user ID'),
            (0, express_validator_1.body)('permissionIds').isArray().withMessage('Permission IDs must be an array'),
            (0, express_validator_1.body)('permissionIds.*').isUUID().withMessage('Each permission ID must be a valid UUID'),
        ];
    }
    static batchAssignPermission() {
        return [
            (0, express_validator_1.body)('permissionId').isUUID().withMessage('Invalid permission ID'),
            (0, express_validator_1.body)('userIds').isArray().withMessage('User IDs must be an array'),
            (0, express_validator_1.body)('userIds.*').isUUID().withMessage('Each user ID must be a valid UUID'),
            (0, express_validator_1.body)('granted_by').isUUID().withMessage('Invalid granted_by user ID'),
        ];
    }
    static checkMultiplePermissions() {
        return [
            (0, express_validator_1.param)('userId').isUUID().withMessage('Invalid user ID'),
            (0, express_validator_1.body)('permissionNames').isArray().withMessage('Permission names must be an array'),
            (0, express_validator_1.body)('permissionNames.*').isString().withMessage('Each permission name must be a string'),
        ];
    }
}
exports.PermissionValidator = PermissionValidator;
//# sourceMappingURL=permission.validator.js.map