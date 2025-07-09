"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalReceiptValidator = void 0;
const express_validator_1 = require("express-validator");
class ExternalReceiptValidator {
    static create() {
        return [
            (0, express_validator_1.body)("order_id").isUUID(),
            (0, express_validator_1.body)("shift_id").isUUID(),
            (0, express_validator_1.body)("cashier_id").isUUID(),
            (0, express_validator_1.body)("total_amount").isFloat({ min: 0 }),
            (0, express_validator_1.body)("payment_method").isIn(["cash", "card", "wallet"]),
        ];
    }
    static getById() {
        return [(0, express_validator_1.param)("id").isUUID()];
    }
}
exports.ExternalReceiptValidator = ExternalReceiptValidator;
//# sourceMappingURL=external-receipt.validator.js.map