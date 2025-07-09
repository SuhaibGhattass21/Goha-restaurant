import type { CreateStockTransactionDto, UpdateStockTransactionDto } from "@application/dtos/Stock/stock-transaction.dto";
import type { StockTransaction } from "@infrastructure/database/models";
export interface IStockTransactionRepository {
    create(transactionData: CreateStockTransactionDto): Promise<StockTransaction>;
    findById(id: string): Promise<StockTransaction | null>;
    findAll(page?: number, limit?: number): Promise<{
        transactions: StockTransaction[];
        total: number;
    }>;
    findByStockItem(stockItemId: string): Promise<StockTransaction[]>;
    findByShift(shiftId: string): Promise<StockTransaction[]>;
    findByUser(userId: string): Promise<StockTransaction[]>;
    findByType(type: string): Promise<StockTransaction[]>;
    findByDateRange(startDate: Date, endDate: Date): Promise<StockTransaction[]>;
    update(id: string, transactionData: UpdateStockTransactionDto): Promise<StockTransaction | null>;
    delete(id: string): Promise<boolean>;
}
