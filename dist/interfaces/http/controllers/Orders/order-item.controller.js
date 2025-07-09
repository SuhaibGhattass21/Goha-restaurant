"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemController = void 0;
const express_validator_1 = require("express-validator");
class OrderItemController {
    constructor(orderItemUseCases) {
        this.orderItemUseCases = orderItemUseCases;
    }
    async createOrderItem(req, res) {
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
            const orderItemData = req.body;
            const orderItem = await this.orderItemUseCases.createOrderItem(orderItemData);
            res.status(201).json({
                success: true,
                message: "Order item created successfully",
                data: orderItem,
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
    async getOrderItemById(req, res) {
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
            const orderItem = await this.orderItemUseCases.getOrderItemById(id);
            if (!orderItem) {
                res.status(404).json({
                    success: false,
                    message: "Order item not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: orderItem,
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
    async getOrderItemsByOrderId(req, res) {
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
            const { orderId } = req.params;
            const orderItems = await this.orderItemUseCases.getOrderItemsByOrderId(orderId);
            res.status(200).json({
                success: true,
                data: orderItems,
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
    async getAllOrderItems(req, res) {
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
            const result = await this.orderItemUseCases.getAllOrderItems(page, limit);
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
    async updateOrderItem(req, res) {
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
            const orderItemData = req.body;
            const orderItem = await this.orderItemUseCases.updateOrderItem(id, orderItemData);
            if (!orderItem) {
                res.status(404).json({
                    success: false,
                    message: "Order item not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Order item updated successfully",
                data: orderItem,
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
    async deleteOrderItem(req, res) {
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
            const deleted = await this.orderItemUseCases.deleteOrderItem(id);
            if (!deleted) {
                res.status(404).json({
                    success: false,
                    message: "Order item not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "Order item deleted successfully",
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
exports.OrderItemController = OrderItemController;
//# sourceMappingURL=order-item.controller.js.map