import { WorkerStatus } from '../../../domain/enums/Worker.enums';
export declare class CreateWorkerDto {
    full_name: string;
    status: WorkerStatus;
    base_hourly_rate: number;
    phone?: string;
    user_id?: string;
}
export declare class UpdateWorkerDto {
    full_name?: string;
    status?: WorkerStatus;
    base_hourly_rate?: number;
    phone?: string;
    is_active?: boolean;
    user_id?: string;
}
export declare class WorkerResponseDto {
    worker_id: string;
    full_name: string;
    status: WorkerStatus;
    base_hourly_rate: number;
    phone?: string;
    is_active: boolean;
    joined_at: Date;
    user_id?: string;
}
