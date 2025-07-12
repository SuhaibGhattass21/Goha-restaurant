import { User } from "./user.model";
import { ShiftWorker } from "./ShiftWorker.model";
import { ShiftType, ShiftStatus } from "../../../domain/enums/Shift.enums";
export declare class Shift {
    shift_id: string;
    shift_type: ShiftType;
    start_time: Date;
    end_time: Date;
    status: ShiftStatus;
    initial_balance: number;
    opened_by: User;
    closed_by?: User;
    is_started_by_cashier: boolean;
    is_close_requested: boolean;
    is_closed: boolean;
    approved_by_admin_id?: User;
    shiftWorkers: ShiftWorker[];
    created_at: Date;
}
