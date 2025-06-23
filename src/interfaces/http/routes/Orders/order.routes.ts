import { Router } from "express"
import type { OrderController } from "../../controllers/Orders/order.controller"
import { OrderValidator } from "../../validators/Orders/order.validator"

export class OrderRoutes {
  private router: Router
  private orderController: OrderController

  constructor(orderController: OrderController) {
    this.router = Router()
    this.orderController = orderController
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    // POST /orders - Create a new order
    this.router.post("/", OrderValidator.createOrder(), this.orderController.createOrder.bind(this.orderController))

    // GET /orders - Get all orders with pagination
    this.router.get("/", OrderValidator.getOrders(), this.orderController.getAllOrders.bind(this.orderController))

    // GET /orders/stats - Get order statistics
    this.router.get(
      "/stats",
      OrderValidator.getOrderStats(),
      this.orderController.getOrderStats.bind(this.orderController),
    )

    // GET /orders/shift/:shiftId - Get orders by shift ID
    this.router.get(
      "/shift/:shiftId",
      OrderValidator.getOrdersByShiftId(),
      this.orderController.getOrdersByShiftId.bind(this.orderController),
    )

    // GET /orders/cashier/:cashierId - Get orders by cashier ID
    this.router.get(
      "/cashier/:cashierId",
      OrderValidator.getOrdersByCashierId(),
      this.orderController.getOrdersByCashierId.bind(this.orderController),
    )

    // GET /orders/status/:status - Get orders by status
    this.router.get(
      "/status/:status",
      OrderValidator.getOrdersByStatus(),
      this.orderController.getOrdersByStatus.bind(this.orderController),
    )

    // GET /orders/type/:type - Get orders by type
    this.router.get(
      "/type/:type",
      OrderValidator.getOrdersByType(),
      this.orderController.getOrdersByType.bind(this.orderController),
    )

    // GET /orders/date-range - Get orders by date range
    this.router.get(
      "/date-range",
      OrderValidator.getOrdersByDateRange(),
      this.orderController.getOrdersByDateRange.bind(this.orderController),
    )

    // GET /orders/:id - Get order by ID
    this.router.get("/:id", OrderValidator.getOrderById(), this.orderController.getOrderById.bind(this.orderController))

    // PUT /orders/:id - Update order
    this.router.put("/:id", OrderValidator.updateOrder(), this.orderController.updateOrder.bind(this.orderController))

    // PATCH /orders/:id/status - Update order status
    this.router.patch(
      "/:id/status",
      OrderValidator.updateOrderStatus(),
      this.orderController.updateOrderStatus.bind(this.orderController),
    )

    // POST /orders/:id/recalculate - Recalculate order total
    this.router.post(
      "/:id/recalculate",
      OrderValidator.recalculateOrderTotal(),
      this.orderController.recalculateOrderTotal.bind(this.orderController),
    )

    // DELETE /orders/:id - Delete order
    this.router.delete(
      "/:id",
      OrderValidator.deleteOrder(),
      this.orderController.deleteOrder.bind(this.orderController),
    )
  }

  public getRouter(): Router {
    return this.router
  }
}
