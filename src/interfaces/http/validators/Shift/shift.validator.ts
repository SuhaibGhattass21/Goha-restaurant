import { body, param } from 'express-validator';
import { ShiftType, ShiftStatus } from '../../../../domain/enums/Shift.enums';

export class ShiftValidator {
    static open() {
        return [
            body('opened_by').isUUID(),
            body('shift_type').isIn(Object.values(ShiftType)),
            body('workers').isArray(),
        ];
    }

    static updateType() {
        return [
            param('id').isUUID(),
            body('shift_type').isIn(Object.values(ShiftType)),
            body('admin_id').isUUID()
        ];
    }

    static requestClose() {
        return [
            param('id').isUUID(),
            body('closed_by').isUUID()
        ];
    }

    static approveClose() {
        return [
            param('id').isUUID(),
            body('approved_by_admin_id').isUUID()
        ];
    }

    static getByStatus() {
        return [
            param("status")
                .isIn(Object.values(ShiftStatus))
                .withMessage(`Status must be one of: ${Object.values(ShiftStatus).join(", ")}`),
        ];
    }
    static getById() {
        return [param('id').isUUID()];
    }

    static getByCashier() {
        return [param('cashierId').isUUID()];
    }
}
