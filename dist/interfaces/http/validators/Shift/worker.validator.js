"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerValidator = void 0;
const express_validator_1 = require("express-validator");
class WorkerValidator {
    static create() {
        return [
            (0, express_validator_1.body)("full_name").isString().notEmpty(),
            (0, express_validator_1.body)("status").isString().notEmpty(),
            (0, express_validator_1.body)("base_hourly_rate").isNumeric().isFloat({ gt: 0 }),
            (0, express_validator_1.body)("user_id").optional().isUUID()
        ];
    }
    static update() {
        return [
            (0, express_validator_1.param)("id").isUUID(),
            (0, express_validator_1.body)("full_name").optional().isString(),
            (0, express_validator_1.body)("status").optional().isString(),
            (0, express_validator_1.body)("base_hourly_rate").optional().isNumeric(),
            (0, express_validator_1.body)("user_id").optional().isUUID(),
        ];
    }
    static getById() {
        return [(0, express_validator_1.param)("id").isUUID()];
    }
    static getAll() {
        return [
            (0, express_validator_1.query)("page").optional().isInt({ min: 1 }),
            (0, express_validator_1.query)("limit").optional().isInt({ min: 1, max: 100 }),
        ];
    }
    static delete() {
        return [(0, express_validator_1.param)("id").isUUID()];
    }
}
exports.WorkerValidator = WorkerValidator;
//# sourceMappingURL=worker.validator.js.map