"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseController = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const Expense_dto_1 = require("../../../../application/dtos/Shift/Expense.dto");
class ExpenseController {
    constructor(service) {
        this.service = service;
    }
    async create(req, res) {
        try {
            const dto = (0, class_transformer_1.plainToInstance)(Expense_dto_1.CreateExpenseDto, req.body);
            await (0, class_validator_1.validateOrReject)(dto);
            const expense = await this.service.create(dto);
            res.status(201).json(expense);
        }
        catch (error) {
            res.status(400).json({ message: "Validation failed", error });
        }
    }
    async getAll(_, res) {
        const expenses = await this.service.getAll();
        res.status(200).json(expenses);
    }
    async getById(req, res) {
        const expense = await this.service.getById(req.params.id);
        expense ? res.status(200).json(expense) : res.status(404).json({ message: "Not found" });
    }
    async update(req, res) {
        try {
            const dto = (0, class_transformer_1.plainToInstance)(Expense_dto_1.UpdateExpenseDto, req.body);
            await (0, class_validator_1.validateOrReject)(dto);
            await this.service.update(req.params.id, dto);
            res.status(200).json({ message: "Expense updated" });
        }
        catch (error) {
            res.status(400).json({ message: "Validation failed", error });
        }
    }
    async delete(req, res) {
        await this.service.delete(req.params.id);
        res.status(200).json({ message: "Expense deleted" });
    }
}
exports.ExpenseController = ExpenseController;
//# sourceMappingURL=expense.controller.js.map