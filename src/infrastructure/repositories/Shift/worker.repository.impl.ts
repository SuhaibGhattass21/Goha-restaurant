import { Repository } from "typeorm";
import { Worker } from "@infrastructure/database/models";
import { CreateWorkerDto, UpdateWorkerDto } from "../../../application/dtos/Shift/Worker.dto";
import { IWorkerRepository } from "../../../domain/repositories/Shift/worker.repository.interface";

export class WorkerRepositoryImpl implements IWorkerRepository {
    constructor(private repo: Repository<Worker>) { }

    async create(data: CreateWorkerDto): Promise<Worker> {
        const worker = this.repo.create(data);
        return await this.repo.save(worker);
    }

    async findById(id: string): Promise<Worker | null> {
        return await this.repo.findOne({
            where: { worker_id: id },
            relations: ["user"]
        });
    }

    async findAll(page = 1, limit = 10): Promise<Worker[]> {
        return await this.repo.find({
            skip: (page - 1) * limit,
            take: limit,
            order: { joined_at: "DESC" },
            relations: ["user"]
        });
    }

    async findBy(filter: Partial<Worker>): Promise<Worker | null> {
        return await this.repo.findOne({ where: filter, relations: ["user"] });
    }

    async update(id: string, data: UpdateWorkerDto): Promise<Worker | null> {
        const worker = await this.findById(id);
        if (!worker) return null;

        Object.assign(worker, data);
        return await this.repo.save(worker);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repo.delete(id);
        return result.affected !== 0;
    }
}
