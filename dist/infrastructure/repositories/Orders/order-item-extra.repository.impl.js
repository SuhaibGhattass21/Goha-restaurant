"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemExtraRepositoryImpl = void 0;
class OrderItemExtraRepositoryImpl {
    constructor(orderItemExtraRepository) {
        this.orderItemExtraRepository = orderItemExtraRepository;
    }
    async create(orderItemExtraData) {
        const orderItemExtra = this.orderItemExtraRepository.create({
            orderItem: { order_item_id: orderItemExtraData.order_item_id },
            extra: { extra_id: orderItemExtraData.extra_id }, // Fixed: using extra_id
            price: orderItemExtraData.price,
        });
        return await this.orderItemExtraRepository.save(orderItemExtra);
    }
    async findById(id) {
        return await this.orderItemExtraRepository.findOne({
            where: { order_item_extra_id: id },
            relations: ["orderItem", "extra", "extra.category"],
        });
    }
    async findByOrderItemId(orderItemId) {
        return await this.orderItemExtraRepository.find({
            where: { orderItem: { order_item_id: orderItemId } },
            relations: ["extra", "extra.category"],
            order: { order_item_extra_id: "ASC" },
        });
    }
    async delete(id) {
        const result = await this.orderItemExtraRepository.delete(id);
        return (result.affected ?? 0) > 0;
    }
    async deleteByOrderItemId(orderItemId) {
        const result = await this.orderItemExtraRepository.delete({
            orderItem: { order_item_id: orderItemId },
        });
        return (result.affected ?? 0) > 0;
    }
    async createMany(orderItemExtras) {
        const entities = orderItemExtras.map((data) => this.orderItemExtraRepository.create({
            orderItem: { order_item_id: data.order_item_id },
            extra: { extra_id: data.extra_id }, // Fixed: using extra_id
            price: data.price,
        }));
        return await this.orderItemExtraRepository.save(entities);
    }
}
exports.OrderItemExtraRepositoryImpl = OrderItemExtraRepositoryImpl;
//# sourceMappingURL=order-item-extra.repository.impl.js.map