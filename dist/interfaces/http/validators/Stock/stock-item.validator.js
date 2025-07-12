"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockItemValidator = void 0;
const express_validator_1 = require("express-validator");
const Stock_enums_1 = require("../../../../domain/enums/Stock.enums");
class StockItemValidator {
    static createStockItem() {
        return [
            (0, express_validator_1.body)("name")
                .notEmpty()
                .withMessage("Name is required")
                .isLength({ min: 2, max: 100 })
                .withMessage("Name must be between 2 and 100 characters")
                .trim(),
            (0, express_validator_1.body)("type")
                .notEmpty()
                .withMessage("Type is required")
                .isIn(Object.values(Stock_enums_1.StockItemType))
                .withMessage("Invalid stock item type"),
            (0, express_validator_1.body)("unit")
                .notEmpty()
                .withMessage("Unit is required")
                .isLength({ min: 1, max: 20 })
                .withMessage("Unit must be between 1 and 20 characters")
                .trim(),
            (0, express_validator_1.body)("current_quantity")
                .notEmpty()
                .withMessage("Current quantity is required")
                .isNumeric()
                .withMessage("Current quantity must be a number")
                .custom((value) => {
                if (value < 0) {
                    throw new Error("Current quantity must be non-negative");
                }
                return true;
            }),
            (0, express_validator_1.body)("minimum_value")
                .notEmpty()
                .withMessage("Minimum value is required")
                .isNumeric()
                .withMessage("Minimum value must be a number")
                .custom((value) => {
                if (value < 0) {
                    throw new Error("Minimum value must be non-negative");
                }
                return true;
            }),
            (0, express_validator_1.body)("status")
                .notEmpty()
                .withMessage("Status is required")
                .isIn(Object.values(Stock_enums_1.StockItemStatus))
                .withMessage("Invalid stock item status"),
        ];
    }
    static updateStockItem() {
        return [
            (0, express_validator_1.param)("id").isUUID().withMessage("Invalid stock item ID format"),
            (0, express_validator_1.body)("name")
                .optional()
                .isLength({ min: 2, max: 100 })
                .withMessage("Name must be between 2 and 100 characters")
                .trim(),
            (0, express_validator_1.body)("type").optional().isIn(Object.values(Stock_enums_1.StockItemType)).withMessage("Invalid stock item type"),
            (0, express_validator_1.body)("unit")
                .optional()
                .isLength({ min: 1, max: 20 })
                .withMessage("Unit must be between 1 and 20 characters")
                .trim(),
            (0, express_validator_1.body)("current_quantity")
                .optional()
                .isNumeric()
                .withMessage("Current quantity must be a number")
                .custom((value) => {
                if (value < 0) {
                    throw new Error("Current quantity must be non-negative");
                }
                return true;
            }),
            (0, express_validator_1.body)("minimum_value")
                .optional()
                .isNumeric()
                .withMessage("Minimum value must be a number")
                .custom((value) => {
                if (value < 0) {
                    throw new Error("Minimum value must be non-negative");
                }
                return true;
            }),
            (0, express_validator_1.body)("status").optional().isIn(Object.values(Stock_enums_1.StockItemStatus)).withMessage("Invalid stock item status"),
        ];
    }
    static getStockItemById() {
        return [(0, express_validator_1.param)("id").isUUID().withMessage("Invalid stock item ID format")];
    }
    static deleteStockItem() {
        return [(0, express_validator_1.param)("id").isUUID().withMessage("Invalid stock item ID format")];
    }
    static getStockItems() {
        return [
            (0, express_validator_1.query)("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
            (0, express_validator_1.query)("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
        ];
    }
    static getStockItemsByType() {
        return [
            (0, express_validator_1.param)("type")
                .notEmpty()
                .withMessage("Type is required")
                .isIn(Object.values(Stock_enums_1.StockItemType))
                .withMessage("Invalid stock item type"),
        ];
    }
    static updateStockQuantity() {
        return [
            (0, express_validator_1.param)("id").isUUID().withMessage("Invalid stock item ID format"),
            (0, express_validator_1.body)("quantity")
                .notEmpty()
                .withMessage("Quantity is required")
                .isNumeric()
                .withMessage("Quantity must be a number")
                .custom((value) => {
                if (value < 0) {
                    throw new Error("Quantity must be non-negative");
                }
                return true;
            }),
        ];
    }
}
exports.StockItemValidator = StockItemValidator;
//# sourceMappingURL=stock-item.validator.js.map