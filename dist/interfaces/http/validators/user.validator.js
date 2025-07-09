"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const express_validator_1 = require("express-validator");
class UserValidator {
    static createUser() {
        return [
            (0, express_validator_1.body)('username').notEmpty().isString(),
            (0, express_validator_1.body)('fullName').notEmpty().isString(),
            (0, express_validator_1.body)('hourRate').isFloat({ gt: 0 }),
            (0, express_validator_1.body)('password').notEmpty().isString(),
            (0, express_validator_1.body)('userPermissions').optional().isArray(),
            (0, express_validator_1.body)('userPermissions.*').isUUID(),
        ];
    }
    static updateUser() {
        return [
            (0, express_validator_1.param)('id').isUUID().withMessage('Invalid user ID'),
            (0, express_validator_1.body)('fullName').optional().isString(),
            (0, express_validator_1.body)('hourRate').optional().isFloat({ gt: 0 }),
            (0, express_validator_1.body)('password').optional().isString(),
            (0, express_validator_1.body)('isActive').optional().isBoolean(),
            (0, express_validator_1.body)('userPermissions').optional().isArray(),
            (0, express_validator_1.body)('userPermissions.*').isUUID(),
        ];
    }
    static getUserById() {
        return [(0, express_validator_1.param)('id').isUUID().withMessage('Invalid user ID')];
    }
    static assignPermissions() {
        return [
            (0, express_validator_1.body)('userId').isUUID(),
            (0, express_validator_1.body)('permissions').isArray({ min: 1 }),
            (0, express_validator_1.body)('permissions.*').isUUID(),
        ];
    }
}
exports.UserValidator = UserValidator;
//# sourceMappingURL=user.validator.js.map