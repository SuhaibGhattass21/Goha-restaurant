import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { User } from "./user.model";
import { Shift } from "./Shift.model";
import { WorkerStatus } from "../../../domain/enums/Worker.enums"
import { Worker } from "./Worker.model";

@Entity("shift_workers")
export class ShiftWorker {
    @PrimaryGeneratedColumn("uuid")
    shift_worker_id: string = uuidv4().toString();

    @ManyToOne(() => Shift, (shift) => shift.shiftWorkers)
    @JoinColumn({ name: "shift_id" })
    shift!: Shift;

    @ManyToOne(() => Worker)
    @JoinColumn({ name: 'worker_id' })
    worker!: Worker;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    hourly_rate!: number;

    @Column({ type: "timestamptz" })
    start_time: Date = new Date();;

    @Column({ type: "timestamptz" })
    end_time?: Date;

    @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
    calculated_salary: number = 0;
}
