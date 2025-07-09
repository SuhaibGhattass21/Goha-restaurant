"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockItemRoutes = void 0;
const express_1 = require("express");
const stock_item_validator_1 = require("../../validators/Stock/stock-item.validator");
class StockItemRoutes {
    constructor(stockItemController) {
        this.router = (0, express_1.Router)();
        this.stockItemController = stockItemController;
        this.initializeRoutes();
    }
    initializeRoutes() {
        // POST /stock-items - Create a new stock item
        this.router.post("/", stock_item_validator_1.StockItemValidator.createStockItem(), this.stockItemController.createStockItem.bind(this.stockItemController));
        // GET /stock-items - Get all stock items with pagination
        this.router.get("/", stock_item_validator_1.StockItemValidator.getStockItems(), this.stockItemController.getAllStockItems.bind(this.stockItemController));
        // GET /stock-items/low-stock - Get low stock items
        this.router.get("/low-stock", this.stockItemController.getLowStockItems.bind(this.stockItemController));
        // GET /stock-items/type/:type - Get stock items by type
        this.router.get("/type/:type", stock_item_validator_1.StockItemValidator.getStockItemsByType(), this.stockItemController.getStockItemsByType.bind(this.stockItemController));
        // GET /stock-items/:id - Get stock item by ID
        this.router.get("/:id", stock_item_validator_1.StockItemValidator.getStockItemById(), this.stockItemController.getStockItemById.bind(this.stockItemController));
        // PUT /stock-items/:id - Update stock item
        this.router.put("/:id", stock_item_validator_1.StockItemValidator.updateStockItem(), this.stockItemController.updateStockItem.bind(this.stockItemController));
        // PATCH /stock-items/:id/quantity - Update stock quantity
        this.router.patch("/:id/quantity", stock_item_validator_1.StockItemValidator.updateStockQuantity(), this.stockItemController.updateStockQuantity.bind(this.stockItemController));
        // DELETE /stock-items/:id - Delete stock item
        this.router.delete("/:id", stock_item_validator_1.StockItemValidator.deleteStockItem(), this.stockItemController.deleteStockItem.bind(this.stockItemController));
    }
    getRouter() {
        return this.router;
    }
}
exports.StockItemRoutes = StockItemRoutes;
//# sourceMappingURL=stock-item.routes.js.map