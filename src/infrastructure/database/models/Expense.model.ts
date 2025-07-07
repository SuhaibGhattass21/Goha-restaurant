import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    JoinColumn,
} from 'typeorm';
import { Shift } from './Shift.model';
import { User } from './user.model';
import { v4 as uuidv4 } from 'uuid';

@Entity('expenses')
export class Expense {
    @PrimaryGeneratedColumn('uuid')
    expense_id: string = uuidv4().toString();

    @Column({ type: "text" })
    title!: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    amount!: number;

    @ManyToOne(() => Shift)
    @JoinColumn({ name: 'shift_id' })
    shift!: Shift;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'created_by' })
    created_by!: User;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at!: Date;
}
