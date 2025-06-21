import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { v4 as uuidv4 } from "uuid";
import { Permissions } from './userPersmissions.model';

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

    @ManyToMany(() => Permissions, (permissions) => permissions.users)
    @JoinTable({
        name: "user_permissions",
        joinColumn: { name: "user_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "permission_id", referencedColumnName: "id" },
    })
    userPermissions?: Permissions[];
}
