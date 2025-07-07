import { CreateExpenseDto, UpdateExpenseDto } from '../../../application/dtos/Shift/Expense.dto';
import { ExpenseUseCases } from '../../../application/use-cases/Shift/expense.use-case';

export class ExpenseService {
    constructor(private useCases: ExpenseUseCases) { }

    create(dto: CreateExpenseDto) {
        return this.useCases.create(dto);
    }

    getAll() {
        return this.useCases.getAll();
    }

    getById(id: string) {
        return this.useCases.getById(id);
    }

    update(id: string, dto: UpdateExpenseDto) {
        return this.useCases.update(id, dto);
    }

    delete(id: string) {
        return this.useCases.delete(id);
    }
}
