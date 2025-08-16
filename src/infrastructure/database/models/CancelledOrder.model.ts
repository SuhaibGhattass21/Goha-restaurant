import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Order } from './Order.model';
import { User } from './user.model';
import { Shift } from './Shift.model';

export enum CancellationStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected'
}

@Entity('cancelled_orders')
export class CancelledOrder {
    @PrimaryGeneratedColumn('uuid')
    cancelled_order_id: string = uuidv4().toString();

    @ManyToOne(() => Order)
    @JoinColumn({ name: 'order_id' })
    order!: Order;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'cancelled_by' })
    cancelled_by!: User;

    @ManyToOne(() => Shift)
    @JoinColumn({ name: 'shift_id' })
    shift!: Shift;

    @Column({ type: 'text', nullable: true })
    reason?: string;

    @Column({
        type: 'enum',
        enum: CancellationStatus,
        default: CancellationStatus.PENDING
    })
    status: CancellationStatus = CancellationStatus.PENDING;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'approved_by' })
    approved_by?: User;

    @CreateDateColumn({ type: 'timestamptz' })
    cancelled_at: Date = new Date();

    @UpdateDateColumn({ type: 'timestamptz', nullable: true })
    approved_at?: Date;
}
