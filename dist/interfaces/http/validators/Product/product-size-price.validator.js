"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSizePriceValidator = void 0;
const express_validator_1 = require("express-validator");
class ProductSizePriceValidator {
    static createProductSizePrice() {
        return [
            (0, express_validator_1.body)("price")
                .notEmpty()
                .withMessage("Price is required")
                .isNumeric()
                .withMessage("Price must be a number")
                .custom((value) => {
                if (Number.parseFloat(value) < 0) {
                    throw new Error("Price must be a positive number");
                }
                return true;
            }),
            (0, express_validator_1.body)("product_id")
                .notEmpty()
                .withMessage("Product ID is required")
                .isUUID()
                .withMessage("Product ID must be a valid UUID"),
            (0, express_validator_1.body)("size_id")
                .notEmpty()
                .withMessage("Size ID is required")
                .isUUID()
                .withMessage("Size ID must be a valid UUID"),
        ];
    }
    static updateProductSizePrice() {
        return [
            (0, express_validator_1.param)("id").isUUID().withMessage("Invalid product size price ID format"),
            (0, express_validator_1.body)("price")
                .optional()
                .isNumeric()
                .withMessage("Price must be a number")
                .custom((value) => {
                if (value !== undefined && Number.parseFloat(value) < 0) {
                    throw new Error("Price must be a positive number");
                }
                return true;
            }),
            (0, express_validator_1.body)("product_id").optional().isUUID().withMessage("Product ID must be a valid UUID"),
            (0, express_validator_1.body)("size_id").optional().isUUID().withMessage("Size ID must be a valid UUID"),
        ];
    }
    static getProductSizePriceById() {
        return [(0, express_validator_1.param)("id").isUUID().withMessage("Invalid product size price ID format")];
    }
    static deleteProductSizePrice() {
        return [(0, express_validator_1.param)("id").isUUID().withMessage("Invalid product size price ID format")];
    }
    static getProductSizePrices() {
        return [
            (0, express_validator_1.query)("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
            (0, express_validator_1.query)("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
        ];
    }
    static getProductSizePricesByProduct() {
        return [
            (0, express_validator_1.param)("productId").isUUID().withMessage("Invalid product ID format"),
            (0, express_validator_1.query)("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer").toInt(),
            (0, express_validator_1.query)("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100").toInt(),
        ];
    }
}
exports.ProductSizePriceValidator = ProductSizePriceValidator;
//# sourceMappingURL=product-size-price.validator.js.map