import type { Repository } from 'typeorm'
import type { Shift } from '@infrastructure/database/models/Shift.model'
import type {
    OpenShiftDTO,
    UpdateShiftTypeDTO,
    RequestCloseShiftDTO,
    ApproveCloseShiftDTO,
    AddShiftWorkerDTO
} from '@application/dtos/Shift.dto'
import { IShiftRepository } from '@domain/repositories/shift.repository.interface'

export class ShiftRepositoryImpl implements IShiftRepository {
    constructor(private shiftRepository: Repository<Shift>) { }

    async create(shiftData: OpenShiftDTO): Promise<Shift> {
        const queryRunner = this.shiftRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const shift = this.shiftRepository.create(shiftData)
            const savedShift = await this.shiftRepository.save(shift)

            const shiftWorkers = shiftData.workers.map((worker: AddShiftWorkerDTO) => ({
                shift_id: savedShift.shift_id,
                user_id: worker.user_id,
                hourly_rate: worker.hourly_rate,
                status: worker.status,
                start_time: new Date(),
                end_time: new Date(),
                calculated_salary: 0,
                joining_date: new Date(),
            }));

            await queryRunner.manager
                .createQueryBuilder()
                .insert()
                .into('shift_workers')
                .values(shiftWorkers)
                .execute();

            await queryRunner.commitTransaction();
            return savedShift;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async findById(id: string): Promise<Shift | null> {
        return await this.shiftRepository.findOne({
            where: { shift_id: id },
            relations: ['opened_by', 'closed_by', 'approved_by_admin', 'shiftWorkers'],
        })
    }

    async findByCashierId(cashierId: string): Promise<Shift[]> {
        return await this.shiftRepository.find({
            where: {
                opened_by: { id: cashierId }
            },
            order: { created_at: 'DESC' },
        })
    }

    async updateType(data: UpdateShiftTypeDTO): Promise<Shift | null> {
        await this.shiftRepository.update(data.shift_id, {
            shift_type: data.shift_type,
        })

        return await this.findById(data.shift_id)
    }

    async requestClose(data: RequestCloseShiftDTO): Promise<Shift | null> {
        await this.shiftRepository.update(data.shift_id, {
            is_close_requested: true,
            closed_by: { id: data.cashier_id },
        })

        return await this.findById(data.shift_id)
    }

    async approveClose(data: ApproveCloseShiftDTO): Promise<Shift | null> {
        await this.shiftRepository.update(data.shift_id, {
            is_closed: true,
            approved_by_admin_id: { id: data.admin_id },
            end_time: new Date(),
        })

        return await this.findById(data.shift_id)
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.shiftRepository.delete(id)
        return (result.affected ?? 0) > 0
    }

    async getShiftSummary(shiftId: string): Promise<any> {
        const result = await this.shiftRepository.query(
            `SELECT * FROM shift_summary_view WHERE shift_id = $1`,
            [shiftId]
        )

        return result[0] ?? null
    }

    async getAllShiftSummaries(): Promise<any[]> {
        return await this.shiftRepository.query(
            `SELECT * FROM shift_summary_view ORDER BY start_time DESC`
        )
    }
}
