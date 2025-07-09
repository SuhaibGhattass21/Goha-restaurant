import { IExpenseRepository } from "../../../domain/repositories/Shift/expense.repository.interface";
import { Repository } from "typeorm";
import { Expense } from "../../database/models/Expense.model";
import { CreateExpenseDto, UpdateExpenseDto } from "../../../application/dtos/Shift/Expense.dto";
export declare class ExpenseRepositoryImpl implements IExpenseRepository {
    private repo;
    constructor(repo: Repository<Expense>);
    create(data: CreateExpenseDto): Promise<Expense>;
    findAll(): Promise<Expense[]>;
    findById(id: string): Promise<Expense | null>;
    update(id: string, data: UpdateExpenseDto): Promise<void>;
    delete(id: string): Promise<void>;
}
