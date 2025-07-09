import type { Repository } from "typeorm";
import type { StockTransaction } from "../../database/models/StockTransaction.model";
import type { CreateStockTransactionDto, UpdateStockTransactionDto } from "../../../application/dtos/Stock/stock-transaction.dto";
import type { IStockTransactionRepository } from "@domain/repositories/Stock/stock-transaction.repository.interface";
export declare class StockTransactionRepositoryImpl implements IStockTransactionRepository {
    private stockTransactionRepository;
    constructor(stockTransactionRepository: Repository<StockTransaction>);
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
