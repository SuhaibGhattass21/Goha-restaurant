import { WorkerUseCases } from "../../../application/use-cases/Shift/worker.use-case";
import { CreateWorkerDto, UpdateWorkerDto } from "@application/dtos/Shift/Worker.dto";

export class WorkerService {
    constructor(private useCases: WorkerUseCases) { }

    create(dto: CreateWorkerDto) {
        return this.useCases.create(dto);
    }

    getById(id: string) {
        return this.useCases.getById(id);
    }

    getAll(page = 1, limit = 10) {
        return this.useCases.getAll(page, limit);
    }

    update(id: string, dto: UpdateWorkerDto) {
        return this.useCases.update(id, dto);
    }

    delete(id: string) {
        return this.useCases.delete(id);
    }
}
