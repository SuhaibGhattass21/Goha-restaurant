import { Router } from "express"
import type { OrderItemController } from "../../controllers/Orders/order-item.controller"
import { OrderItemValidator } from "../../validators/Orders/order-item.validator"

export class OrderItemRoutes {
  private router: Router
  private orderItemController: OrderItemController

  constructor(orderItemController: OrderItemController) {
    this.router = Router()
    this.orderItemController = orderItemController
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    // POST /order-items - Create a new order item
    this.router.post(
      "/",
      OrderItemValidator.createOrderItem(),
      this.orderItemController.createOrderItem.bind(this.orderItemController),
    )

    // GET /order-items - Get all order items with pagination
    this.router.get(
      "/",
      OrderItemValidator.getOrderItems(),
      this.orderItemController.getAllOrderItems.bind(this.orderItemController),
    )

    // GET /order-items/order/:orderId - Get order items by order ID
    this.router.get(
      "/order/:orderId",
      OrderItemValidator.getOrderItemsByOrderId(),
      this.orderItemController.getOrderItemsByOrderId.bind(this.orderItemController),
    )

    // GET /order-items/:id - Get order item by ID
    this.router.get(
      "/:id",
      OrderItemValidator.getOrderItemById(),
      this.orderItemController.getOrderItemById.bind(this.orderItemController),
    )

    // PUT /order-items/:id - Update order item
    this.router.put(
      "/:id",
      OrderItemValidator.updateOrderItem(),
      this.orderItemController.updateOrderItem.bind(this.orderItemController),
    )

    // DELETE /order-items/:id - Delete order item
    this.router.delete(
      "/:id",
      OrderItemValidator.deleteOrderItem(),
      this.orderItemController.deleteOrderItem.bind(this.orderItemController),
    )
  }

  public getRouter(): Router {
    return this.router
  }
}
