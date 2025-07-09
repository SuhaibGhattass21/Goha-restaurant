"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftService = void 0;
class ShiftService {
    constructor(useCases) {
        this.useCases = useCases;
    }
    openShift(dto) {
        return this.useCases.openShift(dto);
    }
    updateType(dto) {
        return this.useCases.updateType(dto);
    }
    requestClose(dto) {
        return this.useCases.requestClose(dto);
    }
    approveClose(dto) {
        return this.useCases.approveClose(dto);
    }
    getShiftsByStatus(dto) {
        return this.useCases.getShiftsByStatus(dto.status);
    }
    async getRequestedCloseShifts() {
        const shifts = await this.useCases.getRequestedCloseShifts();
        return shifts.map(shift => this.toResponseDto(shift));
    }
    getById(id) {
        return this.useCases.getById(id);
    }
    getByCashierId(cashierId) {
        return this.useCases.getByCashierId(cashierId);
    }
    async getShiftsByType(type) {
        const shifts = await this.useCases.getShiftsByType(type);
        return shifts.map(this.toResponseDto);
    }
    async getShiftsByDate(date) {
        const shifts = await this.useCases.getShiftsByDate(date);
        return shifts.map(this.toResponseDto);
    }
    getSummary(id) {
        return this.useCases.getSummary(id);
    }
    getAllSummaries() {
        return this.useCases.getAllSummaries();
    }
    delete(id) {
        return this.useCases.delete(id);
    }
    toResponseDto(shift) {
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
exports.ShiftService = ShiftService;
//# sourceMappingURL=Shift.service.js.map