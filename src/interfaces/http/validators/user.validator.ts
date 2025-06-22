import { body, param, ValidationChain } from 'express-validator';

export class UserValidator {
  static createUser(): ValidationChain[] {
    return [
      body('username').notEmpty().isString(),
      body('fullName').notEmpty().isString(),
      body('hourRate').isFloat({ gt: 0 }),
      body('password').notEmpty().isString(),
      body('userPermissions').optional().isArray(),
      body('userPermissions.*').isUUID(),
    ];
  }

  static updateUser(): ValidationChain[] {
    return [
      param('id').isUUID().withMessage('Invalid user ID'),
      body('fullName').optional().isString(),
      body('hourRate').optional().isFloat({ gt: 0 }),
      body('password').optional().isString(),
      body('isActive').optional().isBoolean(),
      body('userPermissions').optional().isArray(),
      body('userPermissions.*').isUUID(),
    ];
  }

  static getUserById(): ValidationChain[] {
    return [param('id').isUUID().withMessage('Invalid user ID')];
  }

  static assignPermissions(): ValidationChain[] {
    return [
      body('userId').isUUID(),
      body('permissions').isArray({ min: 1 }),
      body('permissions.*').isUUID(),
    ];
  }
}
