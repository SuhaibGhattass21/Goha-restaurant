"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryExtraController = void 0;
const express_validator_1 = require("express-validator");
class CategoryExtraController {
    constructor(categoryExtraUseCases) {
        this.categoryExtraUseCases = categoryExtraUseCases;
    }
    async createCategoryExtra(req, res) {
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
            const extraData = req.body;
            const extra = await this.categoryExtraUseCases.createCategoryExtra(extraData);
            res.status(201).json({
                success: true,
                message: "Category extra created successfully",
                data: extra,
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
            if (error.message === "Extra with this name already exists for this category") {
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
    async getCategoryExtraById(req, res) {
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
            const extra = await this.categoryExtraUseCases.getCategoryExtraById(id);
            if (!extra) {
                res.status(404).json({
                    success: false,
                    message: "Category extra not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: extra,
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
    async getCategoryExtrasByCategoryId(req, res) {
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
            console.log("🔍 Controller: Looking for extras with categoryId:", categoryId);
            const extras = await this.categoryExtraUseCases.getCategoryExtrasByCategoryId(categoryId);
            console.log("🔍 Controller: Found extras:", extras.length);
            res.status(200).json({
                success: true,
                data: extras,
            });
        }
        catch (error) {
            console.error("❌ Error in getCategoryExtrasByCategoryId:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }
    async getAllCategoryExtras(req, res) {
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
            const result = await this.categoryExtraUseCases.getAllCategoryExtras(page, limit);
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
    async updateCategoryExtra(req, res) {
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
            const extraData = req.body;
            const extra = await this.categoryExtraUseCases.updateCategoryExtra(id, extraData);
            if (!extra) {
                res.status(404).json({
                    success: false,
                    message: "Category extra not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Category extra updated successfully",
                data: extra,
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
            if (error.message === "Extra with this name already exists for this category") {
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
    async deleteCategoryExtra(req, res) {
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
            const deleted = await this.categoryExtraUseCases.deleteCategoryExtra(id);
            if (!deleted) {
                res.status(404).json({
                    success: false,
                    message: "Category extra not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Category extra deleted successfully",
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
exports.CategoryExtraController = CategoryExtraController;
//# sourceMappingURL=category-extra.controller.js.map