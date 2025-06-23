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
import { ShiftType } from '../../../domain/enums/Shift.enums';
import { ShiftStatus } from '../../../domain/enums/Shift.enums';
import { AddShiftWorkerDto } from './ShiftWorker.dto';


/**
 * @swagger
 * components:
 *   schemas:
 *     OpenShiftDTO:
 *       type: object
 *       required:
 *         - opened_by
 *         - shift_type
 *         - workers
 *       properties:
 *         opened_by:
 *           type: string
 *           format: uuid
 *           description: User ID of the cashier opening the shift
 *         shift_type:
 *           type: string
 *           enum: [morning, night]
 *           description: Type of shift
 *         workers:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/AddShiftWorkerDTO'

 *     UpdateShiftTypeDTO:
 *       type: object
 *       required:
 *         - shift_id
 *         - admin_id
 *         - shift_type
 *       properties:
 *         shift_id:
 *           type: string
 *           format: uuid
 *         admin_id:
 *           type: string
 *           format: uuid
 *         shift_type:
 *           type: string
 *           enum: [morning, night]

 *     RequestCloseShiftDTO:
 *       type: object
 *       required:
 *         - shift_id
 *         - closed_by
 *       properties:
 *         shift_id:
 *           type: string
 *           format: uuid
 *         closed_by:
 *           type: string
 *           format: uuid

 *     ApproveCloseShiftDTO:
 *       type: object
 *       required:
 *         - shift_id
 *         - approved_by_admin_id
 *       properties:
 *         shift_id:
 *           type: string
 *           format: uuid
 *         approved_by_admin_id:
 *           type: string
 *           format: uuid

 *     ShiftResponseDto:
 *       type: object
 *       properties:
 *         shift_id:
 *           type: string
 *           format: uuid
 *         shift_type:
 *           type: string
 *           enum: [morning, night]
 *         status:
 *           type: string
 *           enum: [OPENED, CLOSED, IN_PROGRESS, COMPLETED]
 *         is_closed:
 *           type: boolean
 *         is_started_by_cashier:
 *           type: boolean
 *         is_close_requested:
 *           type: boolean
 *         start_time:
 *           type: string
 *           format: date-time
 *         end_time:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         opened_by:
 *           type: string
 *           format: uuid
 *         closed_by:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         approved_by_admin_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         created_at:
 *           type: string
 *           format: date
 */

export class OpenShiftDTO {
    @IsUUID()
    opened_by!: string;

    @IsEnum(ShiftType)
    shift_type!: ShiftType;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AddShiftWorkerDto)
    workers!: AddShiftWorkerDto[];
}

export class UpdateShiftTypeDTO {
    @IsUUID()
    shift_id!: string;

    @IsEnum(ShiftType)
    shift_type!: ShiftType;

    @IsUUID()
    admin_id!: string;
}

export class RequestCloseShiftDTO {
    @IsUUID()
    shift_id!: string;

    @IsUUID()
    closed_by!: string;
}

export class ApproveCloseShiftDTO {
    @IsUUID()
    shift_id!: string;

    @IsUUID()
    approved_by_admin_id!: string;
}

export class ShiftResponseDto {
    @IsUUID()
    shift_id!: string;

    @IsEnum(ShiftType)
    shift_type!: ShiftType;

    @IsEnum(ShiftStatus)
    status!: ShiftStatus;

    @IsBoolean()
    is_closed!: boolean;

    @IsBoolean()
    is_started_by_cashier!: boolean;

    @IsBoolean()
    is_close_requested!: boolean;

    @IsDate()
    start_time!: Date;

    @IsOptional()
    @IsDate()
    end_time?: Date;

    @IsUUID()
    opened_by!: string;

    @IsOptional()
    @IsUUID()
    closed_by?: string;

    @IsOptional()
    @IsUUID()
    approved_by_admin_id?: string;

    @IsDate()
    created_at!: Date;
}

