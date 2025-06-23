import {
    IsString,
    IsUUID,
    IsEnum,
    IsPhoneNumber,
    IsOptional,
    IsBoolean,
    IsNumber,
    Min,
} from 'class-validator';
import { WorkerStatus } from '../../../domain/enums/Worker.enums';

export class CreateWorkerDto {
    @IsString()
    full_name!: string;

    @IsEnum(WorkerStatus)
    status!: WorkerStatus;

    @IsNumber()
    @Min(0)
    base_hourly_rate!: number;

    @IsOptional()
    @IsPhoneNumber()
    phone?: string;

    @IsOptional()
    @IsUUID()
    user_id?: string;
}

export class UpdateWorkerDto {
    @IsOptional()
    @IsString()
    full_name?: string;

    @IsOptional()
    @IsEnum(WorkerStatus)
    status?: WorkerStatus;

    @IsOptional()
    @IsNumber()
    base_hourly_rate?: number;

    @IsOptional()
    @IsPhoneNumber()
    phone?: string;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

    @IsOptional()
    @IsUUID()
    user_id?: string;
}

export class WorkerResponseDto {
    @IsUUID()
    worker_id!: string;

    @IsString()
    full_name!: string;

    @IsEnum(WorkerStatus)
    status!: WorkerStatus;

    @IsNumber()
    base_hourly_rate!: number;

    @IsOptional()
    @IsPhoneNumber()
    phone?: string;

    @IsBoolean()
    is_active!: boolean;

    @IsOptional()
    joined_at!: Date;

    @IsOptional()
    @IsUUID()
    user_id?: string;
}
