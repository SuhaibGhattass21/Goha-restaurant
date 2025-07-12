"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockItemRepositoryImpl = void 0;
class StockItemRepositoryImpl {
    constructor(stockItemRepository) {
        this.stockItemRepository = stockItemRepository;
    }
    async create(stockItemData) {
        const stockItem = this.stockItemRepository.create({
            ...stockItemData,
            last_updated_at: new Date(),
        });
        return await this.stockItemRepository.save(stockItem);
    }
    async findById(id) {
        return await this.stockItemRepository.findOne({
            where: { stock_item_id: id },
            relations: ["transactions"],
        });
    }
    async findByName(name) {
        return await this.stockItemRepository.findOne({
            where: { name },
        });
    }
    async findAll(page = 1, limit = 10) {
        const [stockItems, total] = await this.stockItemRepository.findAndCount({
            relations: ["transactions"],
            skip: (page - 1) * limit,
            take: limit,
            order: { name: "ASC" },
        });
        return { stockItems, total };
    }
    async findByType(type) {
        return await this.stockItemRepository.find({
            where: { type: type },
            relations: ["transactions"],
            order: { name: "ASC" },
        });
    }
    async findLowStockItems() {
        return await this.stockItemRepository
            .createQueryBuilder("stock_item")
            .where("stock_item.current_quantity <= stock_item.minimum_value")
            .orderBy("stock_item.name", "ASC")
            .getMany();
    }
    async update(id, stockItemData) {
        await this.stockItemRepository.update(id, {
            ...stockItemData,
            last_updated_at: new Date(),
        });
        return await this.findById(id);
    }
    async updateQuantity(id, quantity) {
        await this.stockItemRepository.update(id, {
            current_quantity: quantity,
            last_updated_at: new Date(),
        });
        return await this.findById(id);
    }
    async delete(id) {
        const result = await this.stockItemRepository.delete(id);
        return (result.affected ?? 0) > 0;
    }
}
exports.StockItemRepositoryImpl = StockItemRepositoryImpl;
//# sourceMappingURL=stock-item.repository.js.map