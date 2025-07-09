import { CreateExpenseDto, UpdateExpenseDto } from '../../../application/dtos/Shift/Expense.dto';
import { ExpenseUseCases } from '../../../application/use-cases/Shift/expense.use-case';
export declare class ExpenseService {
    private useCases;
    constructor(useCases: ExpenseUseCases);
    create(dto: CreateExpenseDto): Promise<import("../../../infrastructure/database/models").Expense>;
    getAll(): Promise<import("../../../infrastructure/database/models").Expense[]>;
    getById(id: string): Promise<import("../../../infrastructure/database/models").Expense | null>;
    update(id: string, dto: UpdateExpenseDto): Promise<void>;
    delete(id: string): Promise<void>;
}
