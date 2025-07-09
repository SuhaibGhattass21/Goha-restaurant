import { IShiftRepository } from '@domain/repositories/Shift/shift.repository.interface';
import type { OpenShiftDTO, UpdateShiftTypeDTO, RequestCloseShiftDTO, ApproveCloseShiftDTO, ShiftResponseDto } from '@application/dtos/Shift/Shift.dto';
import type { Shift } from '@infrastructure/database/models/Shift.model';
import { ShiftStatus, ShiftType } from '../../../domain/enums/Shift.enums';
export declare class ShiftUseCases {
    private repo;
    constructor(repo: IShiftRepository);
    openShift(data: OpenShiftDTO): Promise<ShiftResponseDto>;
    updateType(dto: UpdateShiftTypeDTO): Promise<ShiftResponseDto | null>;
    requestClose(dto: RequestCloseShiftDTO): Promise<ShiftResponseDto | null>;
    approveClose(dto: ApproveCloseShiftDTO): Promise<ShiftResponseDto | null>;
    getShiftsByStatus(status: ShiftStatus): Promise<Shift[]>;
    getRequestedCloseShifts(): Promise<Shift[]>;
    getById(id: string): Promise<ShiftResponseDto | null>;
    getByCashierId(cashierId: string): Promise<ShiftResponseDto[]>;
    delete(id: string): Promise<boolean>;
    getShiftsByType(shift_type: ShiftType): Promise<Shift[]>;
    getShiftsByDate(date: Date): Promise<Shift[]>;
    getSummary(id: string): Promise<any>;
    getAllSummaries(): Promise<any[]>;
    private mapToDto;
}
