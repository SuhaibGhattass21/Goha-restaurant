import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { User } from "./user.model";
import { ShiftWorker } from "./ShiftWorker.model";
import { ShiftType, ShiftStatus } from "../../../domain/enums/Shift.enums"

@Entity("shifts")
export class Shift {
    @PrimaryGeneratedColumn("uuid")
    shift_id: string = uuidv4().toString();

    @Column({ type: "enum", enum: ShiftType })
    shift_type!: ShiftType;

    @CreateDateColumn({ type: "timestamptz", nullable: false })
    start_time: Date = new Date();

    @Column({ type: "timestamptz", nullable: false })
    end_time: Date = new Date();

    @Column({ type: "enum", default: ShiftStatus.OPENED, enum: ShiftStatus })
    status!: ShiftStatus;

    @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
    initial_balance!: number;

    @ManyToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn({ name: "opened_by" })
    opened_by!: User;

    @ManyToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn({ name: "closed_by" })
    closed_by?: User;

    @Column({ type: 'boolean', default: false })
    is_started_by_cashier!: boolean;

    @Column({ type: 'boolean', default: false })
    is_close_requested!: boolean;

    @Column({ type: 'boolean', default: false })
    is_closed!: boolean;

    @ManyToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn({ name: "approved_by_admin_id" })
    approved_by_admin_id?: User;

    @OneToMany(() => ShiftWorker, (sw) => sw.shift)
    shiftWorkers!: ShiftWorker[];

    @Column({ type: "date" })
    created_at: Date = new Date();
}
