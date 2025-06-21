import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
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

    @ManyToMany(() => User, (user: User) => user.userPermissions)
    @JoinTable({
        name: "user_permissions",
        joinColumn: { name: "permission_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "user_id", referencedColumnName: "id" },
    })
    users?: User[];
}