import type { Request, Response } from "express";
import type { StockTransactionUseCases } from "../../../../application/use-cases/Stock/stock-transaction.use-cases";
export declare class StockTransactionController {
    private stockTransactionUseCases;
    constructor(stockTransactionUseCases: StockTransactionUseCases);
    createStockTransaction(req: Request, res: Response): Promise<void>;
    getStockTransactionById(req: Request, res: Response): Promise<void>;
    getAllStockTransactions(req: Request, res: Response): Promise<void>;
    updateStockTransaction(req: Request, res: Response): Promise<void>;
    deleteStockTransaction(req: Request, res: Response): Promise<void>;
    getTransactionsByStockItem(req: Request, res: Response): Promise<void>;
    getTransactionsByShift(req: Request, res: Response): Promise<void>;
    getTransactionsByUser(req: Request, res: Response): Promise<void>;
    getStockItemStats(req: Request, res: Response): Promise<void>;
}
