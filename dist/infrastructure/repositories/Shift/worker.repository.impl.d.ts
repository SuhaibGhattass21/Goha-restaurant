import { Repository } from "typeorm";
import { Worker } from "@infrastructure/database/models";
import { CreateWorkerDto, UpdateWorkerDto } from "../../../application/dtos/Shift/Worker.dto";
import { IWorkerRepository } from "../../../domain/repositories/Shift/worker.repository.interface";
export declare class WorkerRepositoryImpl implements IWorkerRepository {
    private repo;
    constructor(repo: Repository<Worker>);
    create(data: CreateWorkerDto): Promise<Worker>;
    findById(id: string): Promise<Worker | null>;
    findAll(page?: number, limit?: number): Promise<Worker[]>;
    findBy(filter: Partial<Worker>): Promise<Worker | null>;
    update(id: string, data: UpdateWorkerDto): Promise<Worker | null>;
    delete(id: string): Promise<boolean>;
}
