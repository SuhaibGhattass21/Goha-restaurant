import type { OpenShiftDTO, UpdateShiftTypeDTO, RequestCloseShiftDTO, ApproveCloseShiftDTO, ShiftResponseDto, FilterShiftByStatusDto } from '@application/dtos/Shift/Shift.dto';
import { ShiftUseCases } from '../../../application/use-cases/Shift/shift.use-case';
import { Shift } from '../../../infrastructure/database/models/Shift.model';
import { ShiftType } from '../../../domain/enums/Shift.enums';
export declare class ShiftService {
    private useCases;
    constructor(useCases: ShiftUseCases);
    openShift(dto: OpenShiftDTO): Promise<ShiftResponseDto>;
    updateType(dto: UpdateShiftTypeDTO): Promise<ShiftResponseDto | null>;
    requestClose(dto: RequestCloseShiftDTO): Promise<ShiftResponseDto | null>;
    approveClose(dto: ApproveCloseShiftDTO): Promise<ShiftResponseDto | null>;
    getShiftsByStatus(dto: FilterShiftByStatusDto): Promise<Shift[]>;
    getRequestedCloseShifts(): Promise<ShiftResponseDto[]>;
    getById(id: string): Promise<ShiftResponseDto | null>;
    getByCashierId(cashierId: string): Promise<ShiftResponseDto[]>;
    getShiftsByType(type: ShiftType): Promise<ShiftResponseDto[]>;
    getShiftsByDate(date: Date): Promise<ShiftResponseDto[]>;
    getSummary(id: string): Promise<any>;
    getAllSummaries(): Promise<any[]>;
    delete(id: string): Promise<boolean>;
    private toResponseDto;
}
