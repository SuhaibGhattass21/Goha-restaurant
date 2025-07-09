"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryExtraValidator = void 0;
const express_validator_1 = require("express-validator");
class CategoryExtraValidator {
    static createCategoryExtra() {
        return [
            (0, express_validator_1.body)("name")
                .notEmpty()
                .withMessage("Name is required")
                .isLength({ min: 2, max: 100 })
                .withMessage("Name must be between 2 and 100 characters")
                .trim(),
            (0, express_validator_1.body)("price")
                .notEmpty()
                .withMessage("Price is required")
                .isNumeric()
                .withMessage("Price must be a number")
                .custom((value) => {
                if (parseFloat(value) < 0) {
                    throw new Error("Price must be greater than or equal to 0");
                }
                return true;
            }),
            (0, express_validator_1.body)("category_id")
                .notEmpty()
                .withMessage("Category ID is required")
                .isUUID()
                .withMessage("Invalid category ID format"),
        ];
    }
    static updateCategoryExtra() {
        return [
            (0, express_validator_1.param)("id").isUUID().withMessage("Invalid category extra ID format"),
            (0, express_validator_1.body)("name")
                .optional()
                .isLength({ min: 2, max: 100 })
                .withMessage("Name must be between 2 and 100 characters")
                .trim(),
            (0, express_validator_1.body)("price")
                .optional()
                .isNumeric()
                .withMessage("Price must be a number")
                .custom((value) => {
                if (value !== undefined && parseFloat(value) < 0) {
                    throw new Error("Price must be greater than or equal to 0");
                }
                return true;
            }),
            (0, express_validator_1.body)("category_id")
                .optional()
                .isUUID()
                .withMessage("Invalid category ID format"),
        ];
    }
    static getCategoryExtraById() {
        return [(0, express_validator_1.param)("id").isUUID().withMessage("Invalid category extra ID format")];
    }
    static getCategoryExtrasByCategoryId() {
        return [(0, express_validator_1.param)("categoryId").isUUID().withMessage("Invalid category ID format")];
    }
    static deleteCategoryExtra() {
        return [(0, express_validator_1.param)("id").isUUID().withMessage("Invalid category extra ID format")];
    }
    static getCategoryExtras() {
        return [
            (0, express_validator_1.query)("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
            (0, express_validator_1.query)("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
        ];
    }
}
exports.CategoryExtraValidator = CategoryExtraValidator;
//# sourceMappingURL=category-extra.validator.js.map