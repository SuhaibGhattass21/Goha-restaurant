import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
    OneToOne,
    OneToMany
} from 'typeorm';
import { v4 as uuidv4 } from "uuid";
import { Permissions } from './permissions.model';
import { Worker } from './Worker.model';
import { UserPermission } from './userPermissions.model';

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id: string = uuidv4().toString();

    @Column({ type: "text", unique: true })
    username!: string;

    @Column({ type: "text", unique: false, name: 'full_name' })
    fullName!: string;

    @Column({ type: "numeric", nullable: false, name: 'hour_rate' })
    hourRate!: number;

    @Column({ type: "text", name: 'password' })
    password!: string;

    @Column({ type: "varchar", unique: true, nullable: true })
    phone?: string;

    @CreateDateColumn({ type: "timestamptz", name: "created_at" })
    createdAt: Date = new Date(new Date().getTime());

    @Column({ type: "boolean", default: true, name: "is_active" })
    isActive: boolean = true;

    @OneToMany(() => UserPermission, (userPermission) => userPermission.user)
    userPermissions?: UserPermission[];

    @OneToOne(() => Worker, (worker: Worker) => worker.user)
    workerProfile?: Worker;
}
