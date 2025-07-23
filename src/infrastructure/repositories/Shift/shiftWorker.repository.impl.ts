import { IShiftWorkerRepository } from "../../../domain/repositories/Shift/shiftWorker.repository.interface";
import { ShiftWorker } from "../../../infrastructure/database/models";
import { Repository } from "typeorm";
import { AddShiftWorkerDto, UpdateShiftWorkerDto } from "../../../application/dtos/Shift/ShiftWorker.dto";
import { differenceInMinutes } from 'date-fns';

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

    async updateEndTimeAndCalculateSalary(shift_worker_id: string, end_time: Date): Promise<ShiftWorker> {
        const worker = await this.repo.findOneBy({ shift_worker_id });
        if (!worker || !worker.start_time || !worker.hourly_rate) {
            throw new Error('Required data missing');
        }

        worker.end_time = end_time;
        const durationInMinutes = differenceInMinutes(end_time, worker.start_time);
        const hours = durationInMinutes / 60;
        worker.calculated_salary = parseFloat((hours * Number(worker.hourly_rate)).toFixed(2));

        return await this.repo.save(worker);
    }
    async delete(id: string): Promise<boolean> {
        const result = await this.repo.delete(id);
        return result.affected !== 0;
    }

    async findById(id: string): Promise<ShiftWorker | null> {
        return await this.repo.findOne({ where: { shift_worker_id: id }, relations: ['shift', 'worker'] });
    }

    async findByShiftId(shiftId: string): Promise<ShiftWorker[]> {
        return await this.repo.find({ where: { shift: { shift_id: shiftId } }, relations: ['worker', 'shift'] });
    }
}
