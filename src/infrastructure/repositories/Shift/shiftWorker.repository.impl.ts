import { IShiftWorkerRepository } from "../../../domain/repositories/Shift/shiftWorker.repository.interface";
import { ShiftWorker } from "../../../infrastructure/database/models";
import { Repository } from "typeorm";
import { AddShiftWorkerDto, UpdateShiftWorkerDto } from "../../../application/dtos/Shift/ShiftWorker.dto";

export class ShiftWorkerRepositoryImpl implements IShiftWorkerRepository {
    constructor(private repo: Repository<ShiftWorker>) { }

    async create(data: AddShiftWorkerDto): Promise<ShiftWorker> {
        const shiftWorker = this.repo.create(data);
        return await this.repo.save(shiftWorker);
    }

    async update(id: string, data: UpdateShiftWorkerDto): Promise<ShiftWorker | null> {
        const record = await this.repo.findOne({ where: { shift_worker_id: id } });
        if (!record) return null;

        Object.assign(record, data);
        return await this.repo.save(record);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repo.delete(id);
        return result.affected !== 0;
    }

    async findById(id: string): Promise<ShiftWorker | null> {
        return await this.repo.findOne({ where: { shift_worker_id: id }, relations: ['shift', 'worker'] });
    }

    async findByShiftId(shiftId: string): Promise<ShiftWorker[]> {
        return await this.repo.find({ where: { shift: { shift_id: shiftId } }, relations: ['worker'] });
    }
}
