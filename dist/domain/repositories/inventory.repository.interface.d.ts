export interface IInventoryRepository {
    getInventoryUsageByShift(shiftId: string): Promise<any[]>;
    getAllStockItems(): Promise<any[]>;
    addStockItem(stockData: any): Promise<any>;
    updateStockItem(itemId: string, stockData: any): Promise<any | null>;
    deleteStockItem(itemId: string): Promise<boolean>;
}
