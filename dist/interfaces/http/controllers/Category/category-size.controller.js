"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySizeController = void 0;
const express_validator_1 = require("express-validator");
class CategorySizeController {
    constructor(categorySizeUseCases) {
        this.categorySizeUseCases = categorySizeUseCases;
    }
    async createCategorySize(req, res) {
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
            const sizeData = req.body;
            const size = await this.categorySizeUseCases.createCategorySize(sizeData);
            res.status(201).json({
                success: true,
                message: "Category size created successfully",
                data: size,
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
            if (error.message === "Size with this name already exists for this category") {
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
    async getCategorySizeById(req, res) {
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
            const size = await this.categorySizeUseCases.getCategorySizeById(id);
            if (!size) {
                res.status(404).json({
                    success: false,
                    message: "Category size not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: size,
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
    async getCategorySizesByCategoryId(req, res) {
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
            console.log("🔍 Controller: Looking for sizes with categoryId:", categoryId);
            const sizes = await this.categorySizeUseCases.getCategorySizesByCategoryId(categoryId);
            console.log("🔍 Controller: Found sizes:", sizes.length);
            res.status(200).json({
                success: true,
                data: sizes,
            });
        }
        catch (error) {
            console.error("❌ Error in getCategorySizesByCategoryId:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }
    async getAllCategorySizes(req, res) {
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
            const result = await this.categorySizeUseCases.getAllCategorySizes(page, limit);
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
    async updateCategorySize(req, res) {
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
            const sizeData = req.body;
            const size = await this.categorySizeUseCases.updateCategorySize(id, sizeData);
            if (!size) {
                res.status(404).json({
                    success: false,
                    message: "Category size not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Category size updated successfully",
                data: size,
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
            if (error.message === "Size with this name already exists for this category") {
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
    async deleteCategorySize(req, res) {
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
            const deleted = await this.categorySizeUseCases.deleteCategorySize(id);
            if (!deleted) {
                res.status(404).json({
                    success: false,
                    message: "Category size not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Category size deleted successfully",
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
exports.CategorySizeController = CategorySizeController;
//# sourceMappingURL=category-size.controller.js.map