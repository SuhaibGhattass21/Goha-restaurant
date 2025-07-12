"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidator = void 0;
const express_validator_1 = require("express-validator");
const Order_enums_1 = require("../../../../domain/enums/Order.enums");
class OrderValidator {
    static createOrder() {
        return [
            (0, express_validator_1.body)("cashier_id").isUUID().withMessage("Cashier ID must be a valid UUID"),
            (0, express_validator_1.body)("shift_id").isUUID().withMessage("Shift ID must be a valid UUID"),
            (0, express_validator_1.body)("table_number")
                .optional()
                .isLength({ min: 1, max: 20 })
                .withMessage("Table number must be between 1 and 20 characters")
                .trim(),
            (0, express_validator_1.body)("order_type")
                .isIn(Object.values(Order_enums_1.OrderType))
                .withMessage(`Order type must be one of: ${Object.values(Order_enums_1.OrderType).join(", ")}`),
            (0, express_validator_1.body)("customer_name")
                .optional()
                .isLength({ min: 1, max: 100 })
                .withMessage("Customer name must be between 1 and 100 characters")
                .trim(),
            (0, express_validator_1.body)("customer_phone").optional().isMobilePhone("any").withMessage("Customer phone must be a valid phone number"),
            (0, express_validator_1.body)("items").isArray({ min: 1 }).withMessage("Order must have at least one item"),
            (0, express_validator_1.body)("items.*.product_size_id").isUUID().withMessage("Product size ID must be a valid UUID"),
            (0, express_validator_1.body)("items.*.quantity").isInt({ min: 1 }).withMessage("Quantity must be a positive integer"),
            (0, express_validator_1.body)("items.*.unit_price")
                .isNumeric()
                .custom((value) => {
                if (Number(value) < 0) {
                    throw new Error("Unit price must be non-negative");
                }
                return true;
            })
                .withMessage("Unit price must be a valid number"),
            (0, express_validator_1.body)("items.*.special_instructions")
                .optional()
                .isLength({ max: 500 })
                .withMessage("Special instructions must not exceed 500 characters")
                .trim(),
            (0, express_validator_1.body)("items.*.extras").optional().isArray().withMessage("Extras must be an array"),
            // THIS LINE WAS THE PROBLEM:
            // It was previously 'items.*.extras.*.category_extra_id'
            (0, express_validator_1.body)("items.*.extras.*.extra_id") // FIXED: Changed to 'extra_id'
                .if((0, express_validator_1.body)("items.*.extras").exists())
                .isUUID()
                .withMessage("Extra ID must be a valid UUID"), // Updated message
            (0, express_validator_1.body)("items.*.extras.*.price")
                .if((0, express_validator_1.body)("items.*.extras").exists())
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
    static updateOrder() {
        return [
            (0, express_validator_1.param)("id").isUUID().withMessage("Invalid order ID format"),
            (0, express_validator_1.body)("table_number")
                .optional()
                .isLength({ min: 1, max: 20 })
                .withMessage("Table number must be between 1 and 20 characters")
                .trim(),
            (0, express_validator_1.body)("order_type")
                .optional()
                .isIn(Object.values(Order_enums_1.OrderType))
                .withMessage(`Order type must be one of: ${Object.values(Order_enums_1.OrderType).join(", ")}`),
            (0, express_validator_1.body)("status")
                .optional()
                .isIn(Object.values(Order_enums_1.OrderStatus))
                .withMessage(`Status must be one of: ${Object.values(Order_enums_1.OrderStatus).join(", ")}`),
            (0, express_validator_1.body)("customer_name")
                .optional()
                .isLength({ min: 1, max: 100 })
                .withMessage("Customer name must be between 1 and 100 characters")
                .trim(),
            (0, express_validator_1.body)("customer_phone").optional().isMobilePhone("any").withMessage("Customer phone must be a valid phone number"),
        ];
    }
    static updateOrderStatus() {
        return [
            (0, express_validator_1.param)("id").isUUID().withMessage("Invalid order ID format"),
            (0, express_validator_1.body)("status")
                .isIn(Object.values(Order_enums_1.OrderStatus))
                .withMessage(`Status must be one of: ${Object.values(Order_enums_1.OrderStatus).join(", ")}`),
        ];
    }
    static getOrderById() {
        return [(0, express_validator_1.param)("id").isUUID().withMessage("Invalid order ID format")];
    }
    static getOrdersByShiftId() {
        return [(0, express_validator_1.param)("shiftId").isUUID().withMessage("Invalid shift ID format")];
    }
    static getOrdersByCashierId() {
        return [
            (0, express_validator_1.param)("cashierId").isUUID().withMessage("Invalid cashier ID format"),
            (0, express_validator_1.query)("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
            (0, express_validator_1.query)("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
        ];
    }
    static getOrdersByStatus() {
        return [
            (0, express_validator_1.param)("status")
                .isIn(Object.values(Order_enums_1.OrderStatus))
                .withMessage(`Status must be one of: ${Object.values(Order_enums_1.OrderStatus).join(", ")}`),
            (0, express_validator_1.query)("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
            (0, express_validator_1.query)("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
        ];
    }
    static getOrdersByType() {
        return [
            (0, express_validator_1.param)("type")
                .isIn(Object.values(Order_enums_1.OrderType))
                .withMessage(`Type must be one of: ${Object.values(Order_enums_1.OrderType).join(", ")}`),
            (0, express_validator_1.query)("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
            (0, express_validator_1.query)("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
        ];
    }
    static getOrdersByDateRange() {
        return [
            (0, express_validator_1.query)("startDate").isISO8601().withMessage("Start date must be a valid ISO 8601 date"),
            (0, express_validator_1.query)("endDate").isISO8601().withMessage("End date must be a valid ISO 8601 date"),
            (0, express_validator_1.query)("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
            (0, express_validator_1.query)("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
        ];
    }
    static deleteOrder() {
        return [(0, express_validator_1.param)("id").isUUID().withMessage("Invalid order ID format")];
    }
    static getOrders() {
        return [
            (0, express_validator_1.query)("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
            (0, express_validator_1.query)("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
        ];
    }
    static getOrderStats() {
        return [
            (0, express_validator_1.query)("shiftId").optional().isUUID().withMessage("Shift ID must be a valid UUID"),
            (0, express_validator_1.query)("startDate").optional().isISO8601().withMessage("Start date must be a valid ISO 8601 date"),
            (0, express_validator_1.query)("endDate").optional().isISO8601().withMessage("End date must be a valid ISO 8601 date"),
        ];
    }
    static recalculateOrderTotal() {
        return [(0, express_validator_1.param)("id").isUUID().withMessage("Invalid order ID format")];
    }
}
exports.OrderValidator = OrderValidator;
//# sourceMappingURL=order.validator.js.map