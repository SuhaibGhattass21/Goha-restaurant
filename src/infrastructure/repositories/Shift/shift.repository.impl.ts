import { Repository, Between } from 'typeorm'
import type { Shift } from '@infrastructure/database/models/Shift.model'
import type {
    OpenShiftDTO,
    UpdateShiftTypeDTO,
    RequestCloseShiftDTO,
    ApproveCloseShiftDTO,
    ShiftSummaryResponseDto,
    ShiftSummaryFilterDto
} from '../../../application/dtos/Shift/Shift.dto'
import { IShiftRepository } from '../../../domain/repositories/Shift/shift.repository.interface'
import { ShiftStatus, ShiftType } from '../../../domain/enums/Shift.enums'
import { startOfDay, endOfDay } from 'date-fns'

export class ShiftRepositoryImpl implements IShiftRepository {
    constructor(private repo: Repository<Shift>) { }

    async create(data: OpenShiftDTO): Promise<Shift> {
        const shift = this.repo.create({
            shift_type: data.shift_type,
            initial_balance: data.intial_balance,
            status: ShiftStatus.OPENED,
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

    async getSummaryByShiftId(shiftId: string): Promise<ShiftSummaryResponseDto> {
        const shift = await this.repo.findOne({
            where: { shift_id: shiftId },
            relations: ['orders', 'orders.cashier', 'shiftWorkers', 'expenses', 'opened_by'],
        });

        if (!shift) throw new Error('Shift not found');

        const orders = shift.orders ?? [];
        const nonCafeOrders = orders.filter(o => o.order_type !== 'cafe');
        const cafeOrders = orders.filter(o => o.order_type === 'cafe');

        const totalOrders = orders.length;
        const totalRevenue = nonCafeOrders.reduce((acc, o) => acc + Number(o.total_price), 0);
        const cafeRevenue = cafeOrders.reduce((acc, o) => acc + Number(o.total_price), 0);
        const totalExpenses = (shift.expenses ?? []).reduce((acc, e) => acc + Number(e.amount), 0);
        const totalSalaries = (shift.shiftWorkers ?? []).reduce((acc, sw) => acc + Number(sw.calculated_salary), 0);

        const cashiersMap = new Map<string, string>();

        if (shift.opened_by) {
            cashiersMap.set(shift.opened_by.id, shift.opened_by.username);
        }

        orders.forEach(order => {
            if (order.cashier) {
                cashiersMap.set(order.cashier.id, order.cashier.username);
            }
        });

        const cashiers = [...cashiersMap.entries()].map(([user_id, username]) => ({
            user_id,
            username,
        }));

        return {
            shift_id: shift.shift_id,
            shift_type: shift.shift_type,
            start_time: shift.start_time,
            end_time: shift.end_time!,
            total_orders: totalOrders,
            total_revenue: totalRevenue,
            cafe_revenue: cafeRevenue,
            total_expenses: totalExpenses,
            total_salaries: totalSalaries,
            final_number: totalRevenue - totalExpenses - totalSalaries,
            cashiers,
        };
    }

    async getShiftSummaryByTypeAndDate(filter: ShiftSummaryFilterDto): Promise<ShiftSummaryResponseDto> {
        const { date, shift_type } = filter;

        const start = startOfDay(date);
        const end = endOfDay(date);

        const shift = await this.repo.findOne({
            where: {
                shift_type,
                start_time: Between(start, end),
            },
            relations: ['orders', 'orders.cashier', 'expenses', 'shiftWorkers', 'opened_by'],
        });

        if (!shift) throw new Error('Shift not found');

        const orders = shift.orders ?? [];
        const nonCafeOrders = orders.filter(o => o.order_type !== 'cafe');
        const cafeOrders = orders.filter(o => o.order_type === 'cafe');

        const totalOrders = orders.length;
        const totalRevenue = nonCafeOrders.reduce((acc, o) => acc + Number(o.total_price), 0);
        const cafeRevenue = cafeOrders.reduce((acc, o) => acc + Number(o.total_price), 0);
        const totalExpenses = (shift.expenses ?? []).reduce((acc, e) => acc + Number(e.amount), 0);
        const totalSalaries = (shift.shiftWorkers ?? []).reduce((acc, sw) => acc + Number(sw.calculated_salary), 0);

        const cashiersMap = new Map<string, string>();

        if (shift.opened_by) {
            cashiersMap.set(shift.opened_by.id, shift.opened_by.username);
        }

        orders.forEach(order => {
            if (order.cashier) {
                cashiersMap.set(order.cashier.id, order.cashier.username);
            }
        });

        const cashiers = [...cashiersMap.entries()].map(([user_id, username]) => ({
            user_id,
            username,
        }));

        return {
            shift_id: shift.shift_id,
            shift_type: shift.shift_type,
            start_time: shift.start_time,
            end_time: shift.end_time!,
            total_orders: totalOrders,
            total_revenue: totalRevenue,
            cafe_revenue: cafeRevenue,
            total_expenses: totalExpenses,
            total_salaries: totalSalaries,
            final_number: totalRevenue - totalExpenses - totalSalaries,
            cashiers,
        };
    }

    // async getAllShiftSummaries(): Promise<any[]> {
    //     return this.repo.query(`SELECT * FROM shift_summary_view ORDER BY start_time DESC`);
    // }
}
