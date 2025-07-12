"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftWorkerUseCase = void 0;
class ShiftWorkerUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async create(data) {
        const shiftWorker = await this.repo.create(data);
        return this.mapToDto(shiftWorker);
    }
    async update(id, data) {
        const updated = await this.repo.update(id, data);
        return updated ? this.mapToDto(updated) : null;
    }
    async delete(id) {
        return await this.repo.delete(id);
    }
    async getById(id) {
        const sw = await this.repo.findById(id);
        return sw ? this.mapToDto(sw) : null;
    }
    async getByShiftId(shiftId) {
        const list = await this.repo.findByShiftId(shiftId);
        return list.map(this.mapToDto);
    }
    mapToDto(entity) {
        return {
            shift_worker_id: entity.shift_worker_id,
            shift_id: entity.shift?.shift_id,
            worker_id: entity.worker?.worker_id,
            status: entity.status?.status,
            hourly_rate: entity.hourly_rate,
            start_time: entity.start_time,
            end_time: entity.end_time,
            calculated_salary: entity.calculated_salary
        };
    }
}
exports.ShiftWorkerUseCase = ShiftWorkerUseCase;
//# sourceMappingURL=shiftWorker.use-case.js.map