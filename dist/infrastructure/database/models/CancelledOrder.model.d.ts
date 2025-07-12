import { Order } from './Order.model';
import { User } from './user.model';
import { Shift } from './Shift.model';
export declare class CancelledOrder {
    cancelled_order_id: string;
    order: Order;
    cancelled_by: User;
    shift: Shift;
    reason?: string;
    cancelled_at: Date;
}
