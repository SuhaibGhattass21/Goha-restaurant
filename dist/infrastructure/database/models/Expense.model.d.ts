import { Shift } from './Shift.model';
import { User } from './user.model';
export declare class Expense {
    expense_id: string;
    title: string;
    description?: string;
    amount: number;
    shift: Shift;
    created_by: User;
    created_at: Date;
}
