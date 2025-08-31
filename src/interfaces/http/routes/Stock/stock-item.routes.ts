import { Router } from "express"
import type { StockItemController } from "../../controllers/Stock/stock-item.controller"
import { AuthorizationMiddleware } from "../../../../interfaces/http/middlewares/authorization.middleware"
import { validateBody, validateParamsDto, validateQuery } from "../../middlewares/validation.middleware"
import { CreateStockItemDto, UpdateStockItemDto, UpdateQuantityDto, StockItemIdParamDto, StockItemTypeParamDto, PaginationQueryDto } from "../../../../application/dtos/Stock/stock-item.dto"

export class StockItemRoutes {

  private router: Router
  private stockItemController: StockItemController

  constructor(stockItemController: StockItemController) {
    this.router = Router()
    this.stockItemController = stockItemController
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    // POST /stock-items - Create a new stock item
    this.router.post(
      "/",
      validateBody(CreateStockItemDto),
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS']),
      this.stockItemController.createStockItem.bind(this.stockItemController),
    )

    // GET /stock-items - Get all stock items with pagination
    this.router.get(
      "/",
      validateQuery(PaginationQueryDto),
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier']),
      this.stockItemController.getAllStockItems.bind(this.stockItemController),
    )

    // GET /stock-items/low-stock - Get low stock items
    this.router.get("/low-stock",
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier']),
      this.stockItemController.getLowStockItems.bind(this.stockItemController))

    // GET /stock-items/type/:type - Get stock items by type
    this.router.get(
      "/type/:type",
      validateParamsDto(StockItemTypeParamDto),
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier']),
      this.stockItemController.getStockItemsByType.bind(this.stockItemController),
    )

    // GET /stock-items/:id - Get stock item by ID
    this.router.get(
      "/:id",
      validateParamsDto(StockItemIdParamDto),
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier']),
      this.stockItemController.getStockItemById.bind(this.stockItemController),
    )

    // PUT /stock-items/:id - Update stock item
    this.router.put(
      "/:id",
      validateParamsDto(StockItemIdParamDto),
      validateBody(UpdateStockItemDto),
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS']),
      this.stockItemController.updateStockItem.bind(this.stockItemController),
    )

    // PATCH /stock-items/:id/quantity - Update stock quantity
    this.router.patch(
      "/:id/quantity",
      validateParamsDto(StockItemIdParamDto),
      validateBody(UpdateQuantityDto),
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS', 'access:cashier']),
      this.stockItemController.updateStockQuantity.bind(this.stockItemController),
    )

    // DELETE /stock-items/:id - Delete stock item
    this.router.delete(
      "/:id",
      validateParamsDto(StockItemIdParamDto),
      AuthorizationMiddleware.requireAnyPermission(['OWNER_ACCESS']),
      this.stockItemController.deleteStockItem.bind(this.stockItemController),
    )
  }

  public getRouter(): Router {
    return this.router
  }
}
