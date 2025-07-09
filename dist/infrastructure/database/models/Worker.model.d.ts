import { User } from "./user.model";
import { WorkerStatus } from "../../../domain/enums/Worker.enums";
import { ShiftWorker } from "./ShiftWorker.model";
export declare class Worker {
    worker_id: string;
    full_name: string;
    user?: User;
    user_id?: string;
    phone?: string;
    status: WorkerStatus;
    base_hourly_rate: number;
    is_active: boolean;
    joined_at: Date;
    shiftAssignments: ShiftWorker[];
}
