import type { Request, Response } from "express";
import type { StockItemUseCases } from "../../../../application/use-cases/Stock/stock-item.use-cases";
export declare class StockItemController {
    private stockItemUseCases;
    constructor(stockItemUseCases: StockItemUseCases);
    createStockItem(req: Request, res: Response): Promise<void>;
    getStockItemById(req: Request, res: Response): Promise<void>;
    getAllStockItems(req: Request, res: Response): Promise<void>;
    updateStockItem(req: Request, res: Response): Promise<void>;
    deleteStockItem(req: Request, res: Response): Promise<void>;
    getLowStockItems(req: Request, res: Response): Promise<void>;
    getStockItemsByType(req: Request, res: Response): Promise<void>;
    updateStockQuantity(req: Request, res: Response): Promise<void>;
}
