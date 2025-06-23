import { Shift } from '@infrastructure/database/models';
import { OpenShiftDTO, UpdateShiftTypeDTO, RequestCloseShiftDTO, ApproveCloseShiftDTO } from '@application/dtos/Shift/Shift.dto';

export interface IShiftRepository {
    create(data: OpenShiftDTO): Promise<Shift>;
    findById(id: string): Promise<Shift | null>;
    findByCashierId(cashierId: string): Promise<Shift[]>;
    updateType(data: UpdateShiftTypeDTO): Promise<Shift | null>;
    requestClose(data: RequestCloseShiftDTO): Promise<Shift | null>;
    approveClose(data: ApproveCloseShiftDTO): Promise<Shift | null>;
    delete(id: string): Promise<boolean>;
    getShiftSummary(shiftId: string): Promise<any>;
    getAllShiftSummaries(): Promise<any[]>;
}