import { IWorkerRepository } from "../../../domain/repositories/Shift/worker.repository.interface";
import { CreateWorkerDto, UpdateWorkerDto, WorkerResponseDto } from "../../../application/dtos/Shift/Worker.dto";
export declare class WorkerUseCases {
    private repo;
    constructor(repo: IWorkerRepository);
    create(data: CreateWorkerDto): Promise<WorkerResponseDto>;
    getById(id: string): Promise<WorkerResponseDto | null>;
    getAll(page?: number, limit?: number): Promise<WorkerResponseDto[]>;
    update(id: string, data: UpdateWorkerDto): Promise<WorkerResponseDto | null>;
    delete(id: string): Promise<boolean>;
    private toResponse;
}
