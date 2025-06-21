import type {
    OpenShiftDTO,
    UpdateShiftTypeDTO,
    RequestCloseShiftDTO,
    ApproveCloseShiftDTO,
    ShiftResponseDto
} from '@application/dtos/Shift.dto';
import type { Shift } from '@infrastructure/database/models/Shift.model';
import { ShiftUseCases } from '@application/use-cases/shift.use-case';

export class ShiftService {
    constructor(private readonly shiftUseCases: ShiftUseCases) { }

    openShift(data: OpenShiftDTO): Promise<ShiftResponseDto> {
        return this.shiftUseCases.openShift(data);
    }

    updateShiftType(data: UpdateShiftTypeDTO): Promise<Shift | null> {
        return this.shiftUseCases.updateShiftType(data);
    }

    requestCloseShift(data: RequestCloseShiftDTO): Promise<Shift | null> {
        return this.shiftUseCases.requestCloseShift(data);
    }

    approveCloseShift(data: ApproveCloseShiftDTO): Promise<Shift | null> {
        return this.shiftUseCases.approveCloseShift(data);
    }

    getShiftById(id: string): Promise<ShiftResponseDto | null> {
        return this.shiftUseCases.getShiftById(id);
    }

    getShiftSummary(id: string): Promise<any> {
        return this.shiftUseCases.getShiftSummary(id);
    }

    getAllSummaries(): Promise<any[]> {
        return this.shiftUseCases.getAllShiftSummaries();
    }

    getShiftsByCashier(cashierId: string): Promise<ShiftResponseDto[]> {
        return this.shiftUseCases.getShiftsByCashier(cashierId);
    }

    deleteShift(id: string): Promise<boolean> {
        return this.shiftUseCases.deleteShift(id);
    }
}
