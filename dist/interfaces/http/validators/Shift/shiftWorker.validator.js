"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftWorkerValidator = void 0;
const express_validator_1 = require("express-validator");
class ShiftWorkerValidator {
    static create() {
        return [
            (0, express_validator_1.body)("shift_id").isUUID().withMessage("Shift ID must be a valid UUID"),
            (0, express_validator_1.body)("worker_id").isUUID().withMessage("Worker ID must be a valid UUID"),
            (0, express_validator_1.body)("hourly_rate").isFloat({ gt: 0 }),
            (0, express_validator_1.body)("start_time").isISO8601().withMessage("Start time must be a valid ISO date")
        ];
    }
    static update() {
        return [(0, express_validator_1.param)("id").isUUID().withMessage("Invalid ID")];
    }
    static getById() {
        return [(0, express_validator_1.param)("id").isUUID().withMessage("Invalid ID")];
    }
    static getByShiftId() {
        return [(0, express_validator_1.param)("shiftId").isUUID().withMessage("Invalid Shift ID")];
    }
    static delete() {
        return [(0, express_validator_1.param)("id").isUUID().withMessage("Invalid ID")];
    }
}
exports.ShiftWorkerValidator = ShiftWorkerValidator;
//# sourceMappingURL=shiftWorker.validator.js.map