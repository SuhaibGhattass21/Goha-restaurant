import { ValidationChain } from 'express-validator';
export declare class PermissionValidator {
    static create(): ValidationChain[];
    static update(): ValidationChain[];
    static getById(): ValidationChain[];
    static getAdminId(): ValidationChain[];
    static getShiftId(): ValidationChain[];
    static assignPermissions(): ValidationChain[];
    static revokePermissions(): ValidationChain[];
    static batchAssignPermission(): ValidationChain[];
    static checkMultiplePermissions(): ValidationChain[];
}
