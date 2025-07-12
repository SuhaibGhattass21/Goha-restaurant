"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftWorkerService = void 0;
class ShiftWorkerService {
    constructor(usecase) {
        this.usecase = usecase;
    }
    async create(data) {
        return await this.usecase.create(data);
    }
    async update(id, data) {
        return await this.usecase.update(id, data);
    }
    async getById(id) {
        return await this.usecase.getById(id);
    }
    async getByShiftId(shiftId) {
        return await this.usecase.getByShiftId(shiftId);
    }
    async delete(id) {
        return await this.usecase.delete(id);
    }
}
exports.ShiftWorkerService = ShiftWorkerService;
//# sourceMappingURL=ShiftWorker.service.js.map