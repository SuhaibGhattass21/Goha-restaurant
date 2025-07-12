"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSizePriceController = void 0;
const express_validator_1 = require("express-validator");
class ProductSizePriceController {
    constructor(productSizePriceUseCases) {
        this.productSizePriceUseCases = productSizePriceUseCases;
    }
    async createProductSizePrice(req, res) {
        try {
            // Check for validation errors
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: errors.array(),
                });
                return;
            }
            const productSizePriceData = req.body;
            const productSizePrice = await this.productSizePriceUseCases.createProductSizePrice(productSizePriceData);
            res.status(201).json({
                success: true,
                message: "Product size price created successfully",
                data: productSizePrice,
            });
        }
        catch (error) {
            if (error.message === "Product not found" || error.message === "Category size not found") {
                res.status(404).json({
                    success: false,
                    message: error.message,
                });
                return;
            }
            if (error.message === "Price for this product and size combination already exists") {
                res.status(409).json({
                    success: false,
                    message: error.message,
                });
                return;
            }
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }
    async getProductSizePriceById(req, res) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: errors.array(),
                });
                return;
            }
            const { id } = req.params;
            const productSizePrice = await this.productSizePriceUseCases.getProductSizePriceById(id);
            if (!productSizePrice) {
                res.status(404).json({
                    success: false,
                    message: "Product size price not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: productSizePrice,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }
    async getAllProductSizePrices(req, res) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: errors.array(),
                });
                return;
            }
            const page = Number.parseInt(req.query.page) || 1;
            const limit = Number.parseInt(req.query.limit) || 10;
            const result = await this.productSizePriceUseCases.getAllProductSizePrices(page, limit);
            res.status(200).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }
    async getProductSizePricesByProduct(req, res) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: errors.array(),
                });
                return;
            }
            const { productId } = req.params;
            const page = Number.parseInt(req.query.page) || 1;
            const limit = Number.parseInt(req.query.limit) || 10;
            const result = await this.productSizePriceUseCases.getProductSizePricesByProduct(productId, page, limit);
            res.status(200).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            if (error.message === "Product not found") {
                res.status(404).json({
                    success: false,
                    message: error.message,
                });
                return;
            }
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }
    async updateProductSizePrice(req, res) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: errors.array(),
                });
                return;
            }
            const { id } = req.params;
            const productSizePriceData = req.body;
            const productSizePrice = await this.productSizePriceUseCases.updateProductSizePrice(id, productSizePriceData);
            if (!productSizePrice) {
                res.status(404).json({
                    success: false,
                    message: "Product size price not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Product size price updated successfully",
                data: productSizePrice,
            });
        }
        catch (error) {
            if (error.message === "Product not found" || error.message === "Category size not found") {
                res.status(404).json({
                    success: false,
                    message: error.message,
                });
                return;
            }
            if (error.message === "Price for this product and size combination already exists") {
                res.status(409).json({
                    success: false,
                    message: error.message,
                });
                return;
            }
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }
    async deleteProductSizePrice(req, res) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: errors.array(),
                });
                return;
            }
            const { id } = req.params;
            const deleted = await this.productSizePriceUseCases.deleteProductSizePrice(id);
            if (!deleted) {
                res.status(404).json({
                    success: false,
                    message: "Product size price not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Product size price deleted successfully",
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }
}
exports.ProductSizePriceController = ProductSizePriceController;
//# sourceMappingURL=product-size-price.controller.js.map