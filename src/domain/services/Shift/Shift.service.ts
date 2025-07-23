import type {
    OpenShiftDTO,
    UpdateShiftTypeDTO,
    RequestCloseShiftDTO,
    ApproveCloseShiftDTO,
    ShiftResponseDto,
    FilterShiftByStatusDto,
    ShiftSummaryResponseDto,
    ShiftSummaryFilterDto
} from '@application/dtos/Shift/Shift.dto';
import { ShiftUseCases } from '../../../application/use-cases/Shift/shift.use-case';
import { Shift } from '../../../infrastructure/database/models/Shift.model';
import { ShiftType } from '../../../domain/enums/Shift.enums';

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

    getShiftsByStatus(dto: FilterShiftByStatusDto) {
        return this.useCases.getShiftsByStatus(dto.status);
    }
    async getRequestedCloseShifts(): Promise<ShiftResponseDto[]> {
        const shifts = await this.useCases.getRequestedCloseShifts();
        return shifts.map(shift => this.toResponseDto(shift));
    }

    getById(id: string) {
        return this.useCases.getById(id);
    }

    getByCashierId(cashierId: string) {
        return this.useCases.getByCashierId(cashierId);
    }

    async getShiftsByType(type: ShiftType): Promise<ShiftResponseDto[]> {
        const shifts = await this.useCases.getShiftsByType(type);
        return shifts.map(this.toResponseDto);
    }

    async getShiftsByDate(date: Date): Promise<ShiftResponseDto[]> {
        const shifts = await this.useCases.getShiftsByDate(date);
        return shifts.map(this.toResponseDto);
    }

    async getSummaryByShiftId(shiftId: string): Promise<ShiftSummaryResponseDto> {
        return this.useCases.getSummaryByShiftId(shiftId);
    }

    async getSummaryByShiftTypeAndDate(filter: ShiftSummaryFilterDto): Promise<ShiftSummaryResponseDto> {
        return this.useCases.getSummaryByShiftTypeAndDate(filter);
    }

    // getAllSummaries() {
    //     return this.useCases.getAllSummaries();
    // }

    delete(id: string) {
        return this.useCases.delete(id);
    }

    private toResponseDto(shift: Shift): ShiftResponseDto {
        return {
            shift_id: shift.shift_id,
            shift_type: shift.shift_type,
            status: shift.status,
            intial_balance: shift.initial_balance,
            is_closed: shift.is_closed,
            is_started_by_cashier: shift.is_started_by_cashier,
            is_close_requested: shift.is_close_requested,
            start_time: shift.start_time,
            end_time: shift.end_time,
            opened_by: shift.opened_by?.id ?? "",
            closed_by: shift.closed_by?.id ?? "",
            approved_by_admin_id: shift.approved_by_admin_id?.id ?? "",
            created_at: shift.created_at,
        };
    }
}
