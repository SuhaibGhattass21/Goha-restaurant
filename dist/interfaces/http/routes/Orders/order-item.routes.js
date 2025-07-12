"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemRoutes = void 0;
const express_1 = require("express");
const order_item_validator_1 = require("../../validators/Orders/order-item.validator");
class OrderItemRoutes {
    constructor(orderItemController) {
        this.router = (0, express_1.Router)();
        this.orderItemController = orderItemController;
        this.initializeRoutes();
    }
    initializeRoutes() {
        // POST /order-items - Create a new order item
        this.router.post("/", order_item_validator_1.OrderItemValidator.createOrderItem(), this.orderItemController.createOrderItem.bind(this.orderItemController));
        // GET /order-items - Get all order items with pagination
        this.router.get("/", order_item_validator_1.OrderItemValidator.getOrderItems(), this.orderItemController.getAllOrderItems.bind(this.orderItemController));
        // GET /order-items/order/:orderId - Get order items by order ID
        this.router.get("/order/:orderId", order_item_validator_1.OrderItemValidator.getOrderItemsByOrderId(), this.orderItemController.getOrderItemsByOrderId.bind(this.orderItemController));
        // GET /order-items/:id - Get order item by ID
        this.router.get("/:id", order_item_validator_1.OrderItemValidator.getOrderItemById(), this.orderItemController.getOrderItemById.bind(this.orderItemController));
        // PUT /order-items/:id - Update order item
        this.router.put("/:id", order_item_validator_1.OrderItemValidator.updateOrderItem(), this.orderItemController.updateOrderItem.bind(this.orderItemController));
        // DELETE /order-items/:id - Delete order item
        this.router.delete("/:id", order_item_validator_1.OrderItemValidator.deleteOrderItem(), this.orderItemController.deleteOrderItem.bind(this.orderItemController));
    }
    getRouter() {
        return this.router;
    }
}
exports.OrderItemRoutes = OrderItemRoutes;
//# sourceMappingURL=order-item.routes.js.map