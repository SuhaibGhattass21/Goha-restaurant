import { IsString, IsNumber, IsUUID, Min, IsOptional } from 'class-validator';

export class CreateExpenseDto {
    @IsUUID()
    shift_id!: string;

    @IsUUID()
    created_by!: string;

    @IsString()
    title!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0.01)
    amount!: number;
}

export class UpdateExpenseDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    amount?: number;
}

export class ExpenseIdParamDto { @IsUUID() id!: string }

export class ExpenseResponseDto {
    expense_id!: string;
    title!: string;
    description?: string;
    amount!: number;
    shift_id!: string;
    created_by!: string;
    created_at!: Date;
}
