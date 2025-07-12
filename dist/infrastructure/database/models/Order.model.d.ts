import { User } from "./user.model";
import { Shift } from "./Shift.model";
import { OrderItem } from "./OrderItem.model";
import { OrderStatus, OrderType } from "../../../domain/enums/Order.enums";
export declare class Order {
    order_id: string;
    cashier: User;
    shift: Shift;
    table_number?: string;
    order_type: OrderType;
    status: OrderStatus;
    total_price: number;
    customer_name?: string;
    customer_phone?: string;
    created_at: Date;
    items: OrderItem[];
}
