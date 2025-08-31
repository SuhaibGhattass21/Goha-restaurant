import { Router } from "express"
import type { StockTransactionController } from "../../controllers/Stock/stock-transaction.controller"
import { AuthorizationMiddleware } from "../../../../interfaces/http/middlewares/authorization.middleware"
import { validateBody, validateParamsDto, validateQuery } from "../../middlewares/validation.middleware"
import { CreateStockTransactionDto, UpdateStockTransactionDto, StockTransactionIdParamDto, StockItemIdParamDto, ShiftIdParamDto, UserIdParamDto, PaginationQueryDto } from "../../../../application/dtos/Stock/stock-transaction.dto"

export class StockTransactionRoutes {

  private router: Router
  private stockTransactionController: StockTransactionController

  constructor(stockTransactionController: StockTransactionController) {
    this.router = Router()
    this.stockTransactionController = stockTransactionController
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    // POST /stock-transactions - Create a new stock transaction
    this.router.post(
      "/",
      validateBody(CreateStockTransactionDto),
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier']),
      this.stockTransactionController.createStockTransaction.bind(this.stockTransactionController),
    )

    // GET /stock-transactions - Get all stock transactions with pagination
    this.router.get(
      "/",
      validateQuery(PaginationQueryDto),
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier']),
      this.stockTransactionController.getAllStockTransactions.bind(this.stockTransactionController),
    )

    // GET /stock-transactions/stock-item/:stockItemId - Get transactions by stock item
    this.router.get(
      "/stock-item/:stockItemId",
      validateParamsDto(StockItemIdParamDto),
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier']),
      this.stockTransactionController.getTransactionsByStockItem.bind(this.stockTransactionController),
    )

    // GET /stock-transactions/shift/:shiftId - Get transactions by shift
    this.router.get(
      "/shift/:shiftId",
      validateParamsDto(ShiftIdParamDto),
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier']),
      this.stockTransactionController.getTransactionsByShift.bind(this.stockTransactionController),
    )

    // GET /stock-transactions/user/:userId - Get transactions by user
    this.router.get(
      "/user/:userId",
      validateParamsDto(UserIdParamDto),
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier']),
      this.stockTransactionController.getTransactionsByUser.bind(this.stockTransactionController),
    )

    // GET /stock-transactions/stats/:stockItemId - Get stock item statistics
    this.router.get(
      "/stats/:stockItemId",
      validateParamsDto(StockItemIdParamDto),
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS']),
      this.stockTransactionController.getStockItemStats.bind(this.stockTransactionController),
    )

    // GET /stock-transactions/:id - Get stock transaction by ID
    this.router.get(
      "/:id",
      validateParamsDto(StockTransactionIdParamDto),
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier']),
      this.stockTransactionController.getStockTransactionById.bind(this.stockTransactionController),
    )

    // PUT /stock-transactions/:id - Update stock transaction
    this.router.put(
      "/:id",
      validateParamsDto(StockTransactionIdParamDto),
      validateBody(UpdateStockTransactionDto),
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier']),
      this.stockTransactionController.updateStockTransaction.bind(this.stockTransactionController),
    )

    // DELETE /stock-transactions/:id - Delete stock transaction
    this.router.delete(
      "/:id",
      validateParamsDto(StockTransactionIdParamDto),
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier']),
      this.stockTransactionController.deleteStockTransaction.bind(this.stockTransactionController),
    )
  }

  public getRouter(): Router {
    return this.router
  }
}
