"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftRepositoryImpl = void 0;
const typeorm_1 = require("typeorm");
const Shift_enums_1 = require("../../../domain/enums/Shift.enums");
class ShiftRepositoryImpl {
    constructor(repo) {
        this.repo = repo;
    }
    async create(data) {
        const shift = this.repo.create({
            shift_type: data.shift_type,
            initial_balance: data.intial_balance,
            status: Shift_enums_1.ShiftStatus.OPENED,
            start_time: new Date(),
            end_time: new Date(),
            opened_by: { id: data.opened_by },
            is_started_by_cashier: true,
            is_close_requested: false,
            is_closed: false,
            created_at: new Date()
        });
        return await this.repo.save(shift);
    }
    async findById(id) {
        return this.repo.findOne({
            where: { shift_id: id },
            relations: ['shiftWorkers'],
        });
    }
    async findByCashierId(cashierId) {
        return this.repo.find({
            where: { opened_by: { id: cashierId } },
            order: { start_time: 'DESC' },
        });
    }
    async updateType(data) {
        await this.repo.update(data.shift_id, { shift_type: data.shift_type });
        return this.findById(data.shift_id);
    }
    async requestClose(data) {
        await this.repo.update(data.shift_id, {
            is_close_requested: true,
            closed_by: { id: data.closed_by }
        });
        return this.findById(data.shift_id);
    }
    async approveClose(data) {
        await this.repo.update(data.shift_id, {
            is_closed: true,
            approved_by_admin_id: { id: data.approved_by_admin_id },
            end_time: new Date(),
        });
        return this.findById(data.shift_id);
    }
    async delete(id) {
        const result = await this.repo.delete(id);
        return result.affected !== 0;
    }
    async getShiftsByStatus(status) {
        return this.repo.find({
            where: { status },
            relations: ["opened_by", "closed_by", "shiftWorkers"],
        });
    }
    async getRequestedCloseShifts() {
        return this.repo.find({
            where: { is_close_requested: true },
            relations: ["opened_by", "closed_by", "approved_by_admin_id", "shiftWorkers"],
            order: { start_time: "DESC" },
        });
    }
    async findByType(type) {
        return await this.repo.find({
            where: { shift_type: type },
            order: { start_time: 'DESC' },
        });
    }
    async findByDate(date) {
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);
        const end = new Date(date);
        end.setHours(23, 59, 59, 999);
        return await this.repo.find({
            where: {
                start_time: (0, typeorm_1.Between)(start, end),
            },
            order: { start_time: 'DESC' },
        });
    }
    async getShiftSummary(shiftId) {
        const result = await this.repo.query(`SELECT * FROM shift_summary_view WHERE shift_id = $1`, [shiftId]);
        return result[0] ?? null;
    }
    async getAllShiftSummaries() {
        return this.repo.query(`SELECT * FROM shift_summary_view ORDER BY start_time DESC`);
    }
}
exports.ShiftRepositoryImpl = ShiftRepositoryImpl;
//# sourceMappingURL=shift.repository.impl.js.map