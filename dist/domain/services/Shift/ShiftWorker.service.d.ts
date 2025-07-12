import { ShiftWorkerUseCase } from "../../../application/use-cases/Shift/shiftWorker.use-case";
import { AddShiftWorkerDto, ShiftWorkerResponseDto, UpdateShiftWorkerDto } from "../../../application/dtos/Shift/ShiftWorker.dto";
export declare class ShiftWorkerService {
    private usecase;
    constructor(usecase: ShiftWorkerUseCase);
    create(data: AddShiftWorkerDto): Promise<ShiftWorkerResponseDto>;
    update(id: string, data: UpdateShiftWorkerDto): Promise<ShiftWorkerResponseDto | null>;
    getById(id: string): Promise<ShiftWorkerResponseDto | null>;
    getByShiftId(shiftId: string): Promise<ShiftWorkerResponseDto[]>;
    delete(id: string): Promise<boolean>;
}
