import {
    IsEnum,
    IsUUID,
    ValidateNested,
    IsArray,
    IsOptional,
    IsString,
    IsNumber,
    IsBoolean,
    IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ShiftType } from '@domain/enums/Shift.enums';
import { WorkerStatus } from '../../domain/enums/Worker.enums';
/**
 * @swagger
 * components:
 *   schemas:
 *     OpenShiftDTO:
 *       type: object
 *       required:
 *         - shift_id
 *         - cashier_id
 *         - shift_type
 *         - workers
 *       properties:
 *         shift_id:
 *           type: string
 *           format: uuid
 *         cashier_id:
 *           type: string
 *           format: uuid
 *         shift_type:
 *           type: string
 *           enum: [morning, night]
 *         workers:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/AddShiftWorkerDTO'
 *
 *     AddShiftWorkerDTO:
 *       type: object
 *       required:
 *         - user_id
 *         - status
 *         - hourly_rate
 *       properties:
 *         user_id:
 *           type: string
 *           format: uuid
 *         status:
 *           type: string
 *           enum: [ADMIN, CASHIER, WAITER, CHEF, DELIVERY, KITCHEN, STEAWER, KITCHEN_ASSISTANT]
 *         hourly_rate:
 *           type: number
 *
 *     UpdateShiftTypeDTO:
 *       type: object
 *       required:
 *         - shift_id
 *         - admin_id
 *         - shift_type
 *       properties:
 *         shift_id:
 *           type: string
 *         admin_id:
 *           type: string
 *         shift_type:
 *           type: string
 *           enum: [morning, night]
 *
 *     RequestCloseShiftDTO:
 *       type: object
 *       required:
 *         - shift_id
 *         - cashier_id
 *       properties:
 *         shift_id:
 *           type: string
 *         cashier_id:
 *           type: string
 *
 *     ApproveCloseShiftDTO:
 *       type: object
 *       required:
 *         - shift_id
 *         - admin_id
 *       properties:
 *         shift_id:
 *           type: string
 *         admin_id:
 *           type: string
 */

export class OpenShiftDTO {
    @IsUUID()
    cashier_id!: string;

    @IsEnum(ShiftType)
    shift_type!: ShiftType;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AddShiftWorkerDTO)
    workers!: AddShiftWorkerDTO[];
}

export class UpdateShiftTypeDTO {
    @IsUUID()
    shift_id!: string;

    @IsEnum(ShiftType)
    shift_type!: ShiftType;

    @IsUUID()
    admin_id!: string;
}

export class AddShiftWorkerDTO {
    @IsUUID()
    shift_id!: string;

    @IsUUID()
    user_id!: string;

    @IsNumber()
    hourly_rate!: number;

    @IsEnum(WorkerStatus)
    status!: WorkerStatus;

    @IsOptional()
    @IsString()
    phone?: string;
}

export class RequestCloseShiftDTO {
    @IsUUID()
    shift_id!: string;

    @IsUUID()
    cashier_id!: string;
}

export class ApproveCloseShiftDTO {
    @IsUUID()
    shift_id!: string;

    @IsUUID()
    admin_id!: string;
}

export class ShiftResponseDto {
    @IsUUID()
    shift_id!: string;

    @IsEnum(ShiftType)
    shift_type!: ShiftType;

    @IsBoolean()
    is_closed!: boolean;

    @IsBoolean()
    is_close_requested!: boolean;

    @IsDate()
    created_at!: Date;

    @IsOptional()
    @IsDate()
    end_time?: Date;

    @IsUUID()
    opened_by_cashier_id!: string;

    @IsOptional()
    @IsUUID()
    closed_by_cashier_id?: string;

    @IsOptional()
    @IsUUID()
    approved_by_admin_id?: string;
}

