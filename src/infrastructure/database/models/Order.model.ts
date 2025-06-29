import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    OneToMany,
    JoinColumn
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { User } from "./user.model";
import { Shift } from "./Shift.model";
import { OrderItem } from "./OrderItem.model";
import { OrderStatus, OrderType } from "../../../domain/enums/Order.enums"

@Entity("orders")
export class Order {
    @PrimaryGeneratedColumn("uuid")
    order_id: string = uuidv4().toString();

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    cashier!: User;

    @ManyToOne(() => Shift)
    @JoinColumn({ name: "shift_id" })
    shift!: Shift;

    @Column({ type: "text", nullable: true })
    table_number?: string;

    @Column({ type: "enum", enum: OrderType })
    order_type!: OrderType;

    @Column({ type: "enum", default: OrderStatus.ACTIVE, enum: OrderStatus })
    status!: OrderStatus;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    total_price!: number;

    @Column({ type: "text", nullable: true })
    customer_name?: string;

    @Column({ type: "text", nullable: true })
    customer_phone?: string;

    @CreateDateColumn({ type: "timestamptz" })
    created_at!: Date;

    @OneToMany(() => OrderItem, (item) => item.order, { cascade: true, orphanedRowAction: 'delete' })
    items!: OrderItem[];
}
