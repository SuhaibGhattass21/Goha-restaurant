import { Repository } from 'typeorm';
import type { Shift } from '@infrastructure/database/models/Shift.model';
import type { OpenShiftDTO, UpdateShiftTypeDTO, RequestCloseShiftDTO, ApproveCloseShiftDTO } from '../../../application/dtos/Shift/Shift.dto';
import { IShiftRepository } from '../../../domain/repositories/Shift/shift.repository.interface';
import { ShiftStatus, ShiftType } from '../../../domain/enums/Shift.enums';
export declare class ShiftRepositoryImpl implements IShiftRepository {
    private repo;
    constructor(repo: Repository<Shift>);
    create(data: OpenShiftDTO): Promise<Shift>;
    findById(id: string): Promise<Shift | null>;
    findByCashierId(cashierId: string): Promise<Shift[]>;
    updateType(data: UpdateShiftTypeDTO): Promise<Shift | null>;
    requestClose(data: RequestCloseShiftDTO): Promise<Shift | null>;
    approveClose(data: ApproveCloseShiftDTO): Promise<Shift | null>;
    delete(id: string): Promise<boolean>;
    getShiftsByStatus(status: ShiftStatus): Promise<Shift[]>;
    getRequestedCloseShifts(): Promise<Shift[]>;
    findByType(type: ShiftType): Promise<Shift[]>;
    findByDate(date: Date): Promise<Shift[]>;
    getShiftSummary(shiftId: string): Promise<any>;
    getAllShiftSummaries(): Promise<any[]>;
}
