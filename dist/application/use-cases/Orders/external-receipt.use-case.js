"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalReceiptUseCases = void 0;
class ExternalReceiptUseCases {
    constructor(repo) {
        this.repo = repo;
    }
    async create(data) {
        return await this.repo.create(data);
    }
    async getById(id) {
        return await this.repo.findById(id);
    }
    async getAll() {
        return await this.repo.findAll();
    }
}
exports.ExternalReceiptUseCases = ExternalReceiptUseCases;
//# sourceMappingURL=external-receipt.use-case.js.map