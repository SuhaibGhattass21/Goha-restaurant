import type { IStockItemRepository } from "@domain/repositories/Stock/stock-item.repository.interface";
import type { CreateStockItemDto, StockItemResponseDto, StockItemListResponseDto, UpdateStockItemDto, LowStockItemDto } from "@application/dtos/Stock/stock-item.dto";
export declare class StockItemUseCases {
    private stockItemRepository;
    constructor(stockItemRepository: IStockItemRepository);
    createStockItem(stockItemData: CreateStockItemDto): Promise<StockItemResponseDto>;
    getStockItemById(id: string): Promise<StockItemResponseDto | null>;
    getAllStockItems(page?: number, limit?: number): Promise<StockItemListResponseDto>;
    updateStockItem(id: string, stockItemData: UpdateStockItemDto): Promise<StockItemResponseDto | null>;
    deleteStockItem(id: string): Promise<boolean>;
    getLowStockItems(): Promise<LowStockItemDto[]>;
    getStockItemsByType(type: string): Promise<StockItemResponseDto[]>;
    updateStockQuantity(id: string, quantity: number): Promise<StockItemResponseDto | null>;
    private mapToResponseDto;
}
