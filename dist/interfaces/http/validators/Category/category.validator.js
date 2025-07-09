"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidator = void 0;
const express_validator_1 = require("express-validator");
class CategoryValidator {
    static createCategory() {
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
        ];
    }
    static updateCategory() {
        return [
            (0, express_validator_1.param)("id").isUUID().withMessage("Invalid category ID format"),
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
        ];
    }
    static getCategoryById() {
        return [(0, express_validator_1.param)("id").isUUID().withMessage("Invalid category ID format")];
    }
    static deleteCategory() {
        return [(0, express_validator_1.param)("id").isUUID().withMessage("Invalid category ID format")];
    }
    static getCategories() {
        return [
            (0, express_validator_1.query)("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
            (0, express_validator_1.query)("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
        ];
    }
}
exports.CategoryValidator = CategoryValidator;
//# sourceMappingURL=category.validator.js.map