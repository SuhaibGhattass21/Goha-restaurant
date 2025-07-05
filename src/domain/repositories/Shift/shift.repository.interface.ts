import { Shift } from '../../../infrastructure/database/models';
import { ShiftStatus } from '../../../domain/enums/Shift.enums';
import { OpenShiftDTO, UpdateShiftTypeDTO, RequestCloseShiftDTO, ApproveCloseShiftDTO } from '../../../application/dtos/Shift/Shift.dto';
import { ShiftType } from '../../../domain/enums/Shift.enums';

export interface IShiftRepository {
    create(data: OpenShiftDTO): Promise<Shift>;
    findById(id: string): Promise<Shift | null>;
    findByCashierId(cashierId: string): Promise<Shift[]>;
    updateType(data: UpdateShiftTypeDTO): Promise<Shift | null>;
    requestClose(data: RequestCloseShiftDTO): Promise<Shift | null>;
    approveClose(data: ApproveCloseShiftDTO): Promise<Shift | null>;
    delete(id: string): Promise<boolean>;
    findByType(type: ShiftType): Promise<Shift[]>;
    findByDate(date: Date): Promise<Shift[]>;
    getShiftsByStatus(status: ShiftStatus): Promise<Shift[]>;
    getRequestedCloseShifts(): Promise<Shift[]>;
    getShiftSummary(shiftId: string): Promise<any>;
    getAllShiftSummaries(): Promise<any[]>;
}