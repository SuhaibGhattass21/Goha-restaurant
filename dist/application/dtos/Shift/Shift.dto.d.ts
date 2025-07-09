import { ShiftType } from '../../../domain/enums/Shift.enums';
import { ShiftStatus } from '../../../domain/enums/Shift.enums';
import { AddShiftWorkerDto } from './ShiftWorker.dto';
export declare class OpenShiftDTO {
    opened_by: string;
    shift_type: ShiftType;
    intial_balance: number;
    workers?: AddShiftWorkerDto[];
}
export declare class UpdateShiftTypeDTO {
    shift_id: string;
    shift_type: ShiftType;
    admin_id: string;
}
export declare class RequestCloseShiftDTO {
    shift_id: string;
    closed_by: string;
}
export declare class ApproveCloseShiftDTO {
    shift_id: string;
    approved_by_admin_id: string;
}
export declare class FilterShiftByStatusDto {
    status: ShiftStatus;
}
export declare class ShiftResponseDto {
    shift_id: string;
    shift_type: ShiftType;
    status: ShiftStatus;
    intial_balance: number;
    is_closed: boolean;
    is_started_by_cashier: boolean;
    is_close_requested: boolean;
    start_time: Date;
    end_time?: Date;
    opened_by: string;
    closed_by?: string;
    approved_by_admin_id?: string;
    created_at: Date;
}
