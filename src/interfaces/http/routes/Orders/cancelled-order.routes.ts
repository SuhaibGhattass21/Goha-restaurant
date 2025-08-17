import { Router } from "express"
import type { CancelledOrderController } from "../../controllers/Orders/cancelled-order.controller"
import { CancelledOrderValidator } from "../../validators/Orders/cancelled-order.validator"
import { AuthorizationMiddleware } from "../../middlewares/authorization.middleware"

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
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier']),
      CancelledOrderValidator.createCancelledOrder(),
      this.cancelledOrderController.createCancelledOrder.bind(this.cancelledOrderController),
    )

    // GET /cancelled-orders - Get all cancelled orders with pagination
    this.router.get(
      "/",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:orders']),
      CancelledOrderValidator.getCancelledOrders(),
      this.cancelledOrderController.getAllCancelledOrders.bind(this.cancelledOrderController),
    )

    // GET /cancelled-orders/:id - Get cancelled order by ID
    this.router.get(
      "/:id",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:orders']),
      CancelledOrderValidator.getCancelledOrderById(),
      this.cancelledOrderController.getCancelledOrderById.bind(this.cancelledOrderController),
    )

    // GET /cancelled-orders/order/:orderId - Get cancelled order by original order ID
    this.router.get(
      "/order/:orderId",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:orders']),
      CancelledOrderValidator.getCancelledOrderByOrderId(),
      this.cancelledOrderController.getCancelledOrderByOrderId.bind(this.cancelledOrderController),
    )

    // GET /cancelled-orders/user/:userId - Get cancelled orders by the user who cancelled them
    this.router.get(
      "/user/:userId",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:orders']),
      CancelledOrderValidator.getCancelledOrdersByCancelledBy(),
      this.cancelledOrderController.getCancelledOrdersByCancelledBy.bind(this.cancelledOrderController),
    )

    // GET /cancelled-orders/shift/:shiftId - Get cancelled orders by shift ID
    this.router.get(
      "/shift/:shiftId",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:orders', 'access:cashier']),
      CancelledOrderValidator.getCancelledOrdersByShiftId(),
      this.cancelledOrderController.getCancelledOrdersByShiftId.bind(this.cancelledOrderController),
    )

    // GET /cancelled-orders/pending - Get pending cancellation requests
    this.router.get(
      "/pending",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:orders']),
      CancelledOrderValidator.getPendingCancellations(),
      this.cancelledOrderController.getPendingCancellations.bind(this.cancelledOrderController),
    )

    // POST /cancelled-orders/:cancelled_order_id/approve - Approve or reject a cancellation request
    this.router.post(
      "/:cancelled_order_id/approve",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:orders']),
      CancelledOrderValidator.approveCancellation(),
      this.cancelledOrderController.approveCancellation.bind(this.cancelledOrderController),
    )
  }

  public getRouter(): Router {
    return this.router
  }
}
