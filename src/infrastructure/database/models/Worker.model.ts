import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    CreateDateColumn,
    OneToMany,
    OneToOne
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { User } from "./user.model";
import { WorkerStatus } from "../../../domain/enums/Worker.enums"
import { ShiftWorker } from "./ShiftWorker.model";

@Entity('workers')
export class Worker {
    @PrimaryGeneratedColumn('uuid')
    worker_id: string = uuidv4().toString();

    @Column({ type: "text", nullable: false })
    full_name!: string;

    @OneToOne(() => User, (user) => user.workerProfile, { nullable: true })
    @JoinColumn({ name: 'user_id' })
    user?: User;

    @Column({ nullable: true })
    user_id?: string;

    @Column({ type: "text", nullable: true })
    phone?: string;

    @Column({ type: 'enum', enum: WorkerStatus })
    status!: WorkerStatus;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    base_hourly_rate!: number;

    @Column({ type: 'boolean', default: true })
    is_active!: boolean;

    @CreateDateColumn()
    joined_at!: Date;

    @OneToMany(() => ShiftWorker, (sw) => sw.worker)
    shiftAssignments!: ShiftWorker[];
}
