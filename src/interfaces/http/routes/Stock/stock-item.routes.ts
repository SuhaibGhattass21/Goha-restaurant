import { Router } from "express"
import type { StockItemController } from "../../controllers/Stock/stock-item.controller"
import { StockItemValidator } from "../../validators/Stock/stock-item.validator"

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
      StockItemValidator.createStockItem(),
      this.stockItemController.createStockItem.bind(this.stockItemController),
    )

    // GET /stock-items - Get all stock items with pagination
    this.router.get(
      "/",
      StockItemValidator.getStockItems(),
      this.stockItemController.getAllStockItems.bind(this.stockItemController),
    )

    // GET /stock-items/low-stock - Get low stock items
    this.router.get("/low-stock", this.stockItemController.getLowStockItems.bind(this.stockItemController))

    // GET /stock-items/type/:type - Get stock items by type
    this.router.get(
      "/type/:type",
      StockItemValidator.getStockItemsByType(),
      this.stockItemController.getStockItemsByType.bind(this.stockItemController),
    )

    // GET /stock-items/:id - Get stock item by ID
    this.router.get(
      "/:id",
      StockItemValidator.getStockItemById(),
      this.stockItemController.getStockItemById.bind(this.stockItemController),
    )

    // PUT /stock-items/:id - Update stock item
    this.router.put(
      "/:id",
      StockItemValidator.updateStockItem(),
      this.stockItemController.updateStockItem.bind(this.stockItemController),
    )

    // PATCH /stock-items/:id/quantity - Update stock quantity
    this.router.patch(
      "/:id/quantity",
      StockItemValidator.updateStockQuantity(),
      this.stockItemController.updateStockQuantity.bind(this.stockItemController),
    )

    // DELETE /stock-items/:id - Delete stock item
    this.router.delete(
      "/:id",
      StockItemValidator.deleteStockItem(),
      this.stockItemController.deleteStockItem.bind(this.stockItemController),
    )
  }

  public getRouter(): Router {
    return this.router
  }
}
