import { ShiftWorker } from "@infrastructure/database/models";
import { AddShiftWorkerDto, UpdateShiftWorkerDto } from "../../../application/dtos/Shift/ShiftWorker.dto";

export interface IShiftWorkerRepository {
    create(data: AddShiftWorkerDto): Promise<ShiftWorker>;
    update(id: string, data: UpdateShiftWorkerDto): Promise<ShiftWorker | null>;
    delete(id: string): Promise<boolean>;
    findById(id: string): Promise<ShiftWorker | null>;
    findByShiftId(shiftId: string): Promise<ShiftWorker[]>;
}
