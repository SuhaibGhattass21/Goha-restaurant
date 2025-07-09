"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockItemController = void 0;
const express_validator_1 = require("express-validator");
class StockItemController {
    constructor(stockItemUseCases) {
        this.stockItemUseCases = stockItemUseCases;
    }
    async createStockItem(req, res) {
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
            const stockItemData = req.body;
            const stockItem = await this.stockItemUseCases.createStockItem(stockItemData);
            res.status(201).json({
                success: true,
                message: "Stock item created successfully",
                data: stockItem,
            });
        }
        catch (error) {
            if (error.message === "Stock item with this name already exists") {
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
    async getStockItemById(req, res) {
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
            const stockItem = await this.stockItemUseCases.getStockItemById(id);
            if (!stockItem) {
                res.status(404).json({
                    success: false,
                    message: "Stock item not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: stockItem,
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
    async getAllStockItems(req, res) {
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
            const result = await this.stockItemUseCases.getAllStockItems(page, limit);
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
    async updateStockItem(req, res) {
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
            const stockItemData = req.body;
            const stockItem = await this.stockItemUseCases.updateStockItem(id, stockItemData);
            if (!stockItem) {
                res.status(404).json({
                    success: false,
                    message: "Stock item not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Stock item updated successfully",
                data: stockItem,
            });
        }
        catch (error) {
            if (error.message === "Stock item with this name already exists") {
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
    async deleteStockItem(req, res) {
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
            const deleted = await this.stockItemUseCases.deleteStockItem(id);
            if (!deleted) {
                res.status(404).json({
                    success: false,
                    message: "Stock item not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Stock item deleted successfully",
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
    async getLowStockItems(req, res) {
        try {
            const lowStockItems = await this.stockItemUseCases.getLowStockItems();
            res.status(200).json({
                success: true,
                data: lowStockItems,
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
    async getStockItemsByType(req, res) {
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
            const { type } = req.params;
            const stockItems = await this.stockItemUseCases.getStockItemsByType(type);
            res.status(200).json({
                success: true,
                data: stockItems,
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
    async updateStockQuantity(req, res) {
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
            const { quantity } = req.body;
            const stockItem = await this.stockItemUseCases.updateStockQuantity(id, quantity);
            if (!stockItem) {
                res.status(404).json({
                    success: false,
                    message: "Stock item not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Stock quantity updated successfully",
                data: stockItem,
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
exports.StockItemController = StockItemController;
//# sourceMappingURL=stock-item.controller.js.map