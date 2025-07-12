"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidator = void 0;
const express_validator_1 = require("express-validator");
class ProductValidator {
    static createProduct() {
        return [
            (0, express_validator_1.body)("name")
                .notEmpty()
                .withMessage("Name is required")
                .isLength({ min: 2, max: 100 })
                .withMessage("Name must be between 2 and 100 characters")
                .trim(),
            (0, express_validator_1.body)("description")
                .optional()
                .isLength({ max: 500 })
                .withMessage("Description must not exceed 500 characters")
                .trim(),
            (0, express_validator_1.body)("is_active").optional().isBoolean().withMessage("is_active must be a boolean"),
            (0, express_validator_1.body)("category_id")
                .notEmpty()
                .withMessage("Category ID is required")
                .isUUID()
                .withMessage("Category ID must be a valid UUID"),
        ];
    }
    static updateProduct() {
        return [
            (0, express_validator_1.param)("id").isUUID().withMessage("Invalid product ID format"),
            (0, express_validator_1.body)("name")
                .optional()
                .isLength({ min: 2, max: 100 })
                .withMessage("Name must be between 2 and 100 characters")
                .trim(),
            (0, express_validator_1.body)("description")
                .optional()
                .isLength({ max: 500 })
                .withMessage("Description must not exceed 500 characters")
                .trim(),
            (0, express_validator_1.body)("is_active").optional().isBoolean().withMessage("is_active must be a boolean"),
            (0, express_validator_1.body)("category_id").optional().isUUID().withMessage("Category ID must be a valid UUID"),
        ];
    }
    static getProductById() {
        return [(0, express_validator_1.param)("id").isUUID().withMessage("Invalid product ID format")];
    }
    static deleteProduct() {
        return [(0, express_validator_1.param)("id").isUUID().withMessage("Invalid product ID format")];
    }
    static getProducts() {
        return [
            (0, express_validator_1.query)("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
            (0, express_validator_1.query)("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
        ];
    }
    static getProductsByCategory() {
        return [
            (0, express_validator_1.param)("categoryId").isUUID().withMessage("Invalid category ID format"),
            (0, express_validator_1.query)("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
            (0, express_validator_1.query)("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
        ];
    }
}
exports.ProductValidator = ProductValidator;
//# sourceMappingURL=product.validator.js.map