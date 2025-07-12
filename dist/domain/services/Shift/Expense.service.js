"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseService = void 0;
class ExpenseService {
    constructor(useCases) {
        this.useCases = useCases;
    }
    create(dto) {
        return this.useCases.create(dto);
    }
    getAll() {
        return this.useCases.getAll();
    }
    getById(id) {
        return this.useCases.getById(id);
    }
    update(id, dto) {
        return this.useCases.update(id, dto);
    }
    delete(id) {
        return this.useCases.delete(id);
    }
}
exports.ExpenseService = ExpenseService;
//# sourceMappingURL=Expense.service.js.map