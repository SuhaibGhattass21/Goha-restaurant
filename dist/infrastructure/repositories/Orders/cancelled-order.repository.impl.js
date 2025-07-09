"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelledOrderRepositoryImpl = void 0;
class CancelledOrderRepositoryImpl {
    constructor(cancelledOrderRepository) {
        this.cancelledOrderRepository = cancelledOrderRepository;
    }
    async create(cancelledOrderData) {
        const cancelledOrder = this.cancelledOrderRepository.create({
            order: { order_id: cancelledOrderData.order_id },
            cancelled_by: { id: cancelledOrderData.cancelled_by },
            shift: { shift_id: cancelledOrderData.shift_id },
            reason: cancelledOrderData.reason,
        });
        return await this.cancelledOrderRepository.save(cancelledOrder);
    }
    async findById(id) {
        return await this.cancelledOrderRepository.findOne({
            where: { cancelled_order_id: id },
            relations: ["order", "cancelled_by", "shift"],
        });
    }
    async findByOrderId(orderId) {
        return await this.cancelledOrderRepository.findOne({
            where: { order: { order_id: orderId } },
            relations: ["order", "cancelled_by", "shift"],
        });
    }
    async findByCancelledBy(userId, page = 1, limit = 10) {
        const [cancelledOrders, total] = await this.cancelledOrderRepository.findAndCount({
            where: { cancelled_by: { id: userId } },
            relations: ["order", "cancelled_by", "shift"],
            skip: (page - 1) * limit,
            take: limit,
            order: { cancelled_at: "DESC" },
        });
        return { cancelledOrders, total };
    }
    async findByShiftId(shiftId, page = 1, limit = 10) {
        const [cancelledOrders, total] = await this.cancelledOrderRepository.findAndCount({
            where: { shift: { shift_id: shiftId } },
            relations: ["order", "cancelled_by", "shift"],
            skip: (page - 1) * limit,
            take: limit,
            order: { cancelled_at: "DESC" },
        });
        return { cancelledOrders, total };
    }
    async findAll(page = 1, limit = 10) {
        const [cancelledOrders, total] = await this.cancelledOrderRepository.findAndCount({
            relations: ["order", "cancelled_by", "shift"],
            skip: (page - 1) * limit,
            take: limit,
            order: { cancelled_at: "DESC" },
        });
        return { cancelledOrders, total };
    }
}
exports.CancelledOrderRepositoryImpl = CancelledOrderRepositoryImpl;
//# sourceMappingURL=cancelled-order.repository.impl.js.map