import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    Column,
    JoinColumn
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Shift } from "./Shift.model";
import { User } from "./user.model";
import { Permission } from "./Permission.model";

@Entity("shift_admin_permissions")
export class ShiftAdminPermission {
    @PrimaryGeneratedColumn("uuid")
    shift_admin_permission_id: string = uuidv4().toString();

    @ManyToOne(() => Shift, (shift) => shift.shiftAdminPermissions)
    @JoinColumn({ name: "shift_id" })
    shift!: Shift;

    @ManyToOne(() => User)
    @JoinColumn({ name: "admin_id" })
    admin!: User;

    @ManyToOne(() => Permission, (permission) => permission.shiftAdminPermissions)
    @JoinColumn({ name: "permission_id" })
    permission!: Permission;

    @ManyToOne(() => User)
    @JoinColumn({ name: "granted_by" })
    granted_by!: User;

    @CreateDateColumn({ type: "timestamptz" })
    granted_at: Date = new Date(new Date().getTime());

    @Column({ type: "boolean", default: false })
    is_revoked: boolean = false;
}
