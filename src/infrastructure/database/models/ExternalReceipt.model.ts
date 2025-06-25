import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    JoinColumn
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Shift } from "./Shift.model";
import { User } from "./user.model";
import { Order } from "./Order.model";
import { OrderPaymentMethod } from "@domain/enums/Order.enums";

@Entity("external_receipts")
export class ExternalReceipt {
    @PrimaryGeneratedColumn("uuid")
    receipt_id: string = uuidv4().toString();

    @ManyToOne(() => Order)
    @JoinColumn({ name: 'order_id' })
    order!: Order

    @ManyToOne(() => Shift)
    @JoinColumn({ name: "shift_id" })
    shift!: Shift;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'cashier_id' })
    cashier!: User

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    total_amount!: number

    @Column({ type: 'enum', default: OrderPaymentMethod.CASH, enum: OrderPaymentMethod })
    payment_method!: OrderPaymentMethod

    @Column({ type: "text" })
    image_url?: string;

    @Column({ type: 'boolean', default: false })
    is_printed!: boolean

    @Column({ type: "text", nullable: true })
    notes?: string;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date = new Date();
}
