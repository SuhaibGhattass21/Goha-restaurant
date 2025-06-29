import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Order } from "./Order.model";
import { ProductSizePrice } from "./ProductSizePrice.model";
import { OrderItemExtra } from "./OrderItemExtra.model";

@Entity("order_items")
export class OrderItem {
    @PrimaryGeneratedColumn("uuid")
    order_item_id: string = uuidv4().toString();

    @ManyToOne(() => Order, (order) => order.items, { onDelete: "CASCADE" })
    @JoinColumn({ name: "order_id" })
    order!: Order;

    @ManyToOne(() => ProductSizePrice)
    @JoinColumn({ name: "product_size_id" })
    product_size!: ProductSizePrice;

    @Column({ type: "int" })
    quantity!: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    unit_price!: number;

    @Column({ type: "text" })
    special_instructions?: string;

    @OneToMany(() => OrderItemExtra, (extra) => extra.orderItem)
    extras!: OrderItemExtra[];
}
