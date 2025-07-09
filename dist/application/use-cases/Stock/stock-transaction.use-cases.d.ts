import type { IStockTransactionRepository } from "@domain/repositories/Stock/stock-transaction.repository.interface";
import type { IStockItemRepository } from "@domain/repositories/Stock/stock-item.repository.interface";
import type { CreateStockTransactionDto, StockTransactionResponseDto, StockTransactionListResponseDto, UpdateStockTransactionDto, StockTransactionStatsDto, ShiftTransactionSummaryDto } from "@application/dtos/Stock/stock-transaction.dto";
export declare class StockTransactionUseCases {
    private stockTransactionRepository;
    private stockItemRepository;
    constructor(stockTransactionRepository: IStockTransactionRepository, stockItemRepository: IStockItemRepository);
    createStockTransaction(transactionData: CreateStockTransactionDto): Promise<StockTransactionResponseDto>;
    getStockTransactionById(id: string): Promise<StockTransactionResponseDto | null>;
    getAllStockTransactions(page?: number, limit?: number): Promise<StockTransactionListResponseDto>;
    updateStockTransaction(id: string, transactionData: UpdateStockTransactionDto): Promise<StockTransactionResponseDto | null>;
    deleteStockTransaction(id: string): Promise<boolean>;
    getTransactionsByStockItem(stockItemId: string): Promise<StockTransactionResponseDto[]>;
    getTransactionsByShift(shiftId: string): Promise<ShiftTransactionSummaryDto>;
    getTransactionsByUser(userId: string): Promise<StockTransactionResponseDto[]>;
    getStockItemStats(stockItemId: string): Promise<StockTransactionStatsDto | null>;
    private mapToResponseDto;
}
