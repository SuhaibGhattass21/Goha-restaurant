import { WorkerStatus } from '../../../domain/enums/Worker.enums';
export declare class AddShiftWorkerDto {
    worker_id: string;
    shift_id: string;
    status: WorkerStatus;
    hourly_rate: number;
    start_time: Date;
    end_time?: Date;
}
export declare class UpdateShiftWorkerDto {
    shift_id?: string;
    worker_id?: string;
    hourly_rate?: number;
    start_time?: Date;
    end_time?: Date;
    calculated_salary?: number;
}
export declare class ShiftWorkerResponseDto {
    shift_worker_id: string;
    shift_id: string;
    worker_id: string;
    status: WorkerStatus;
    hourly_rate: number;
    start_time: Date;
    end_time?: Date;
    calculated_salary: number;
}
export declare class AssignMultipleShiftWorkersDto {
    workers: AddShiftWorkerDto[];
}
