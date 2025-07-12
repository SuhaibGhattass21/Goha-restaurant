export declare class CreateExpenseDto {
    shift_id: string;
    created_by: string;
    title: string;
    description?: string;
    amount: number;
}
export declare class UpdateExpenseDto {
    title?: string;
    description?: string;
    amount?: number;
}
export declare class ExpenseResponseDto {
    expense_id: string;
    title: string;
    description?: string;
    amount: number;
    shift_id: string;
    created_by: string;
    created_at: Date;
}
