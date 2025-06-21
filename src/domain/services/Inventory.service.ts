import { InventoryRepository } from '../../infrastructure/repositories/inventory.repositry.impl';

export class InventoryService {
    private inventoryRepo = new InventoryRepository();

    async getUsageByShift(shiftId: string) {
        return this.inventoryRepo.getInventoryUsageByShift(shiftId);
    }
}
