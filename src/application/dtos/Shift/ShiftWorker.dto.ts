import {
    IsUUID,
    IsNumber,
    IsOptional,
    IsDate,
    IsEnum,
    Min,
    IsArray,
    ValidateNested,
    IsString
} from 'class-validator';
import { Type } from 'class-transformer';
import { WorkerStatus } from '../../../domain/enums/Worker.enums';

export class AddShiftWorkerDto {
    @IsUUID()
    worker_id!: string;

    @IsUUID()
    shift_id!: string;

    @IsEnum(WorkerStatus)
    status!: WorkerStatus;

    @IsNumber()
    @Min(0)
    hourly_rate!: number;

    @IsDate()
    start_time: Date = new Date();

    @IsOptional()
    @IsDate()
    end_time?: Date;
}

export class UpdateShiftWorkerDto {
    @IsOptional()
    @IsUUID()
    shift_id?: string;

    @IsOptional()
    @IsUUID()
    worker_id?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    hourly_rate?: number;

    @IsOptional()
    @IsDate()
    start_time?: Date;

    @IsOptional()
    @IsDate()
    end_time?: Date;

    @IsOptional()
    @IsNumber()
    @Min(0)
    calculated_salary?: number;
}

export class UpdateShiftWorkerEndDto {
    @IsUUID()
    shift_worker_id!: string;

    @IsDate()
    @Type(() => Date)
    end_time!: Date;
}

export class ShiftWorkerIdParamDto { @IsUUID() id!: string }
export class ShiftIdParamDto { @IsUUID() shiftId!: string }

export class ShiftWorkerResponseDto {
    @IsUUID()
    shift_worker_id!: string;

    @IsUUID()
    shift_id!: string;

    @IsUUID()
    worker_id!: string;

    @IsString()
    worker_name!: string;

    @IsEnum(WorkerStatus)
    status!: WorkerStatus;

    @IsNumber()
    hourly_rate!: number;

    @IsDate()
    start_time!: Date;

    @IsOptional()
    @IsDate()
    end_time?: Date;

    @IsNumber()
    calculated_salary!: number;
}

export class AssignMultipleShiftWorkersDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AddShiftWorkerDto)
    workers!: AddShiftWorkerDto[];
}
