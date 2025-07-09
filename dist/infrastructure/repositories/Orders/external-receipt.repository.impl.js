"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalReceiptRepositoryImpl = void 0;
class ExternalReceiptRepositoryImpl {
    constructor(repo) {
        this.repo = repo;
    }
    async create(data) {
        const receipt = this.repo.create({
            order: { order_id: data.order_id },
            shift: { shift_id: data.shift_id },
            cashier: { id: data.cashier_id },
            total_amount: data.total_amount,
            payment_method: data.payment_method,
            image_url: data.image_url,
            is_printed: data.is_printed ?? false,
            notes: data.notes,
        });
        return await this.repo.save(receipt);
    }
    async findById(id) {
        return await this.repo.findOne({
            where: { receipt_id: id },
            relations: ["order", "shift", "cashier"],
        });
    }
    async findAll() {
        return await this.repo.find({
            order: { created_at: "DESC" },
            relations: ["order", "shift", "cashier"],
        });
    }
}
exports.ExternalReceiptRepositoryImpl = ExternalReceiptRepositoryImpl;
//# sourceMappingURL=external-receipt.repository.impl.js.map