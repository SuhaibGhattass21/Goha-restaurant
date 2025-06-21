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

@Entity("shift_workers")
export class ShiftWorker {
    @PrimaryGeneratedColumn("uuid")
    shift_worker_id: string = uuidv4().toString();

    @ManyToOne(() => Shift, (shift) => shift.shiftWorkers)
    @JoinColumn({ name: "shift_id" })
    shift!: Shift;

    @ManyToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user!: User;

    @Column({ type: "text", nullable: true })
    phone?: string;

    @Column({ type: "enum", enum: WorkerStatus })
    status!: WorkerStatus;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    hourly_rate!: number;

    @Column({ type: "timestamptz" })
    start_time: Date = new Date(new Date().getTime());;

    @Column({ type: "timestamptz" })
    end_time: Date = new Date(new Date().getTime());

    @Column({ type: "decimal", precision: 10, scale: 2 })
    calculated_salary!: number;

    @Column({ type: "date" })
    joining_date?: Date = new Date();
}
