import { WorkerUseCases } from "../../../application/use-cases/Shift/worker.use-case";
import { CreateWorkerDto, UpdateWorkerDto } from "@application/dtos/Shift/Worker.dto";
export declare class WorkerService {
    private useCases;
    constructor(useCases: WorkerUseCases);
    create(dto: CreateWorkerDto): Promise<import("@application/dtos/Shift/Worker.dto").WorkerResponseDto>;
    getById(id: string): Promise<import("@application/dtos/Shift/Worker.dto").WorkerResponseDto | null>;
    getAll(page?: number, limit?: number): Promise<import("@application/dtos/Shift/Worker.dto").WorkerResponseDto[]>;
    update(id: string, dto: UpdateWorkerDto): Promise<import("@application/dtos/Shift/Worker.dto").WorkerResponseDto | null>;
    delete(id: string): Promise<boolean>;
}
