import { AddShiftWorkerDto, ShiftWorkerResponseDto, UpdateShiftWorkerDto } from "../../dtos/Shift/ShiftWorker.dto";
import { IShiftWorkerRepository } from "../../../domain/repositories/Shift/shiftWorker.repository.interface";
export declare class ShiftWorkerUseCase {
    private repo;
    constructor(repo: IShiftWorkerRepository);
    create(data: AddShiftWorkerDto): Promise<ShiftWorkerResponseDto>;
    update(id: string, data: UpdateShiftWorkerDto): Promise<ShiftWorkerResponseDto | null>;
    delete(id: string): Promise<boolean>;
    getById(id: string): Promise<ShiftWorkerResponseDto | null>;
    getByShiftId(shiftId: string): Promise<ShiftWorkerResponseDto[]>;
    private mapToDto;
}
