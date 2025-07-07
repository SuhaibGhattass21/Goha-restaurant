import { CreateExpenseDto, UpdateExpenseDto } from '../../dtos/Shift/Expense.dto';
import { ExpenseRepositoryImpl } from '../../../infrastructure/repositories/Shift/expense.repository.impl';

export class ExpenseUseCases {
    constructor(private repo: ExpenseRepositoryImpl) { }

    create(dto: CreateExpenseDto) {
        return this.repo.create(dto);
    }

    getAll() {
        return this.repo.findAll();
    }

    getById(id: string) {
        return this.repo.findById(id);
    }

    update(id: string, dto: UpdateExpenseDto) {
        return this.repo.update(id, dto);
    }

    delete(id: string) {
        return this.repo.delete(id);
    }
}
