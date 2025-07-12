import { CreateExpenseDto, UpdateExpenseDto } from '../../dtos/Shift/Expense.dto';
import { ExpenseRepositoryImpl } from '../../../infrastructure/repositories/Shift/expense.repository.impl';
export declare class ExpenseUseCases {
    private repo;
    constructor(repo: ExpenseRepositoryImpl);
    create(dto: CreateExpenseDto): Promise<import("../../../infrastructure/database/models").Expense>;
    getAll(): Promise<import("../../../infrastructure/database/models").Expense[]>;
    getById(id: string): Promise<import("../../../infrastructure/database/models").Expense | null>;
    update(id: string, dto: UpdateExpenseDto): Promise<void>;
    delete(id: string): Promise<void>;
}
