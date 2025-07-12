"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftValidator = void 0;
const express_validator_1 = require("express-validator");
const Shift_enums_1 = require("../../../../domain/enums/Shift.enums");
class ShiftValidator {
    static open() {
        return [
            (0, express_validator_1.body)('opened_by').isUUID(),
            (0, express_validator_1.body)('shift_type').isIn(Object.values(Shift_enums_1.ShiftType)),
            (0, express_validator_1.body)('workers').isArray(),
        ];
    }
    static updateType() {
        return [
            (0, express_validator_1.param)('id').isUUID(),
            (0, express_validator_1.body)('shift_type').isIn(Object.values(Shift_enums_1.ShiftType)),
            (0, express_validator_1.body)('admin_id').isUUID()
        ];
    }
    static requestClose() {
        return [
            (0, express_validator_1.param)('id').isUUID(),
            (0, express_validator_1.body)('closed_by').isUUID()
        ];
    }
    static approveClose() {
        return [
            (0, express_validator_1.param)('id').isUUID(),
            (0, express_validator_1.body)('approved_by_admin_id').isUUID()
        ];
    }
    static getByStatus() {
        return [
            (0, express_validator_1.param)("status")
                .isIn(Object.values(Shift_enums_1.ShiftStatus))
                .withMessage(`Status must be one of: ${Object.values(Shift_enums_1.ShiftStatus).join(", ")}`),
        ];
    }
    static getById() {
        return [(0, express_validator_1.param)('id').isUUID()];
    }
    static getByCashier() {
        return [(0, express_validator_1.param)('cashierId').isUUID()];
    }
}
exports.ShiftValidator = ShiftValidator;
//# sourceMappingURL=shift.validator.js.map