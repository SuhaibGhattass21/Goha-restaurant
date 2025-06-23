import {
    IsUUID,
    IsNumber,
    IsOptional,
    IsDate,
    IsEnum,
    Min,
} from 'class-validator';
import { WorkerStatus } from '../../../domain/enums/Worker.enums';
/**
 * @swagger
 * components:
 *   schemas:
 *     AddShiftWorkerDto:
 *       type: object
 *       required:
 *         - worker_id
 *         - status
 *         - hourly_rate
 *         - start_time
 *       properties:
 *         worker_id:
 *           type: string
 *           format: uuid
 *           example: "c0a8012b-7e6b-4f9f-9a48-08db8dbd0d6d"
 *         status:
 *           type: string
 *           enum: [ADMIN, CASHIER, WAITER, CHEF, DELIVERY, KITCHEN, STEAWER, KITCHEN_ASSISTANT]
 *           example: "WAITER"
 *         hourly_rate:
 *           type: number
 *           format: float
 *           example: 25.00
 *         start_time:
 *           type: string
 *           format: date-time
 *           example: "2025-06-09T08:00:00Z"
 *         end_time:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2025-06-09T16:00:00Z"

 *     ShiftWorkerResponseDto:
 *       type: object
 *       properties:
 *         shift_worker_id:
 *           type: string
 *           format: uuid
 *         shift_id:
 *           type: string
 *           format: uuid
 *         worker_id:
 *           type: string
 *           format: uuid
 *         status:
 *           type: string
 *           enum: [ADMIN, CASHIER, WAITER, CHEF, DELIVERY, KITCHEN, STEAWER, KITCHEN_ASSISTANT]
 *         hourly_rate:
 *           type: number
 *           format: float
 *         start_time:
 *           type: string
 *           format: date-time
 *         end_time:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         calculated_salary:
 *           type: number
 *           format: float
 *           example: 200.00
 */

export class AddShiftWorkerDto {
    @IsUUID()
    worker_id!: string;

    @IsEnum(WorkerStatus)
    status!: WorkerStatus;

    @IsNumber()
    @Min(0)
    hourly_rate!: number;

    @IsDate()
    start_time!: Date;

    @IsOptional()
    @IsDate()
    end_time?: Date;
}

export class ShiftWorkerResponseDto {
    @IsUUID()
    shift_worker_id!: string;

    @IsUUID()
    shift_id!: string;

    @IsUUID()
    worker_id!: string;

    @IsEnum(WorkerStatus)
    status!: WorkerStatus;

    @IsNumber()
    hourly_rate!: number;

    @IsDate()
    start_time!: Date;

    @IsOptional()
    @IsDate()
    end_time?: Date;

    @IsNumber()
    calculated_salary!: number;
}

