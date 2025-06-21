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
} from 'class-validator';
import { Type } from 'class-transformer';
import { ShiftType } from '@domain/enums/Shift.enums';
import { WorkerStatus } from '../../domain/enums/Worker.enums';

export class OpenShiftDTO {
    @IsUUID()
    cashier_id!: string;

    @IsEnum(ShiftType)
    shift_type!: ShiftType;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AddShiftWorkerDTO)
    workers!: AddShiftWorkerDTO[];
}

export class UpdateShiftTypeDTO {
    @IsUUID()
    shift_id!: string;

    @IsEnum(ShiftType)
    shift_type!: ShiftType;

    @IsUUID()
    admin_id!: string;
}

export class AddShiftWorkerDTO {
    @IsUUID()
    shift_id!: string;

    @IsUUID()
    user_id!: string;

    @IsNumber()
    hourly_rate!: number;

    @IsEnum(WorkerStatus)
    status!: WorkerStatus;

    @IsOptional()
    @IsString()
    phone?: string;
}

export class RequestCloseShiftDTO {
    @IsUUID()
    shift_id!: string;

    @IsUUID()
    cashier_id!: string;
}

export class ApproveCloseShiftDTO {
    @IsUUID()
    shift_id!: string;

    @IsUUID()
    admin_id!: string;
}

export class ShiftResponseDto {
    @IsUUID()
    shift_id!: string;

    @IsEnum(ShiftType)
    shift_type!: ShiftType;

    @IsBoolean()
    is_closed!: boolean;

    @IsBoolean()
    is_close_requested!: boolean;

    @IsDate()
    created_at!: Date;

    @IsOptional()
    @IsDate()
    end_time?: Date;

    @IsUUID()
    opened_by_cashier_id!: string;

    @IsOptional()
    @IsUUID()
    closed_by_cashier_id?: string;

    @IsOptional()
    @IsUUID()
    approved_by_admin_id?: string;
}

