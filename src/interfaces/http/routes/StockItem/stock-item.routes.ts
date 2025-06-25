import { Router } from "express"
import type { StockItemController } from "../../controllers/StockItem/stock-item.controller"
import { StockItemValidator } from "../../validators/StockItem/stock-item.validator"

export class StockItemRoutes {
  /**
   * @swagger
   * tags:
   *   name: Stock Items
   *   description: Stock item management for inventory
   */

  /**
   * @swagger
   * /stock-items:
   *   get:
   *     summary: Get all stock items
   *     tags: [Stock Items]
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: Page number
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           minimum: 1
   *           maximum: 100
   *         description: Number of items per page
   *     responses:
   *       200:
   *         description: List of stock items
   */

  /**
   * @swagger
   * /stock-items/{id}:
   *   get:
   *     summary: Get stock item by ID
   *     tags: [Stock Items]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     responses:
   *       200:
   *         description: Stock item found
   *       404:
   *         description: Stock item not found
   */

  /**
   * @swagger
   * /stock-items:
   *   post:
   *     summary: Create a new stock item
   *     tags: [Stock Items]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateStockItemDTO'
   *     responses:
   *       201:
   *         description: Stock item created
   */

  /**
   * @swagger
   * /stock-items/{id}:
   *   put:
   *     summary: Update stock item
   *     tags: [Stock Items]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateStockItemDTO'
   *     responses:
   *       200:
   *         description: Stock item updated
   */

  /**
   * @swagger
   * /stock-items/{id}:
   *   delete:
   *     summary: Delete stock item
   *     tags: [Stock Items]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Stock item deleted
   */

  /**
   * @swagger
   * /stock-items/low-stock:
   *   get:
   *     summary: Get low stock items
   *     tags: [Stock Items]
   *     responses:
   *       200:
   *         description: List of low stock items
   */

  /**
   * @swagger
   * /stock-items/type/{type}:
   *   get:
   *     summary: Get stock items by type
   *     tags: [Stock Items]
   *     parameters:
   *       - in: path
   *         name: type
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Stock items by type
   */

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
