"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseValidator = void 0;
const express_validator_1 = require("express-validator");
class ExpenseValidator {
    static create() {
        return [
            (0, express_validator_1.body)("title").isString().withMessage("Title is required and must be a string"),
            (0, express_validator_1.body)("amount").isNumeric().withMessage("Amount must be a valid number"),
            (0, express_validator_1.body)("created_by").isUUID().withMessage("created_by must be a valid UUID"),
            (0, express_validator_1.body)("shift_id").isUUID().withMessage("shift_id must be a valid UUID"),
        ];
    }
    static update() {
        return [
            (0, express_validator_1.param)("id").isUUID().withMessage("Invalid expense ID"),
            (0, express_validator_1.body)("title").optional().isString().withMessage("Title must be a string"),
            (0, express_validator_1.body)("amount").optional().isNumeric().withMessage("Amount must be a valid number"),
        ];
    }
    static getById() {
        return [(0, express_validator_1.param)("id").isUUID().withMessage("Invalid expense ID")];
    }
    static delete() {
        return [(0, express_validator_1.param)("id").isUUID().withMessage("Invalid expense ID")];
    }
}
exports.ExpenseValidator = ExpenseValidator;
//# sourceMappingURL=expense.validator.js.map