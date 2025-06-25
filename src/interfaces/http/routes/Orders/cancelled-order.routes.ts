import { Router } from "express"
import type { CancelledOrderController } from "../../controllers/Orders/cancelled-order.controller"
import { CancelledOrderValidator } from "../../validators/Orders/cancelled-order.validator"

export class CancelledOrderRoutes {
  private router: Router
  private cancelledOrderController: CancelledOrderController

  constructor(cancelledOrderController: CancelledOrderController) {
    this.router = Router()
    this.cancelledOrderController = cancelledOrderController
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    // POST /cancelled-orders - Create a new cancelled order record
    this.router.post(
      "/",
      CancelledOrderValidator.createCancelledOrder(),
      this.cancelledOrderController.createCancelledOrder.bind(this.cancelledOrderController),
    )

    // GET /cancelled-orders - Get all cancelled orders with pagination
    this.router.get(
      "/",
      CancelledOrderValidator.getCancelledOrders(),
      this.cancelledOrderController.getAllCancelledOrders.bind(this.cancelledOrderController),
    )

    // GET /cancelled-orders/:id - Get cancelled order by ID
    this.router.get(
      "/:id",
      CancelledOrderValidator.getCancelledOrderById(),
      this.cancelledOrderController.getCancelledOrderById.bind(this.cancelledOrderController),
    )

    // GET /cancelled-orders/order/:orderId - Get cancelled order by original order ID
    this.router.get(
      "/order/:orderId",
      CancelledOrderValidator.getCancelledOrderByOrderId(),
      this.cancelledOrderController.getCancelledOrderByOrderId.bind(this.cancelledOrderController),
    )

    // GET /cancelled-orders/user/:userId - Get cancelled orders by the user who cancelled them
    this.router.get(
      "/user/:userId",
      CancelledOrderValidator.getCancelledOrdersByCancelledBy(),
      this.cancelledOrderController.getCancelledOrdersByCancelledBy.bind(this.cancelledOrderController),
    )

    // GET /cancelled-orders/shift/:shiftId - Get cancelled orders by shift ID
    this.router.get(
      "/shift/:shiftId",
      CancelledOrderValidator.getCancelledOrdersByShiftId(),
      this.cancelledOrderController.getCancelledOrdersByShiftId.bind(this.cancelledOrderController),
    )
  }

  public getRouter(): Router {
    return this.router
  }
}
