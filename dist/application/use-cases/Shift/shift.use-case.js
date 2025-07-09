"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftUseCases = void 0;
class ShiftUseCases {
    constructor(repo) {
        this.repo = repo;
    }
    async openShift(data) {
        const shift = await this.repo.create(data);
        return this.mapToDto(shift);
    }
    async updateType(dto) {
        const shift = await this.repo.updateType(dto);
        return shift ? this.mapToDto(shift) : null;
    }
    async requestClose(dto) {
        const shift = await this.repo.requestClose(dto);
        return shift ? this.mapToDto(shift) : null;
    }
    async approveClose(dto) {
        const shift = await this.repo.approveClose(dto);
        return shift ? this.mapToDto(shift) : null;
    }
    async getShiftsByStatus(status) {
        return this.repo.getShiftsByStatus(status);
    }
    async getRequestedCloseShifts() {
        return this.repo.getRequestedCloseShifts();
    }
    async getById(id) {
        const shift = await this.repo.findById(id);
        return shift ? this.mapToDto(shift) : null;
    }
    async getByCashierId(cashierId) {
        const shifts = await this.repo.findByCashierId(cashierId);
        return shifts.map(this.mapToDto);
    }
    async delete(id) {
        return await this.repo.delete(id);
    }
    async getShiftsByType(shift_type) {
        return this.repo.findByType(shift_type);
    }
    async getShiftsByDate(date) {
        return this.repo.findByDate(date);
    }
    async getSummary(id) {
        return this.repo.getShiftSummary(id);
    }
    async getAllSummaries() {
        return this.repo.getAllShiftSummaries();
    }
    mapToDto(shift) {
        return {
            shift_id: shift.shift_id,
            shift_type: shift.shift_type,
            status: shift.status,
            intial_balance: shift.initial_balance,
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
exports.ShiftUseCases = ShiftUseCases;
//# sourceMappingURL=shift.use-case.js.map