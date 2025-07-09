"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const express_validator_1 = require("express-validator");
class ProductController {
    constructor(productUseCases) {
        this.productUseCases = productUseCases;
    }
    async createProduct(req, res) {
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
            const productData = req.body;
            const product = await this.productUseCases.createProduct(productData);
            res.status(201).json({
                success: true,
                message: "Product created successfully",
                data: product,
            });
        }
        catch (error) {
            if (error.message === "Category not found") {
                res.status(404).json({
                    success: false,
                    message: error.message,
                });
                return;
            }
            if (error.message === "Product with this name already exists in this category") {
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
    async getProductById(req, res) {
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
            const product = await this.productUseCases.getProductById(id);
            if (!product) {
                res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: product,
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
    async getAllProducts(req, res) {
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
            const result = await this.productUseCases.getAllProducts(page, limit);
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
    async getProductsByCategory(req, res) {
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
            const { categoryId } = req.params;
            const page = Number.parseInt(req.query.page) || 1;
            const limit = Number.parseInt(req.query.limit) || 10;
            const result = await this.productUseCases.getProductsByCategory(categoryId, page, limit);
            res.status(200).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            if (error.message === "Category not found") {
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
    async updateProduct(req, res) {
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
            const productData = req.body;
            const product = await this.productUseCases.updateProduct(id, productData);
            if (!product) {
                res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Product updated successfully",
                data: product,
            });
        }
        catch (error) {
            if (error.message === "Category not found") {
                res.status(404).json({
                    success: false,
                    message: error.message,
                });
                return;
            }
            if (error.message === "Product with this name already exists in this category") {
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
    async deleteProduct(req, res) {
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
            const deleted = await this.productUseCases.deleteProduct(id);
            if (!deleted) {
                res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Product deleted successfully",
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
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map