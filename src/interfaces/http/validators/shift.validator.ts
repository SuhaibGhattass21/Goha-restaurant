import { body, param, query, type ValidationChain } from 'express-validator';
export class ShiftValidator {
    static openShift(): ValidationChain[] {
        return [
            body('cashier_id').isUUID().withMessage('Cashier ID must be UUID'),
            body('shift_type').isIn(['morning', 'night']).withMessage('Invalid shift type'),
            body('workers').isArray({ min: 1 }).withMessage('At least one worker is required'),

            body('workers.*.user_id')
                .isUUID()
                .withMessage('Each worker must have a valid user_id'),

            body('workers.*.status')
                .isIn(['admin', 'cashier', 'chef', 'waiter', 'delivery', 'kitchen', 'steawer', 'kitchen_assistant'])
                .withMessage('Worker status must be one of the enums values'),

            body('workers.*.hourly_rate')
                .isFloat({ gt: 0 })
                .withMessage('Hourly rate must be a positive number'),
        ];
    }

    static updateShiftType(): ValidationChain[] {
        return [
            param('id').isUUID().withMessage('Invalid shift ID format'),

            body('admin_id')
                .notEmpty()
                .withMessage('Admin ID is required')
                .isUUID()
                .withMessage('Invalid admin ID format'),

            body('shift_type')
                .notEmpty()
                .withMessage('Shift type is required')
                .isIn(['morning', 'night'])
                .withMessage('Shift type must be either "morning" or "night"'),
        ];
    }

    static requestClose(): ValidationChain[] {
        return [
            param('id').isUUID().withMessage('Invalid shift ID format'),

            body('cashier_id')
                .notEmpty()
                .withMessage('Cashier ID is required')
                .isUUID()
                .withMessage('Invalid cashier ID format'),
        ];
    }

    static approveClose(): ValidationChain[] {
        return [
            param('id').isUUID().withMessage('Invalid shift ID format'),

            body('admin_id')
                .notEmpty()
                .withMessage('Admin ID is required')
                .isUUID()
                .withMessage('Invalid admin ID format'),
        ];
    }

    static getShiftById(): ValidationChain[] {
        return [param('id').isUUID().withMessage('Invalid shift ID format')];
    }

    static getShiftsByCashier(): ValidationChain[] {
        return [param('cashierId').isUUID().withMessage('Invalid cashier ID format')];
    }
}
