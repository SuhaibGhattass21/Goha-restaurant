import type { Repository } from "typeorm";
import type { StockItem } from "../../database/models/StockItem.model";
import type { CreateStockItemDto, UpdateStockItemDto } from "../../../application/dtos/Stock/stock-item.dto";
import type { IStockItemRepository } from "@domain/repositories/Stock/stock-item.repository.interface";
export declare class StockItemRepositoryImpl implements IStockItemRepository {
    private stockItemRepository;
    constructor(stockItemRepository: Repository<StockItem>);
    create(stockItemData: CreateStockItemDto): Promise<StockItem>;
    findById(id: string): Promise<StockItem | null>;
    findByName(name: string): Promise<StockItem | null>;
    findAll(page?: number, limit?: number): Promise<{
        stockItems: StockItem[];
        total: number;
    }>;
    findByType(type: string): Promise<StockItem[]>;
    findLowStockItems(): Promise<StockItem[]>;
    update(id: string, stockItemData: UpdateStockItemDto): Promise<StockItem | null>;
    updateQuantity(id: string, quantity: number): Promise<StockItem | null>;
    delete(id: string): Promise<boolean>;
}
