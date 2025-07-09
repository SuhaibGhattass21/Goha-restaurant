"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelledOrderRoutes = void 0;
const express_1 = require("express");
const cancelled_order_validator_1 = require("../../validators/Orders/cancelled-order.validator");
class CancelledOrderRoutes {
    constructor(cancelledOrderController) {
        this.router = (0, express_1.Router)();
        this.cancelledOrderController = cancelledOrderController;
        this.initializeRoutes();
    }
    initializeRoutes() {
        // POST /cancelled-orders - Create a new cancelled order record
        this.router.post("/", cancelled_order_validator_1.CancelledOrderValidator.createCancelledOrder(), this.cancelledOrderController.createCancelledOrder.bind(this.cancelledOrderController));
        // GET /cancelled-orders - Get all cancelled orders with pagination
        this.router.get("/", cancelled_order_validator_1.CancelledOrderValidator.getCancelledOrders(), this.cancelledOrderController.getAllCancelledOrders.bind(this.cancelledOrderController));
        // GET /cancelled-orders/:id - Get cancelled order by ID
        this.router.get("/:id", cancelled_order_validator_1.CancelledOrderValidator.getCancelledOrderById(), this.cancelledOrderController.getCancelledOrderById.bind(this.cancelledOrderController));
        // GET /cancelled-orders/order/:orderId - Get cancelled order by original order ID
        this.router.get("/order/:orderId", cancelled_order_validator_1.CancelledOrderValidator.getCancelledOrderByOrderId(), this.cancelledOrderController.getCancelledOrderByOrderId.bind(this.cancelledOrderController));
        // GET /cancelled-orders/user/:userId - Get cancelled orders by the user who cancelled them
        this.router.get("/user/:userId", cancelled_order_validator_1.CancelledOrderValidator.getCancelledOrdersByCancelledBy(), this.cancelledOrderController.getCancelledOrdersByCancelledBy.bind(this.cancelledOrderController));
        // GET /cancelled-orders/shift/:shiftId - Get cancelled orders by shift ID
        this.router.get("/shift/:shiftId", cancelled_order_validator_1.CancelledOrderValidator.getCancelledOrdersByShiftId(), this.cancelledOrderController.getCancelledOrdersByShiftId.bind(this.cancelledOrderController));
    }
    getRouter() {
        return this.router;
    }
}
exports.CancelledOrderRoutes = CancelledOrderRoutes;
//# sourceMappingURL=cancelled-order.routes.js.map