import { IInventoryRepository } from "@domain/repositories/inventory.repository.interface";
export declare class InventoryRepository implements IInventoryRepository {
    getAllStockItems(): Promise<any[]>;
    addStockItem(stockData: any): Promise<any>;
    updateStockItem(itemId: string, stockData: any): Promise<any | null>;
    deleteStockItem(itemId: string): Promise<boolean>;
    getInventoryUsageByShift(shiftId: string): Promise<any[]>;
}
