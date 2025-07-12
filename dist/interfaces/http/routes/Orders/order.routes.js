"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = require("express");
const order_validator_1 = require("../../validators/Orders/order.validator");
class OrderRoutes {
    constructor(orderController) {
        this.router = (0, express_1.Router)();
        this.orderController = orderController;
        this.initializeRoutes();
    }
    initializeRoutes() {
        // POST /orders - Create a new order
        this.router.post("/", order_validator_1.OrderValidator.createOrder(), this.orderController.createOrder.bind(this.orderController));
        // GET /orders - Get all orders with pagination
        this.router.get("/", order_validator_1.OrderValidator.getOrders(), this.orderController.getAllOrders.bind(this.orderController));
        // GET /orders/stats - Get order statistics
        this.router.get("/stats", order_validator_1.OrderValidator.getOrderStats(), this.orderController.getOrderStats.bind(this.orderController));
        // GET /orders/shift/:shiftId - Get orders by shift ID
        this.router.get("/shift/:shiftId", order_validator_1.OrderValidator.getOrdersByShiftId(), this.orderController.getOrdersByShiftId.bind(this.orderController));
        // GET /orders/cashier/:cashierId - Get orders by cashier ID
        this.router.get("/cashier/:cashierId", order_validator_1.OrderValidator.getOrdersByCashierId(), this.orderController.getOrdersByCashierId.bind(this.orderController));
        // GET /orders/status/:status - Get orders by status
        this.router.get("/status/:status", order_validator_1.OrderValidator.getOrdersByStatus(), this.orderController.getOrdersByStatus.bind(this.orderController));
        // GET /orders/type/:type - Get orders by type
        this.router.get("/type/:type", order_validator_1.OrderValidator.getOrdersByType(), this.orderController.getOrdersByType.bind(this.orderController));
        // GET /orders/date-range - Get orders by date range
        this.router.get("/date-range", order_validator_1.OrderValidator.getOrdersByDateRange(), this.orderController.getOrdersByDateRange.bind(this.orderController));
        // GET /orders/:id - Get order by ID
        this.router.get("/:id", order_validator_1.OrderValidator.getOrderById(), this.orderController.getOrderById.bind(this.orderController));
        // interfaces/http/routes/Orders/order.routes.ts
        this.router.get('/shift-type/date', this.orderController.getOrdersByShiftTypeAndDate.bind(this.orderController));
        // PUT /orders/:id - Update order
        this.router.put("/:id", order_validator_1.OrderValidator.updateOrder(), this.orderController.updateOrder.bind(this.orderController));
        // PATCH /orders/:id/:status - Update order status
        this.router.patch("/:id/:status", order_validator_1.OrderValidator.updateOrderStatus(), this.orderController.updateOrderStatus.bind(this.orderController));
        // POST /orders/:id/recalculate - Recalculate order total
        this.router.post("/:id/recalculate", order_validator_1.OrderValidator.recalculateOrderTotal(), this.orderController.recalculateOrderTotal.bind(this.orderController));
        // DELETE /orders/:id - Delete order
        this.router.delete("/:id", order_validator_1.OrderValidator.deleteOrder(), this.orderController.deleteOrder.bind(this.orderController));
    }
    getRouter() {
        return this.router;
    }
}
exports.OrderRoutes = OrderRoutes;
//# sourceMappingURL=order.routes.js.map