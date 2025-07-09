"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockTransactionValidator = void 0;
const express_validator_1 = require("express-validator");
const Stock_enums_1 = require("../../../../domain/enums/Stock.enums");
class StockTransactionValidator {
    static createStockTransaction() {
        return [
            (0, express_validator_1.body)("stock_item_id")
                .notEmpty()
                .withMessage("Stock item ID is required")
                .isUUID()
                .withMessage("Stock item ID must be a valid UUID"),
            (0, express_validator_1.body)("type")
                .notEmpty()
                .withMessage("Transaction type is required")
                .isIn(Object.values(Stock_enums_1.StockTransactionType))
                .withMessage("Invalid transaction type"),
            (0, express_validator_1.body)("quantity")
                .notEmpty()
                .withMessage("Quantity is required")
                .isNumeric()
                .withMessage("Quantity must be a number")
                .custom((value) => {
                if (value <= 0) {
                    throw new Error("Quantity must be greater than 0");
                }
                return true;
            }),
            (0, express_validator_1.body)("user_id")
                .notEmpty()
                .withMessage("User ID is required")
                .isUUID()
                .withMessage("User ID must be a valid UUID"),
            (0, express_validator_1.body)("shift_id")
                .notEmpty()
                .withMessage("Shift ID is required")
                .isUUID()
                .withMessage("Shift ID must be a valid UUID"),
        ];
    }
    static updateStockTransaction() {
        return [
            (0, express_validator_1.param)("id").isUUID().withMessage("Invalid stock transaction ID format"),
            (0, express_validator_1.body)("stock_item_id").optional().isUUID().withMessage("Stock item ID must be a valid UUID"),
            (0, express_validator_1.body)("type").optional().isIn(Object.values(Stock_enums_1.StockTransactionType)).withMessage("Invalid transaction type"),
            (0, express_validator_1.body)("quantity")
                .optional()
                .isNumeric()
                .withMessage("Quantity must be a number")
                .custom((value) => {
                if (value <= 0) {
                    throw new Error("Quantity must be greater than 0");
                }
                return true;
            }),
            (0, express_validator_1.body)("user_id").optional().isUUID().withMessage("User ID must be a valid UUID"),
            (0, express_validator_1.body)("shift_id").optional().isUUID().withMessage("Shift ID must be a valid UUID"),
        ];
    }
    static getStockTransactionById() {
        return [(0, express_validator_1.param)("id").isUUID().withMessage("Invalid stock transaction ID format")];
    }
    static deleteStockTransaction() {
        return [(0, express_validator_1.param)("id").isUUID().withMessage("Invalid stock transaction ID format")];
    }
    static getStockTransactions() {
        return [
            (0, express_validator_1.query)("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
            (0, express_validator_1.query)("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
        ];
    }
    static getTransactionsByStockItem() {
        return [(0, express_validator_1.param)("stockItemId").isUUID().withMessage("Invalid stock item ID format")];
    }
    static getTransactionsByShift() {
        return [(0, express_validator_1.param)("shiftId").isUUID().withMessage("Invalid shift ID format")];
    }
    static getTransactionsByUser() {
        return [(0, express_validator_1.param)("userId").isUUID().withMessage("Invalid user ID format")];
    }
    static getStockItemStats() {
        return [(0, express_validator_1.param)("stockItemId").isUUID().withMessage("Invalid stock item ID format")];
    }
}
exports.StockTransactionValidator = StockTransactionValidator;
//# sourceMappingURL=stock-transaction.validator.js.map