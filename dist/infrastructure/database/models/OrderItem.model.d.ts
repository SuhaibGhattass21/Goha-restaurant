import { Order } from "./Order.model";
import { ProductSizePrice } from "./ProductSizePrice.model";
import { OrderItemExtra } from "./OrderItemExtra.model";
export declare class OrderItem {
    order_item_id: string;
    order: Order;
    product_size: ProductSizePrice;
    quantity: number;
    unit_price: number;
    special_instructions?: string;
    extras: OrderItemExtra[];
}
