// infrastructure/repositories/Shift/expense.repository.impl.ts

import { IExpenseRepository } from "../../../domain/repositories/Shift/expense.repository.interface";
import { Repository } from "typeorm";
import { Expense } from "../../database/models/Expense.model";
import { CreateExpenseDto, UpdateExpenseDto } from "../../../application/dtos/Shift/Expense.dto";

export class ExpenseRepositoryImpl implements IExpenseRepository {
    constructor(private repo: Repository<Expense>) { }

    async create(data: CreateExpenseDto): Promise<Expense> {
        const entity = this.repo.create({
            title: data.title,
            amount: data.amount,
            created_by: { id: data.created_by },
            shift: { shift_id: data.shift_id },
        });
        return await this.repo.save(entity);
    }

    async findAll(): Promise<Expense[]> {
        return this.repo.find({ relations: ["shift", "created_by"] });
    }

    async findById(id: string): Promise<Expense | null> {
        return this.repo.findOne({ where: { expense_id: id }, relations: ["shift", "created_by"] });
    }

    async update(id: string, data: UpdateExpenseDto): Promise<void> {
        await this.repo.update(id, data);
    }

    async delete(id: string): Promise<void> {
        await this.repo.delete(id);
    }
}
