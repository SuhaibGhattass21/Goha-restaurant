import type { ICancelledOrderRepository } from "../../../domain/repositories/Orders/cancelled-order.repository.interface";
import type { CreateCancelledOrderDto, CancelledOrderResponseDto, CancelledOrderListResponseDto } from "../../../application/dtos/Orders/cancelled-order.dto";
export declare class CancelledOrderUseCases {
    private cancelledOrderRepository;
    constructor(cancelledOrderRepository: ICancelledOrderRepository);
    createCancelledOrder(cancelledOrderData: CreateCancelledOrderDto): Promise<CancelledOrderResponseDto>;
    getCancelledOrderById(id: string): Promise<CancelledOrderResponseDto | null>;
    getCancelledOrderByOrderId(orderId: string): Promise<CancelledOrderResponseDto | null>;
    getCancelledOrdersByCancelledBy(userId: string, page?: number, limit?: number): Promise<CancelledOrderListResponseDto>;
    getCancelledOrdersByShiftId(shiftId: string, page?: number, limit?: number): Promise<CancelledOrderListResponseDto>;
    getAllCancelledOrders(page?: number, limit?: number): Promise<CancelledOrderListResponseDto>;
    private mapToResponseDto;
}
