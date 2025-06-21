import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { ShiftAdminPermission } from "./ShiftAdminPermission.model";

@Entity("permissions")
export class Permission {
    @PrimaryGeneratedColumn("uuid")
    permission_id: string = uuidv4().toString();

    @Column({ type: "text", unique: true })
    name!: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    @OneToMany(() => ShiftAdminPermission, (sap) => sap.permission)
    shiftAdminPermissions!: ShiftAdminPermission[];
}
