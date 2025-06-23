import type {
    OpenShiftDTO,
    UpdateShiftTypeDTO,
    RequestCloseShiftDTO,
    ApproveCloseShiftDTO,
    ShiftResponseDto
} from '@application/dtos/Shift/Shift.dto';
import type { Shift } from '@infrastructure/database/models/Shift.model';
import { ShiftUseCases } from '@application/use-cases/Shift/shift.use-case';

export class ShiftService {
    constructor(private useCases: ShiftUseCases) { }

    openShift(dto: OpenShiftDTO) {
        return this.useCases.openShift(dto);
    }

    updateType(dto: UpdateShiftTypeDTO) {
        return this.useCases.updateType(dto);
    }

    requestClose(dto: RequestCloseShiftDTO) {
        return this.useCases.requestClose(dto);
    }

    approveClose(dto: ApproveCloseShiftDTO) {
        return this.useCases.approveClose(dto);
    }

    getById(id: string) {
        return this.useCases.getById(id);
    }

    getByCashierId(cashierId: string) {
        return this.useCases.getByCashierId(cashierId);
    }

    getSummary(id: string) {
        return this.useCases.getSummary(id);
    }

    getAllSummaries() {
        return this.useCases.getAllSummaries();
    }

    delete(id: string) {
        return this.useCases.delete(id);
    }
}
