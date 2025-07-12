"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySizeValidator = void 0;
const express_validator_1 = require("express-validator");
class CategorySizeValidator {
    static createCategorySize() {
        return [
            (0, express_validator_1.body)("size_name")
                .notEmpty()
                .withMessage("Size name is required")
                .isLength({ min: 1, max: 50 })
                .withMessage("Size name must be between 1 and 50 characters")
                .trim(),
            (0, express_validator_1.body)("category_id")
                .notEmpty()
                .withMessage("Category ID is required")
                .isUUID()
                .withMessage("Invalid category ID format"),
        ];
    }
    static updateCategorySize() {
        return [
            (0, express_validator_1.param)("id").isUUID().withMessage("Invalid category size ID format"),
            (0, express_validator_1.body)("size_name")
                .optional()
                .isLength({ min: 1, max: 50 })
                .withMessage("Size name must be between 1 and 50 characters")
                .trim(),
            (0, express_validator_1.body)("category_id")
                .optional()
                .isUUID()
                .withMessage("Invalid category ID format"),
        ];
    }
    static getCategorySizeById() {
        return [(0, express_validator_1.param)("id").isUUID().withMessage("Invalid category size ID format")];
    }
    static getCategorySizesByCategoryId() {
        return [(0, express_validator_1.param)("categoryId").isUUID().withMessage("Invalid category ID format")];
    }
    static deleteCategorySize() {
        return [(0, express_validator_1.param)("id").isUUID().withMessage("Invalid category size ID format")];
    }
    static getCategorySizes() {
        return [
            (0, express_validator_1.query)("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
            (0, express_validator_1.query)("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
        ];
    }
}
exports.CategorySizeValidator = CategorySizeValidator;
//# sourceMappingURL=category-size.validator.js.map