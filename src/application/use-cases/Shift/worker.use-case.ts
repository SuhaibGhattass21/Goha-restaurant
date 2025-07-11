import { IWorkerRepository } from "../../../domain/repositories/Shift/worker.repository.interface";
import { CreateWorkerDto, UpdateWorkerDto, WorkerResponseDto } from "../../../application/dtos/Shift/Worker.dto";
import { Worker } from "@infrastructure/database/models";

export class WorkerUseCases {
    constructor(private repo: IWorkerRepository) { }

    async create(data: CreateWorkerDto): Promise<WorkerResponseDto> {
        const existingByNameAndPhone = await this.repo.findBy({
            full_name: data.full_name,
            ...(data.phone && { phone: data.phone }),
        });
        if (existingByNameAndPhone) {
            throw new Error("Worker with the same name and phone already exists.");
        }

        if (data.user_id) {
            const existingWithUser = await this.repo.findBy({ user_id: data.user_id });
            if (existingWithUser) {
                throw new Error("This user is already assigned to another worker.");
            }
        }

        const worker = await this.repo.create(data);
        return this.toResponse(worker);
    }

    async getById(id: string): Promise<WorkerResponseDto | null> {
        const worker = await this.repo.findById(id);
        return worker ? this.toResponse(worker) : null;
    }

    async getAll(page = 1, limit = 10): Promise<WorkerResponseDto[]> {
        const workers = await this.repo.findAll(page, limit);
        return workers.map(this.toResponse);
    }

    async update(id: string, data: UpdateWorkerDto): Promise<WorkerResponseDto | null> {
        const updated = await this.repo.update(id, data);
        return updated ? this.toResponse(updated) : null;
    }

    async delete(id: string): Promise<boolean> {
        return await this.repo.delete(id);
    }

    private toResponse(worker: Worker): WorkerResponseDto {
        return {
            worker_id: worker.worker_id,
            full_name: worker.full_name,
            status: worker.status,
            base_hourly_rate: +worker.base_hourly_rate,
            phone: worker.phone,
            is_active: worker.is_active,
            joined_at: worker.joined_at,
            user_id: worker.user?.id,
        };
    }
}
