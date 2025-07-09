"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const inventory_repositry_impl_1 = require("../../infrastructure/repositories/inventory.repositry.impl");
class InventoryService {
    constructor() {
        this.inventoryRepo = new inventory_repositry_impl_1.InventoryRepository();
    }
    async getUsageByShift(shiftId) {
        return this.inventoryRepo.getInventoryUsageByShift(shiftId);
    }
}
exports.InventoryService = InventoryService;
//# sourceMappingURL=Stock.service.js.map