import { Shift } from "./Shift.model";
import { Worker } from "./Worker.model";
export declare class ShiftWorker {
    shift_worker_id: string;
    shift: Shift;
    worker: Worker;
    hourly_rate: number;
    start_time: Date;
    end_time?: Date;
    calculated_salary: number;
}
