import { Expense } from "../../../infrastructure/database/models/Expense.model";
import { CreateExpenseDto, UpdateExpenseDto } from "../../../application/dtos/Shift/Expense.dto";

export interface IExpenseRepository {
    create(data: CreateExpenseDto): Promise<Expense>;
    findAll(): Promise<Expense[]>;
    findById(id: string): Promise<Expense | null>;
    update(id: string, data: UpdateExpenseDto): Promise<void>;
    delete(id: string): Promise<void>;
}
