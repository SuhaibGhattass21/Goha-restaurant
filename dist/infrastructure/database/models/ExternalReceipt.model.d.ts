import { Shift } from "./Shift.model";
import { User } from "./user.model";
import { Order } from "./Order.model";
import { OrderPaymentMethod } from "../../../domain/enums/Order.enums";
export declare class ExternalReceipt {
    receipt_id: string;
    order: Order;
    shift: Shift;
    cashier: User;
    total_amount: number;
    payment_method: OrderPaymentMethod;
    image_url?: string;
    is_printed: boolean;
    notes?: string;
    created_at: Date;
}
