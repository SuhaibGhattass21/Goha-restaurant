import {
    IsEnum,
    IsUUID,
    ValidateNested,
    IsArray,
    IsOptional,
    IsString,
    IsNumber,
    IsBoolean,
    IsDate,
    Min,
    IsDateString
} from 'class-validator';
import { Type } from 'class-transformer';
import { ShiftType } from '../../../domain/enums/Shift.enums';
import { ShiftStatus } from '../../../domain/enums/Shift.enums';
import { AddShiftWorkerDto } from './ShiftWorker.dto';

export class OpenShiftDTO {
    @IsUUID()
    opened_by!: string;

    @IsEnum(ShiftType)
    shift_type!: ShiftType;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    intial_balance!: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AddShiftWorkerDto)
    workers?: AddShiftWorkerDto[];
}

export class UpdateShiftTypeDTO {
    @IsUUID()
    shift_id!: string;

    @IsEnum(ShiftType)
    shift_type!: ShiftType;

    @IsUUID()
    admin_id!: string;
}

export class RequestCloseShiftDTO {
    @IsUUID()
    shift_id!: string;

    @IsUUID()
    closed_by!: string;
}

export class ApproveCloseShiftDTO {
    @IsUUID()
    shift_id!: string;

    @IsUUID()
    approved_by_admin_id!: string;
}

export class FilterShiftByStatusDto {
    @IsEnum(ShiftStatus)
    status!: ShiftStatus;
}

export class ShiftResponseDto {
    @IsUUID()
    shift_id!: string;

    @IsEnum(ShiftType)
    shift_type!: ShiftType;

    @IsEnum(ShiftStatus)
    status!: ShiftStatus;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    intial_balance!: number;

    @IsBoolean()
    is_closed!: boolean;

    @IsBoolean()
    is_started_by_cashier!: boolean;

    @IsBoolean()
    is_close_requested!: boolean;

    @IsDate()
    start_time!: Date;

    @IsOptional()
    @IsDate()
    end_time?: Date;

    @IsUUID()
    opened_by!: string;

    @IsOptional()
    @IsUUID()
    closed_by?: string;

    @IsOptional()
    @IsUUID()
    approved_by_admin_id?: string;

    @IsDate()
    created_at!: Date;
}

export class CashierDto {
    @IsUUID()
    user_id!: string;

    @IsString()
    username!: string;
}

export class ShiftSummaryResponseDto {
    @IsUUID()
    shift_id!: string;

    @IsEnum(ShiftType)
    shift_type!: ShiftType;

    @IsDate()
    start_time!: Date;

    @IsDate()
    end_time!: Date;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    total_revenue!: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    cafe_revenue!: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    total_expenses!: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    total_salaries!: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    final_number!: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CashierDto)
    cashiers!: CashierDto[];

    @IsNumber()
    total_orders!: number;
}

export class ShiftSummaryFilterDto {
    @IsEnum(ShiftType)
    shift_type!: ShiftType;

    @Type(() => Date)
    @IsDate()
    date!: Date;
}
