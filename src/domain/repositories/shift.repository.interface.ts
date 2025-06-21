import { Shift } from '@infrastructure/database/models';
import { OpenShiftDTO, UpdateShiftTypeDTO, RequestCloseShiftDTO, ApproveCloseShiftDTO } from '@application/dtos/Shift.dto';

export interface IShiftRepository {
    getShiftSummary(shiftId: string): Promise<any>
    getAllShiftSummaries(): Promise<any[]>
    create(shiftData: OpenShiftDTO): Promise<Shift>;
    findById(shiftId: string): Promise<Shift | null>
    findByCashierId(cashierId: string): Promise<Shift[]>;
    updateType(data: UpdateShiftTypeDTO): Promise<Shift | null>;
    requestClose(data: RequestCloseShiftDTO): Promise<Shift | null>;
    approveClose(data: ApproveCloseShiftDTO): Promise<Shift | null>;
    delete(shiftId: string): Promise<boolean>
}