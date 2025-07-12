"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerRepositoryImpl = void 0;
class WorkerRepositoryImpl {
    constructor(repo) {
        this.repo = repo;
    }
    async create(data) {
        const worker = this.repo.create(data);
        return await this.repo.save(worker);
    }
    async findById(id) {
        return await this.repo.findOne({
            where: { worker_id: id },
            relations: ["user"]
        });
    }
    async findAll(page = 1, limit = 10) {
        return await this.repo.find({
            skip: (page - 1) * limit,
            take: limit,
            order: { joined_at: "DESC" },
            relations: ["user"]
        });
    }
    async findBy(filter) {
        return await this.repo.findOne({ where: filter, relations: ["user"] });
    }
    async update(id, data) {
        const worker = await this.findById(id);
        if (!worker)
            return null;
        Object.assign(worker, data);
        return await this.repo.save(worker);
    }
    async delete(id) {
        const result = await this.repo.delete(id);
        return result.affected !== 0;
    }
}
exports.WorkerRepositoryImpl = WorkerRepositoryImpl;
//# sourceMappingURL=worker.repository.impl.js.map