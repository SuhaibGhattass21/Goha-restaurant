import {
    IsUUID,
    IsNumber,
    IsOptional,
    IsDate,
    IsEnum,
    Min,
} from 'class-validator';
import { WorkerStatus } from '../../../domain/enums/Worker.enums';

export class AddShiftWorkerDto {
    @IsUUID()
    worker_id!: string;

    @IsEnum(WorkerStatus)
    status!: WorkerStatus;

    @IsNumber()
    @Min(0)
    hourly_rate!: number;

    @IsDate()
    start_time!: Date;

    @IsOptional()
    @IsDate()
    end_time?: Date;
}

export class ShiftWorkerResponseDto {
    @IsUUID()
    shift_worker_id!: string;

    @IsUUID()
    shift_id!: string;

    @IsUUID()
    worker_id!: string;

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

