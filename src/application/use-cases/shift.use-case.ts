import { IShiftRepository } from '@domain/repositories/shift.repository.interface';
import type {
    OpenShiftDTO,
    UpdateShiftTypeDTO,
    RequestCloseShiftDTO,
    ApproveCloseShiftDTO,
    ShiftResponseDto
} from '@application/dtos/Shift.dto';
import type { Shift } from '@infrastructure/database/models/Shift.model';

export class ShiftUseCases {
    constructor(private readonly shiftRepository: IShiftRepository) { }

    async openShift(data: OpenShiftDTO): Promise<ShiftResponseDto> {
        const shift = await this.shiftRepository.create(data);
        return this.mapToResponseDto(shift);
    }

    async getShiftById(id: string): Promise<ShiftResponseDto | null> {
        const shift = await this.shiftRepository.findById(id);
        if (!shift) return null;

        return this.mapToResponseDto(shift);
    }

    async getShiftsByCashier(cashierId: string): Promise<ShiftResponseDto[]> {
        const shifts = await this.shiftRepository.findByCashierId(cashierId);
        return shifts.map(s => this.mapToResponseDto(s));
    }

    async updateShiftType(data: UpdateShiftTypeDTO): Promise<Shift | null> {
        return await this.shiftRepository.updateType(data);
    }

    async requestCloseShift(data: RequestCloseShiftDTO): Promise<Shift | null> {
        const shift = await this.shiftRepository.findById(data.shift_id);
        if (!shift || shift.is_closed) {
            throw new Error('Shift not found or already closed');
        }

        return await this.shiftRepository.requestClose(data);
    }

    async approveCloseShift(data: ApproveCloseShiftDTO): Promise<Shift | null> {
        const shift = await this.shiftRepository.findById(data.shift_id);
        if (!shift || !shift.is_close_requested) {
            throw new Error('Close not requested or shift not found');
        }

        return await this.shiftRepository.approveClose(data);
    }

    async deleteShift(id: string): Promise<boolean> {
        const shift = await this.shiftRepository.findById(id);
        if (!shift) return false;

        return await this.shiftRepository.delete(id);
    }

    async getShiftSummary(shiftId: string): Promise<any> {
        const summary = await this.shiftRepository.getShiftSummary(shiftId);
        if (!summary) {
            throw new Error('Summary not found');
        }

        return summary;
    }

    async getAllShiftSummaries(): Promise<any[]> {
        return await this.shiftRepository.getAllShiftSummaries();
    }

    private mapToResponseDto(shift: Shift): ShiftResponseDto {
        return {
            shift_id: shift.shift_id,
            shift_type: shift.shift_type,
            is_closed: shift.is_closed,
            is_close_requested: shift.is_close_requested,
            created_at: shift.created_at,
            end_time: shift.end_time,
            opened_by_cashier_id: shift.opened_by?.id ?? shift.opened_by,
            closed_by_cashier_id: shift.closed_by?.id ?? shift.closed_by,
            approved_by_admin_id: shift.approved_by_admin_id?.id
        };
    }
}
