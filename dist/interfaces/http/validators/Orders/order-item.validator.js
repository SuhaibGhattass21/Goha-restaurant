"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemValidator = void 0;
const express_validator_1 = require("express-validator");
class OrderItemValidator {
    static createOrderItem() {
        return [
            (0, express_validator_1.body)("order_id").isUUID().withMessage("Order ID must be a valid UUID"),
            (0, express_validator_1.body)("product_size_id").isUUID().withMessage("Product size ID must be a valid UUID"),
            (0, express_validator_1.body)("quantity").isInt({ min: 1 }).withMessage("Quantity must be a positive integer"),
            (0, express_validator_1.body)("unit_price")
                .isNumeric()
                .custom((value) => {
                if (Number(value) < 0) {
                    throw new Error("Unit price must be non-negative");
                }
                return true;
            })
                .withMessage("Unit price must be a valid number"),
            (0, express_validator_1.body)("special_instructions")
                .optional()
                .isLength({ max: 500 })
                .withMessage("Special instructions must not exceed 500 characters")
                .trim(),
            (0, express_validator_1.body)("extras").optional().isArray().withMessage("Extras must be an array"),
            (0, express_validator_1.body)("extras.*.extra_id") // Fixed: using extra_id
                .if((0, express_validator_1.body)("extras").exists())
                .isUUID()
                .withMessage("Extra ID must be a valid UUID"),
            (0, express_validator_1.body)("extras.*.price")
                .if((0, express_validator_1.body)("extras").exists())
                .isNumeric()
                .custom((value) => {
                if (Number(value) < 0) {
                    throw new Error("Extra price must be non-negative");
                }
                return true;
            })
                .withMessage("Extra price must be a valid number"),
        ];
    }
    static updateOrderItem() {
        return [
            (0, express_validator_1.param)("id").isUUID().withMessage("Invalid order item ID format"),
            (0, express_validator_1.body)("product_size_id").optional().isUUID().withMessage("Product size ID must be a valid UUID"),
            (0, express_validator_1.body)("quantity").optional().isInt({ min: 1 }).withMessage("Quantity must be a positive integer"),
            (0, express_validator_1.body)("unit_price")
                .optional()
                .isNumeric()
                .custom((value) => {
                if (Number(value) < 0) {
                    throw new Error("Unit price must be non-negative");
                }
                return true;
            })
                .withMessage("Unit price must be a valid number"),
            (0, express_validator_1.body)("special_instructions")
                .optional()
                .isLength({ max: 500 })
                .withMessage("Special instructions must not exceed 500 characters")
                .trim(),
        ];
    }
    static getOrderItemById() {
        return [(0, express_validator_1.param)("id").isUUID().withMessage("Invalid order item ID format")];
    }
    static getOrderItemsByOrderId() {
        return [(0, express_validator_1.param)("orderId").isUUID().withMessage("Invalid order ID format")];
    }
    static deleteOrderItem() {
        return [(0, express_validator_1.param)("id").isUUID().withMessage("Invalid order item ID format")];
    }
    static getOrderItems() {
        return [
            (0, express_validator_1.query)("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
            (0, express_validator_1.query)("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
        ];
    }
}
exports.OrderItemValidator = OrderItemValidator;
//# sourceMappingURL=order-item.validator.js.map