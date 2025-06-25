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
import { ShiftType } from '../../../domain/enums/Shift.enums';
import { ShiftStatus } from '../../../domain/enums/Shift.enums';
import { AddShiftWorkerDto } from './ShiftWorker.dto';

export class OpenShiftDTO {
    @IsUUID()
    opened_by!: string;

    @IsEnum(ShiftType)
    shift_type!: ShiftType;

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

export class ShiftResponseDto {
    @IsUUID()
    shift_id!: string;

    @IsEnum(ShiftType)
    shift_type!: ShiftType;

    @IsEnum(ShiftStatus)
    status!: ShiftStatus;

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

