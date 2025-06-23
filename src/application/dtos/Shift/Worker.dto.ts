import {
    IsString,
    IsUUID,
    IsEnum,
    IsPhoneNumber,
    IsOptional,
    IsBoolean,
    IsNumber,
    Min,
} from 'class-validator';
import { WorkerStatus } from '../../../domain/enums/Worker.enums';
/**
 * @swagger
 * components:
 *   schemas:
 *     CreateWorkerDto:
 *       type: object
 *       required:
 *         - full_name
 *         - status
 *         - base_hourly_rate
 *       properties:
 *         full_name:
 *           type: string
 *           example: "Ahmed Hassan"
 *         status:
 *           type: string
 *           enum: [CASHIER, ADMIN, WAITER, CHEF, KITCHEN, DELIVERY, STEAWER, KITCHEN_ASSISTANT]
 *           example: "CHEF"
 *         base_hourly_rate:
 *           type: number
 *           format: float
 *           example: 25.5
 *         phone:
 *           type: string
 *           example: "+201000112233"
 *         user_id:
 *           type: string
 *           format: uuid
 *           example: "3b241101-e2bb-4255-8caf-4136c566a962"
 *     UpdateWorkerDto:
 *       type: object
 *       properties:
 *         full_name:
 *           type: string
 *           example: "Ahmed Mahmoud"
 *         status:
 *           type: string
 *           enum: [CASHIER, ADMIN, WAITER, CHEF, KITCHEN, DELIVERY, STEAWER, KITCHEN_ASSISTANT]
 *           example: "WAITER"
 *         base_hourly_rate:
 *           type: number
 *           format: float
 *           example: 18.75
 *         phone:
 *           type: string
 *           example: "+201110000555"
 *         is_active:
 *           type: boolean
 *           example: true
 *         user_id:
 *           type: string
 *           format: uuid
 *           example: "4d8af002-d29b-4be9-b9f1-0eaa6353a4a4"
 *     WorkerResponseDto:
 *       type: object
 *       properties:
 *         worker_id:
 *           type: string
 *           format: uuid
 *           example: "ae2fd1c3-67a9-470b-9f06-fdd1a7a1a717"
 *         full_name:
 *           type: string
 *           example: "Sara Ibrahim"
 *         status:
 *           type: string
 *           enum: [CASHIER, ADMIN, WAITER, CHEF, KITCHEN, DELIVERY, STEAWER, KITCHEN_ASSISTANT]
 *           example: "ADMIN"
 *         base_hourly_rate:
 *           type: number
 *           format: float
 *           example: 22.00
 *         phone:
 *           type: string
 *           example: "+201555555555"
 *         is_active:
 *           type: boolean
 *           example: true
 *         joined_at:
 *           type: string
 *           format: date-time
 *           example: "2024-06-01T12:00:00Z"
 *         user_id:
 *           type: string
 *           format: uuid
 *           example: "d26ff304-4be1-4e9f-a444-3bb2e48e6c87"
 */

export class CreateWorkerDto {
    @IsString()
    full_name!: string;

    @IsEnum(WorkerStatus)
    status!: WorkerStatus;

    @IsNumber()
    @Min(0)
    base_hourly_rate!: number;

    @IsOptional()
    @IsPhoneNumber()
    phone?: string;

    @IsOptional()
    @IsUUID()
    user_id?: string;
}

export class UpdateWorkerDto {
    @IsOptional()
    @IsString()
    full_name?: string;

    @IsOptional()
    @IsEnum(WorkerStatus)
    status?: WorkerStatus;

    @IsOptional()
    @IsNumber()
    base_hourly_rate?: number;

    @IsOptional()
    @IsPhoneNumber()
    phone?: string;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

    @IsOptional()
    @IsUUID()
    user_id?: string;
}

export class WorkerResponseDto {
    @IsUUID()
    worker_id!: string;

    @IsString()
    full_name!: string;

    @IsEnum(WorkerStatus)
    status!: WorkerStatus;

    @IsNumber()
    base_hourly_rate!: number;

    @IsOptional()
    @IsPhoneNumber()
    phone?: string;

    @IsBoolean()
    is_active!: boolean;

    @IsOptional()
    joined_at!: Date;

    @IsOptional()
    @IsUUID()
    user_id?: string;
}
