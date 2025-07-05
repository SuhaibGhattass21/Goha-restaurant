import { Repository, Between } from 'typeorm'
import type { Shift } from '@infrastructure/database/models/Shift.model'
import type {
    OpenShiftDTO,
    UpdateShiftTypeDTO,
    RequestCloseShiftDTO,
    ApproveCloseShiftDTO,
} from '../../../application/dtos/Shift/Shift.dto'
import { IShiftRepository } from '../../../domain/repositories/Shift/shift.repository.interface'
import { ShiftStatus, ShiftType } from '../../../domain/enums/Shift.enums'

export class ShiftRepositoryImpl implements IShiftRepository {
    constructor(private repo: Repository<Shift>) { }

    async create(data: OpenShiftDTO): Promise<Shift> {
        const shift = this.repo.create({
            shift_type: data.shift_type,
            start_time: new Date(),
            end_time: new Date(),
            opened_by: { id: data.opened_by } as any,
            is_started_by_cashier: true,
            is_close_requested: false,
            is_closed: false,
            created_at: new Date()
        });
        return await this.repo.save(shift);
    }

    async findById(id: string): Promise<Shift | null> {
        return this.repo.findOne({
            where: { shift_id: id },
            relations: ['shiftWorkers'],
        });
    }

    async findByCashierId(cashierId: string): Promise<Shift[]> {
        return this.repo.find({
            where: { opened_by: { id: cashierId } },
            order: { start_time: 'DESC' },
        });
    }

    async updateType(data: UpdateShiftTypeDTO): Promise<Shift | null> {
        await this.repo.update(data.shift_id, { shift_type: data.shift_type });
        return this.findById(data.shift_id);
    }

    async requestClose(data: RequestCloseShiftDTO): Promise<Shift | null> {
        await this.repo.update(data.shift_id, {
            is_close_requested: true,
            closed_by: { id: data.closed_by }
        });
        return this.findById(data.shift_id);
    }

    async approveClose(data: ApproveCloseShiftDTO): Promise<Shift | null> {
        await this.repo.update(data.shift_id, {
            is_closed: true,
            approved_by_admin_id: { id: data.approved_by_admin_id },
            end_time: new Date(),
        });
        return this.findById(data.shift_id);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repo.delete(id);
        return result.affected !== 0;
    }

    async getShiftsByStatus(status: ShiftStatus): Promise<Shift[]> {
        return this.repo.find({
            where: { status },
            relations: ["opened_by", "closed_by", "shiftWorkers"],
        });
    }

    async getRequestedCloseShifts(): Promise<Shift[]> {
        return this.repo.find({
            where: { is_close_requested: true },
            relations: ["opened_by", "closed_by", "approved_by_admin_id", "shiftWorkers"],
            order: { start_time: "DESC" },
        });
    }

    async findByType(type: ShiftType): Promise<Shift[]> {
        return await this.repo.find({
            where: { shift_type: type },
            order: { start_time: 'DESC' },
        });
    }

    async findByDate(date: Date): Promise<Shift[]> {
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);
        const end = new Date(date);
        end.setHours(23, 59, 59, 999);

        return await this.repo.find({
            where: {
                start_time: Between(start, end),
            },
            order: { start_time: 'DESC' },
        });
    }

    async getShiftSummary(shiftId: string): Promise<any> {
        const result = await this.repo.query(`SELECT * FROM shift_summary_view WHERE shift_id = $1`, [shiftId]);
        return result[0] ?? null;
    }

    async getAllShiftSummaries(): Promise<any[]> {
        return this.repo.query(`SELECT * FROM shift_summary_view ORDER BY start_time DESC`);
    }
}
