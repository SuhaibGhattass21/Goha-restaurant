import { IShiftWorkerRepository } from "../../../domain/repositories/Shift/shiftWorker.repository.interface";
import { ShiftWorker } from "../../../infrastructure/database/models";
import { Repository } from "typeorm";
import { AddShiftWorkerDto, UpdateShiftWorkerDto } from "../../../application/dtos/Shift/ShiftWorker.dto";
export declare class ShiftWorkerRepositoryImpl implements IShiftWorkerRepository {
    private repo;
    constructor(repo: Repository<ShiftWorker>);
    create(data: AddShiftWorkerDto): Promise<ShiftWorker>;
    update(id: string, data: UpdateShiftWorkerDto): Promise<ShiftWorker | null>;
    delete(id: string): Promise<boolean>;
    findById(id: string): Promise<ShiftWorker | null>;
    findByShiftId(shiftId: string): Promise<ShiftWorker[]>;
}
