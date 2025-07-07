import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import { CreateExpenseDto, UpdateExpenseDto } from "../../../../application/dtos/Shift/Expense.dto";
import { ExpenseService } from "../../../../domain/services/Shift/Expense.service";

export class ExpenseController {
    constructor(private service: ExpenseService) { }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const dto = plainToInstance(CreateExpenseDto, req.body);
            await validateOrReject(dto);
            const expense = await this.service.create(dto);
            res.status(201).json(expense);
        } catch (error) {
            res.status(400).json({ message: "Validation failed", error });
        }
    }

    async getAll(_: Request, res: Response): Promise<void> {
        const expenses = await this.service.getAll();
        res.status(200).json(expenses);
    }

    async getById(req: Request, res: Response): Promise<void> {
        const expense = await this.service.getById(req.params.id);
        expense ? res.status(200).json(expense) : res.status(404).json({ message: "Not found" });
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const dto = plainToInstance(UpdateExpenseDto, req.body);
            await validateOrReject(dto);
            await this.service.update(req.params.id, dto);
            res.status(200).json({ message: "Expense updated" });
        } catch (error) {
            res.status(400).json({ message: "Validation failed", error });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        await this.service.delete(req.params.id);
        res.status(200).json({ message: "Expense deleted" });
    }
}
