"use strict";
// infrastructure/repositories/Shift/expense.repository.impl.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseRepositoryImpl = void 0;
class ExpenseRepositoryImpl {
    constructor(repo) {
        this.repo = repo;
    }
    async create(data) {
        const entity = this.repo.create({
            title: data.title,
            amount: data.amount,
            created_by: { id: data.created_by },
            shift: { shift_id: data.shift_id },
        });
        return await this.repo.save(entity);
    }
    async findAll() {
        return this.repo.find({ relations: ["shift", "created_by"] });
    }
    async findById(id) {
        return this.repo.findOne({ where: { expense_id: id }, relations: ["shift", "created_by"] });
    }
    async update(id, data) {
        await this.repo.update(id, data);
    }
    async delete(id) {
        await this.repo.delete(id);
    }
}
exports.ExpenseRepositoryImpl = ExpenseRepositoryImpl;
//# sourceMappingURL=expense.repository.impl.js.map