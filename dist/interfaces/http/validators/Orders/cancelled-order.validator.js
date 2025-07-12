"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelledOrderValidator = void 0;
const express_validator_1 = require("express-validator");
class CancelledOrderValidator {
    static createCancelledOrder() {
        return [
            (0, express_validator_1.body)("order_id").isUUID().withMessage("Order ID must be a valid UUID"),
            (0, express_validator_1.body)("cancelled_by").isUUID().withMessage("Cancelled By User ID must be a valid UUID"),
            (0, express_validator_1.body)("shift_id").isUUID().withMessage("Shift ID must be a valid UUID"),
            (0, express_validator_1.body)("reason").optional().isLength({ max: 500 }).withMessage("Reason must not exceed 500 characters").trim(),
        ];
    }
    static getCancelledOrderById() {
        return [(0, express_validator_1.param)("id").isUUID().withMessage("Invalid cancelled order ID format")];
    }
    static getCancelledOrderByOrderId() {
        return [(0, express_validator_1.param)("orderId").isUUID().withMessage("Invalid order ID format")];
    }
    static getCancelledOrdersByCancelledBy() {
        return [
            (0, express_validator_1.param)("userId").isUUID().withMessage("Invalid user ID format"),
            (0, express_validator_1.query)("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
            (0, express_validator_1.query)("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
        ];
    }
    static getCancelledOrdersByShiftId() {
        return [
            (0, express_validator_1.param)("shiftId").isUUID().withMessage("Invalid shift ID format"),
            (0, express_validator_1.query)("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
            (0, express_validator_1.query)("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
        ];
    }
    static getCancelledOrders() {
        return [
            (0, express_validator_1.query)("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
            (0, express_validator_1.query)("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
        ];
    }
}
exports.CancelledOrderValidator = CancelledOrderValidator;
//# sourceMappingURL=cancelled-order.validator.js.map