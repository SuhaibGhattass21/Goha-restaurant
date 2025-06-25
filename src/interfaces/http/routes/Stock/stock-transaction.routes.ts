import { Router } from "express"
import type { StockTransactionController } from "../../controllers/Stock/stock-transaction.controller"
import { StockTransactionValidator } from "../../validators/Stock/stock-transaction.validator"

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
      StockTransactionValidator.createStockTransaction(),
      this.stockTransactionController.createStockTransaction.bind(this.stockTransactionController),
    )

    // GET /stock-transactions - Get all stock transactions with pagination
    this.router.get(
      "/",
      StockTransactionValidator.getStockTransactions(),
      this.stockTransactionController.getAllStockTransactions.bind(this.stockTransactionController),
    )

    // GET /stock-transactions/stock-item/:stockItemId - Get transactions by stock item
    this.router.get(
      "/stock-item/:stockItemId",
      StockTransactionValidator.getTransactionsByStockItem(),
      this.stockTransactionController.getTransactionsByStockItem.bind(this.stockTransactionController),
    )

    // GET /stock-transactions/shift/:shiftId - Get transactions by shift
    this.router.get(
      "/shift/:shiftId",
      StockTransactionValidator.getTransactionsByShift(),
      this.stockTransactionController.getTransactionsByShift.bind(this.stockTransactionController),
    )

    // GET /stock-transactions/user/:userId - Get transactions by user
    this.router.get(
      "/user/:userId",
      StockTransactionValidator.getTransactionsByUser(),
      this.stockTransactionController.getTransactionsByUser.bind(this.stockTransactionController),
    )

    // GET /stock-transactions/stats/:stockItemId - Get stock item statistics
    this.router.get(
      "/stats/:stockItemId",
      StockTransactionValidator.getStockItemStats(),
      this.stockTransactionController.getStockItemStats.bind(this.stockTransactionController),
    )

    // GET /stock-transactions/:id - Get stock transaction by ID
    this.router.get(
      "/:id",
      StockTransactionValidator.getStockTransactionById(),
      this.stockTransactionController.getStockTransactionById.bind(this.stockTransactionController),
    )

    // PUT /stock-transactions/:id - Update stock transaction
    this.router.put(
      "/:id",
      StockTransactionValidator.updateStockTransaction(),
      this.stockTransactionController.updateStockTransaction.bind(this.stockTransactionController),
    )

    // DELETE /stock-transactions/:id - Delete stock transaction
    this.router.delete(
      "/:id",
      StockTransactionValidator.deleteStockTransaction(),
      this.stockTransactionController.deleteStockTransaction.bind(this.stockTransactionController),
    )
  }

  public getRouter(): Router {
    return this.router
  }
}
