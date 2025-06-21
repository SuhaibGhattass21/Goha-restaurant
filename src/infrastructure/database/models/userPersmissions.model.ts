import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { v4 as uuidv4 } from "uuid";
import { User } from './user.model';


@Entity("permissions")
export class Permissions {
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id: string = uuidv4().toString();

    @Column({ type: "text", unique: true })
    name!: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "granted_by" })
    granted_by!: User;

    @CreateDateColumn({ type: "timestamptz" })
    granted_at: Date = new Date(new Date().getTime());

    @Column({ type: "boolean", default: false })
    is_revoked: boolean = false;

    @ManyToMany(() => User, (user: User) => user.userPermissions)
    @JoinTable({
        name: "user_permissions",
        joinColumn: { name: "permission_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "user_id", referencedColumnName: "id" },
    })
    users?: User[];
}