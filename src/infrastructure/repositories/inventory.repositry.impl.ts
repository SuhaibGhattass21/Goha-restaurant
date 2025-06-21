import { AppDataSource } from '../database/postgres/db';
import { IInventoryRepository } from "@domain/repositories/inventory.repository.interface"


export class InventoryRepository implements IInventoryRepository {
    getAllStockItems(): Promise<any[]> {
        throw new Error('Method not implemented.');
    }
    addStockItem(stockData: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    updateStockItem(itemId: string, stockData: any): Promise<any | null> {
        throw new Error('Method not implemented.');
    }
    deleteStockItem(itemId: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    async getInventoryUsageByShift(shiftId: string): Promise<any[]> {
        return AppDataSource.query(
            `SELECT * FROM inventory_usage_view WHERE shift_id = $1`,
            [shiftId]
        );
    }
}
