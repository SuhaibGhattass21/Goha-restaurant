import { Worker } from "@infrastructure/database/models";
import { CreateWorkerDto, UpdateWorkerDto } from "../../../application/dtos/Shift/Worker.dto";

export interface IWorkerRepository {
    create(data: CreateWorkerDto): Promise<Worker>;
    findById(id: string): Promise<Worker | null>;
    findAll(page: number, limit: number): Promise<Worker[]>;
    findBy(filter: Partial<Worker>): Promise<Worker | null>;
    update(id: string, data: UpdateWorkerDto): Promise<Worker | null>;
    delete(id: string): Promise<boolean>;
}
