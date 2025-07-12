import { OrderItem } from "./OrderItem.model";
import { CategoryExtra } from "./CategoryExtra.model";
export declare class OrderItemExtra {
    order_item_extra_id: string;
    orderItem: OrderItem;
    extra: CategoryExtra;
    price: number;
}
