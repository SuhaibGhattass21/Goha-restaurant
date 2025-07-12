"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerService = void 0;
class WorkerService {
    constructor(useCases) {
        this.useCases = useCases;
    }
    create(dto) {
        return this.useCases.create(dto);
    }
    getById(id) {
        return this.useCases.getById(id);
    }
    getAll(page = 1, limit = 10) {
        return this.useCases.getAll(page, limit);
    }
    update(id, dto) {
        return this.useCases.update(id, dto);
    }
    delete(id) {
        return this.useCases.delete(id);
    }
}
exports.WorkerService = WorkerService;
//# sourceMappingURL=Worker.service.js.map