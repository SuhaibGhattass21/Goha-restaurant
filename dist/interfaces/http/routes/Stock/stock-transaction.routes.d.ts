import { Router } from "express";
import type { StockTransactionController } from "../../controllers/Stock/stock-transaction.controller";
export declare class StockTransactionRoutes {
    private router;
    private stockTransactionController;
    constructor(stockTransactionController: StockTransactionController);
    private initializeRoutes;
    getRouter(): Router;
}
