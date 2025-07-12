import type { CreateStockItemDto, UpdateStockItemDto } from "@application/dtos/Stock/stock-item.dto";
import type { StockItem } from "@infrastructure/database/models";
export interface IStockItemRepository {
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
