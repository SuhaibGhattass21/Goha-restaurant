import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm';
import { v4 as uuidv4 } from "uuid";
import { User } from './user.model';
import { UserPermission } from './userPermissions.model';


@Entity("permissions")
export class Permissions {
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id: string = uuidv4().toString();

    @Column({ type: "text", unique: true })
    name!: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date = new Date(new Date().getTime());

    @OneToMany(() => UserPermission, (userPermission: UserPermission) => userPermission.permission)
    userPermissions?: UserPermission[];
}