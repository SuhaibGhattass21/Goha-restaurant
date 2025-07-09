"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryRepository = void 0;
const db_1 = require("../database/postgres/db");
class InventoryRepository {
    getAllStockItems() {
        throw new Error('Method not implemented.');
    }
    addStockItem(stockData) {
        throw new Error('Method not implemented.');
    }
    updateStockItem(itemId, stockData) {
        throw new Error('Method not implemented.');
    }
    deleteStockItem(itemId) {
        throw new Error('Method not implemented.');
    }
    async getInventoryUsageByShift(shiftId) {
        return db_1.AppDataSource.query(`SELECT * FROM inventory_usage_view WHERE shift_id = $1`, [shiftId]);
    }
}
exports.InventoryRepository = InventoryRepository;
//# sourceMappingURL=inventory.repositry.impl.js.map