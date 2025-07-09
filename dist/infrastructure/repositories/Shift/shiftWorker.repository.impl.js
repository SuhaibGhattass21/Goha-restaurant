"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftWorkerRepositoryImpl = void 0;
class ShiftWorkerRepositoryImpl {
    constructor(repo) {
        this.repo = repo;
    }
    async create(data) {
        const shiftWorker = this.repo.create(data);
        return await this.repo.save(shiftWorker);
    }
    async update(id, data) {
        const record = await this.repo.findOne({ where: { shift_worker_id: id } });
        if (!record)
            return null;
        Object.assign(record, data);
        return await this.repo.save(record);
    }
    async delete(id) {
        const result = await this.repo.delete(id);
        return result.affected !== 0;
    }
    async findById(id) {
        return await this.repo.findOne({ where: { shift_worker_id: id }, relations: ['shift', 'worker'] });
    }
    async findByShiftId(shiftId) {
        return await this.repo.find({ where: { shift: { shift_id: shiftId } }, relations: ['worker'] });
    }
}
exports.ShiftWorkerRepositoryImpl = ShiftWorkerRepositoryImpl;
//# sourceMappingURL=shiftWorker.repository.impl.js.map