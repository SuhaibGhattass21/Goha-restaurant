import { AddShiftWorkerDto, ShiftWorkerResponseDto, UpdateShiftWorkerDto, UpdateShiftWorkerEndDto } from "../../dtos/Shift/ShiftWorker.dto";
import { IShiftWorkerRepository } from "../../../domain/repositories/Shift/shiftWorker.repository.interface";
import { ShiftWorker } from "@infrastructure/database/models";

export class ShiftWorkerUseCase {
    constructor(private repo: IShiftWorkerRepository) { }

    async create(data: AddShiftWorkerDto): Promise<ShiftWorkerResponseDto> {
        const shiftWorker = await this.repo.create(data);
        return this.mapToDto(shiftWorker);
    }

    async update(id: string, data: UpdateShiftWorkerDto): Promise<ShiftWorkerResponseDto | null> {
        const updated = await this.repo.update(id, data);
        return updated ? this.mapToDto(updated) : null;
    }

    async updateEndTimeAndCalculateSalary(dto: UpdateShiftWorkerEndDto): Promise<ShiftWorker> {
        return this.repo.updateEndTimeAndCalculateSalary(dto.shift_worker_id, dto.end_time);
    }

    async delete(id: string): Promise<boolean> {
        return await this.repo.delete(id);
    }

    async getById(id: string): Promise<ShiftWorkerResponseDto | null> {
        const sw = await this.repo.findById(id);
        return sw ? this.mapToDto(sw) : null;
    }

    async getByShiftId(shiftId: string): Promise<ShiftWorkerResponseDto[]> {
        const list = await this.repo.findByShiftId(shiftId);
        return list.map(this.mapToDto);
    }

    private mapToDto(entity: any): ShiftWorkerResponseDto {
        return {
            shift_worker_id: entity.shift_worker_id,
            shift_id: entity.shift?.shift_id,
            worker_id: entity.worker?.worker_id,
            worker_name: entity.worker?.full_name,
            status: entity.status?.status,
            hourly_rate: entity.hourly_rate,
            start_time: entity.start_time,
            end_time: entity.end_time,
            calculated_salary: entity.calculated_salary
        };
    }
}
