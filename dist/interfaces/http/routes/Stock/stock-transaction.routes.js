"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockTransactionRoutes = void 0;
const express_1 = require("express");
const stock_transaction_validator_1 = require("../../validators/Stock/stock-transaction.validator");
class StockTransactionRoutes {
    constructor(stockTransactionController) {
        this.router = (0, express_1.Router)();
        this.stockTransactionController = stockTransactionController;
        this.initializeRoutes();
    }
    initializeRoutes() {
        // POST /stock-transactions - Create a new stock transaction
        this.router.post("/", stock_transaction_validator_1.StockTransactionValidator.createStockTransaction(), this.stockTransactionController.createStockTransaction.bind(this.stockTransactionController));
        // GET /stock-transactions - Get all stock transactions with pagination
        this.router.get("/", stock_transaction_validator_1.StockTransactionValidator.getStockTransactions(), this.stockTransactionController.getAllStockTransactions.bind(this.stockTransactionController));
        // GET /stock-transactions/stock-item/:stockItemId - Get transactions by stock item
        this.router.get("/stock-item/:stockItemId", stock_transaction_validator_1.StockTransactionValidator.getTransactionsByStockItem(), this.stockTransactionController.getTransactionsByStockItem.bind(this.stockTransactionController));
        // GET /stock-transactions/shift/:shiftId - Get transactions by shift
        this.router.get("/shift/:shiftId", stock_transaction_validator_1.StockTransactionValidator.getTransactionsByShift(), this.stockTransactionController.getTransactionsByShift.bind(this.stockTransactionController));
        // GET /stock-transactions/user/:userId - Get transactions by user
        this.router.get("/user/:userId", stock_transaction_validator_1.StockTransactionValidator.getTransactionsByUser(), this.stockTransactionController.getTransactionsByUser.bind(this.stockTransactionController));
        // GET /stock-transactions/stats/:stockItemId - Get stock item statistics
        this.router.get("/stats/:stockItemId", stock_transaction_validator_1.StockTransactionValidator.getStockItemStats(), this.stockTransactionController.getStockItemStats.bind(this.stockTransactionController));
        // GET /stock-transactions/:id - Get stock transaction by ID
        this.router.get("/:id", stock_transaction_validator_1.StockTransactionValidator.getStockTransactionById(), this.stockTransactionController.getStockTransactionById.bind(this.stockTransactionController));
        // PUT /stock-transactions/:id - Update stock transaction
        this.router.put("/:id", stock_transaction_validator_1.StockTransactionValidator.updateStockTransaction(), this.stockTransactionController.updateStockTransaction.bind(this.stockTransactionController));
        // DELETE /stock-transactions/:id - Delete stock transaction
        this.router.delete("/:id", stock_transaction_validator_1.StockTransactionValidator.deleteStockTransaction(), this.stockTransactionController.deleteStockTransaction.bind(this.stockTransactionController));
    }
    getRouter() {
        return this.router;
    }
}
exports.StockTransactionRoutes = StockTransactionRoutes;
//# sourceMappingURL=stock-transaction.routes.js.map