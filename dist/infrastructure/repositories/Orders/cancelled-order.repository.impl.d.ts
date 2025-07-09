import type { Repository } from "typeorm";
import type { CancelledOrder } from "../../database/models/CancelledOrder.model";
import type { CreateCancelledOrderDto } from "../../../application/dtos/Orders/cancelled-order.dto";
import type { ICancelledOrderRepository } from "../../../domain/repositories/Orders/cancelled-order.repository.interface";
export declare class CancelledOrderRepositoryImpl implements ICancelledOrderRepository {
    private cancelledOrderRepository;
    constructor(cancelledOrderRepository: Repository<CancelledOrder>);
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
