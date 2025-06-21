import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { OrderItem } from "./OrderItem.model";
import { CategoryExtra } from "./CategoryExtra.model";

@Entity("order_item_extras")
export class OrderItemExtra {
    @PrimaryGeneratedColumn("uuid")
    order_item_extra_id: string = uuidv4().toString();

    @ManyToOne(() => OrderItem, (item) => item.extras)
    @JoinColumn({ name: "order_item_id" })
    orderItem!: OrderItem;

    @ManyToOne(() => CategoryExtra)
    @JoinColumn({ name: "category_extra_id" })
    extra!: CategoryExtra;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    price!: number;
}
