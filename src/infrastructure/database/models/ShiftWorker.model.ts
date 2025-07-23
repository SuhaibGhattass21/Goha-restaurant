import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Shift } from "./Shift.model";
import { Worker } from "./Worker.model";

@Entity("shift_workers")
export class ShiftWorker {
    @PrimaryGeneratedColumn("uuid")
    shift_worker_id: string = uuidv4().toString();

    @ManyToOne(() => Shift, (shift) => shift.shiftWorkers)
    @JoinColumn({ name: "shift_id" })
    shift!: Shift;

    @Column()
    shift_id!: string;

    @ManyToOne(() => Worker)
    @JoinColumn({ name: 'worker_id' })
    worker!: Worker;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    hourly_rate!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // auto-set
    start_time!: Date;

    @Column({ type: "timestamptz", nullable: true })
    end_time?: Date;

    @Column({ type: "decimal", precision: 10, scale: 2, default: 0, nullable: false })
    calculated_salary: number = 0;
}
