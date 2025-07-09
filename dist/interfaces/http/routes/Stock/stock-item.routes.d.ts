import { Router } from "express";
import type { StockItemController } from "../../controllers/Stock/stock-item.controller";
export declare class StockItemRoutes {
    private router;
    private stockItemController;
    constructor(stockItemController: StockItemController);
    private initializeRoutes;
    getRouter(): Router;
}
