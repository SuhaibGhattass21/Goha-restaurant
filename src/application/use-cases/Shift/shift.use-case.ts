import { IShiftRepository } from '@domain/repositories/Shift/shift.repository.interface';
import type {
    OpenShiftDTO,
    UpdateShiftTypeDTO,
    RequestCloseShiftDTO,
    ApproveCloseShiftDTO,
    ShiftResponseDto
} from '@application/dtos/Shift/Shift.dto';
import type { Shift } from '@infrastructure/database/models/Shift.model';
import { ShiftStatus, ShiftType } from '../../../domain/enums/Shift.enums';

export class ShiftUseCases {
    constructor(private repo: IShiftRepository) { }

    async openShift(data: OpenShiftDTO): Promise<ShiftResponseDto> {
        const shift = await this.repo.create(data);
        return this.mapToDto(shift);
    }

    async updateType(dto: UpdateShiftTypeDTO): Promise<ShiftResponseDto | null> {
        const shift = await this.repo.updateType(dto);
        return shift ? this.mapToDto(shift) : null;
    }

    async requestClose(dto: RequestCloseShiftDTO): Promise<ShiftResponseDto | null> {
        const shift = await this.repo.requestClose(dto);
        return shift ? this.mapToDto(shift) : null;
    }

    async approveClose(dto: ApproveCloseShiftDTO): Promise<ShiftResponseDto | null> {
        const shift = await this.repo.approveClose(dto);
        return shift ? this.mapToDto(shift) : null;
    }

    async getShiftsByStatus(status: ShiftStatus): Promise<Shift[]> {
        return this.repo.getShiftsByStatus(status);
    }

    async getRequestedCloseShifts(): Promise<Shift[]> {
        return this.repo.getRequestedCloseShifts();
    }

    async getById(id: string): Promise<ShiftResponseDto | null> {
        const shift = await this.repo.findById(id);
        return shift ? this.mapToDto(shift) : null;
    }

    async getByCashierId(cashierId: string): Promise<ShiftResponseDto[]> {
        const shifts = await this.repo.findByCashierId(cashierId);
        return shifts.map(this.mapToDto);
    }

    async delete(id: string): Promise<boolean> {
        return await this.repo.delete(id);
    }

    async getShiftsByType(shift_type: ShiftType): Promise<Shift[]> {
        return this.repo.findByType(shift_type);
    }

    async getShiftsByDate(date: Date): Promise<Shift[]> {
        return this.repo.findByDate(date);
    }


    async getSummary(id: string): Promise<any> {
        return this.repo.getShiftSummary(id);
    }

    async getAllSummaries(): Promise<any[]> {
        return this.repo.getAllShiftSummaries();
    }

    private mapToDto(shift: Shift): ShiftResponseDto {
        return {
            shift_id: shift.shift_id,
            shift_type: shift.shift_type,
            status: shift.status,
            start_time: shift.start_time,
            end_time: shift.end_time,
            is_closed: shift.is_closed,
            is_close_requested: shift.is_close_requested,
            is_started_by_cashier: shift.is_started_by_cashier,
            opened_by: shift.opened_by?.id,
            closed_by: shift.closed_by?.id,
            approved_by_admin_id: shift.approved_by_admin_id?.id,
            created_at: shift.created_at,
        };
    }
}