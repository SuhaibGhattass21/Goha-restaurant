import type { CreateCancelledOrderDto } from "../../../application/dtos/Orders/cancelled-order.dto";
import type { CancelledOrder } from "../../../infrastructure/database/models";
export interface ICancelledOrderRepository {
    create(cancelledOrderData: CreateCancelledOrderDto): Promise<CancelledOrder>;
    findById(id: string): Promise<CancelledOrder | null>;
    findByOrderId(orderId: string): Promise<CancelledOrder | null>;
    findByCancelledBy(userId: string, page?: number, limit?: number): Promise<{
        cancelledOrders: CancelledOrder[];
        total: number;
    }>;
    findByShiftId(shiftId: string, page?: number, limit?: number): Promise<{
        cancelledOrders: CancelledOrder[];
        total: number;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        cancelledOrders: CancelledOrder[];
        total: number;
    }>;
}
