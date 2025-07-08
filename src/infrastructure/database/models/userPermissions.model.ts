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
import { Permissions } from './permissions.model';


@Entity("user_permissions")
export class UserPermission {
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id: string = uuidv4().toString();

    @ManyToOne(() => User, (user) => user.userPermissions, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user!: User;

    @ManyToOne(() => Permissions, (permission) => permission.userPermissions, { onDelete: "CASCADE" })
    @JoinColumn({ name: "permission_id" })
    permission!: Permissions;

    @ManyToOne(() => User)
    @JoinColumn({ name: "granted_by" })
    granted_by!: User;

    @CreateDateColumn({ type: "timestamptz" })
    granted_at: Date = new Date(new Date().getTime());

    @Column({ type: "boolean", default: false })
    is_revoked: boolean = false;
}