import { Router } from "express"
import type { OrderController } from "../../controllers/Orders/order.controller"
import { AuthorizationMiddleware } from "../../middlewares/authorization.middleware"
import { validateBody, validateParamsDto, validateQuery } from "../../middlewares/validation.middleware"
import {
  CancelOrderDto,
  CashierIdParamDto,
  CreateOrderDto,
  DateRangeQueryDto,
  OrderIdParamDto,
  OrderStatusParamDto,
  OrderTypeParamDto,
  PaginationQueryDto,
  ShiftIdParamDto,
  OrderStatsQueryDto,
  UpdateOrderDto,
} from "../../../../application/dtos/Orders/order.dto"

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
    this.router.post("/", AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier']), validateBody(CreateOrderDto), this.orderController.createOrder.bind(this.orderController))

    // GET /orders - Get all orders with pagination
    this.router.get("/cafe", AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier']), validateQuery(PaginationQueryDto), this.orderController.getAllOrdersCafe.bind(this.orderController))
    //Get all orders exceptCafe
    this.router.get("/except-cafe", AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier']), validateQuery(PaginationQueryDto), this.orderController.getAllOrdersExceptCafe.bind(this.orderController))

    // GET /orders/stats - Get order statistics
    this.router.get(
      "/stats",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier', 'access:orders']),
      validateQuery(OrderStatsQueryDto),
      this.orderController.getOrderStats.bind(this.orderController),
    )
    // GET /orders/stats/cafe - Get cafe order statistics
    this.router.get(
      "/stats-cafe",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier', 'access:orders']),
      validateQuery(OrderStatsQueryDto),
      this.orderController.getOrderStatsCafe.bind(this.orderController),
    )

    // for goha
    this.router.get(
      "/shift-goha/:shiftId",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier', 'access:orders']),
      validateParamsDto(ShiftIdParamDto),
      this.orderController.getOrdersByShiftIdGoha.bind(this.orderController),
    )
    // for cafe
    this.router.get(
      "/shift-cafe/:shiftId",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier', 'access:orders']),
      validateParamsDto(ShiftIdParamDto),
      this.orderController.getOrdersByShiftIdCafe.bind(this.orderController),
    )

    // GET /orders/cashier/:cashierId - Get orders by cashier ID
    this.router.get(
      "/cashier/:cashierId",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier', 'access:orders']),
      validateParamsDto(CashierIdParamDto),
      validateQuery(PaginationQueryDto),
      this.orderController.getOrdersByCashierId.bind(this.orderController),
    )

    // GET /orders/status/:status - Get orders by status
    this.router.get(
      "/status/:status",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier']),
      validateParamsDto(OrderStatusParamDto),
      validateQuery(PaginationQueryDto),
      this.orderController.getOrdersByStatus.bind(this.orderController),
    )

    // GET /orders/type/:type - Get orders by type
    this.router.get(
      "/type/:type",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier']),
      validateParamsDto(OrderTypeParamDto),
      validateQuery(PaginationQueryDto),
      this.orderController.getOrdersByType.bind(this.orderController),
    )

    // GET /orders/date-range - Get orders by date range
    this.router.get(
      "/date-range",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier', 'access:orders']),
      validateQuery(DateRangeQueryDto),
      this.orderController.getOrdersByDateRange.bind(this.orderController),
    )

    // GET /orders/:id - Get order by ID
    this.router.get("/:id", AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier']), validateParamsDto(OrderIdParamDto), this.orderController.getOrderById.bind(this.orderController))

    // interfaces/http/routes/Orders/order.routes.ts
    this.router.get(
      '/shift-type/date',
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier', 'access:orders']),
      this.orderController.getOrdersByShiftTypeAndDate.bind(this.orderController),
    );

    // PUT /orders/:id - Update order
    this.router.put("/:id", AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:orders']), validateParamsDto(OrderIdParamDto), validateBody(UpdateOrderDto), this.orderController.updateOrder.bind(this.orderController))

    // PATCH /orders/:id/:status - Update order status
    this.router.patch(
      "/:id/:status",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier']),
      validateParamsDto(OrderIdParamDto),
      validateBody(OrderStatusParamDto),
      this.orderController.updateOrderStatus.bind(this.orderController),
    )

    // POST /orders/:id/recalculate - Recalculate order total
    this.router.post(
      "/:id/recalculate",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:orders']),
      validateParamsDto(OrderIdParamDto),
      this.orderController.recalculateOrderTotal.bind(this.orderController),
    )

    // POST /orders/:id/request-cancel - Request cancellation for an order
    this.router.post(
      "/:id/request-cancel",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier']),
      validateParamsDto(OrderIdParamDto),
      validateBody(CancelOrderDto),
      this.orderController.requestCancelOrder.bind(this.orderController),
    )

    // POST /orders/:id/cancel - Cancel an order directly (for admin/owner)
    this.router.post(
      "/:id/cancel",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS']),
      validateParamsDto(OrderIdParamDto),
      validateBody(CancelOrderDto),
      this.orderController.cancelOrder.bind(this.orderController),
    )

    // DELETE /orders/:id - Delete order
    this.router.delete(
      "/:id",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:orders']),
      validateParamsDto(OrderIdParamDto),
      this.orderController.deleteOrder.bind(this.orderController),
    )
  }

  public getRouter(): Router {
    return this.router
  }
}
