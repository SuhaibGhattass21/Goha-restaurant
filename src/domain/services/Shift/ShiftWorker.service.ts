import { ShiftWorkerUseCase } from "../../../application/use-cases/Shift/shiftWorker.use-case";
import { AddShiftWorkerDto, ShiftWorkerResponseDto, UpdateShiftWorkerDto, UpdateShiftWorkerEndDto } from "../../../application/dtos/Shift/ShiftWorker.dto";
import { ShiftWorker } from "@infrastructure/database/models";

export class ShiftWorkerService {
    constructor(private usecase: ShiftWorkerUseCase) { }

    async create(data: AddShiftWorkerDto): Promise<ShiftWorkerResponseDto> {
        return await this.usecase.create(data);
    }

    async update(id: string, data: UpdateShiftWorkerDto): Promise<ShiftWorkerResponseDto | null> {
        return await this.usecase.update(id, data);
    }

    async updateEndTime(dto: UpdateShiftWorkerEndDto): Promise<ShiftWorker> {
        return this.usecase.updateEndTimeAndCalculateSalary(dto);
    }

    async getById(id: string): Promise<ShiftWorkerResponseDto | null> {
        return await this.usecase.getById(id);
    }

    async getByShiftId(shiftId: string): Promise<ShiftWorkerResponseDto[]> {
        return await this.usecase.getByShiftId(shiftId);
    }

    async delete(id: string): Promise<boolean> {
        return await this.usecase.delete(id);
    }
}
