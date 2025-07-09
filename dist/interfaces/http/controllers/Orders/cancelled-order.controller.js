"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelledOrderController = void 0;
const express_validator_1 = require("express-validator");
class CancelledOrderController {
    constructor(cancelledOrderUseCases) {
        this.cancelledOrderUseCases = cancelledOrderUseCases;
    }
    async createCancelledOrder(req, res) {
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
            const cancelledOrderData = req.body;
            const cancelledOrder = await this.cancelledOrderUseCases.createCancelledOrder(cancelledOrderData);
            res.status(201).json({
                success: true,
                message: "Cancelled order created successfully",
                data: cancelledOrder,
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
    async getCancelledOrderById(req, res) {
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
            const cancelledOrder = await this.cancelledOrderUseCases.getCancelledOrderById(id);
            if (!cancelledOrder) {
                res.status(404).json({
                    success: false,
                    message: "Cancelled order not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: cancelledOrder,
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
    async getCancelledOrderByOrderId(req, res) {
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
            const cancelledOrder = await this.cancelledOrderUseCases.getCancelledOrderByOrderId(orderId);
            if (!cancelledOrder) {
                res.status(404).json({
                    success: false,
                    message: "Cancelled order for this order ID not found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: cancelledOrder,
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
    async getCancelledOrdersByCancelledBy(req, res) {
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
            const { userId } = req.params;
            const page = Number.parseInt(req.query.page) || 1;
            const limit = Number.parseInt(req.query.limit) || 10;
            const result = await this.cancelledOrderUseCases.getCancelledOrdersByCancelledBy(userId, page, limit);
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
    async getCancelledOrdersByShiftId(req, res) {
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
            const { shiftId } = req.params;
            const page = Number.parseInt(req.query.page) || 1;
            const limit = Number.parseInt(req.query.limit) || 10;
            const result = await this.cancelledOrderUseCases.getCancelledOrdersByShiftId(shiftId, page, limit);
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
    async getAllCancelledOrders(req, res) {
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
            const result = await this.cancelledOrderUseCases.getAllCancelledOrders(page, limit);
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
}
exports.CancelledOrderController = CancelledOrderController;
//# sourceMappingURL=cancelled-order.controller.js.map