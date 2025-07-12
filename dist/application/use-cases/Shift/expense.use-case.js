"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseUseCases = void 0;
class ExpenseUseCases {
    constructor(repo) {
        this.repo = repo;
    }
    create(dto) {
        return this.repo.create(dto);
    }
    getAll() {
        return this.repo.findAll();
    }
    getById(id) {
        return this.repo.findById(id);
    }
    update(id, dto) {
        return this.repo.update(id, dto);
    }
    delete(id) {
        return this.repo.delete(id);
    }
}
exports.ExpenseUseCases = ExpenseUseCases;
//# sourceMappingURL=expense.use-case.js.map