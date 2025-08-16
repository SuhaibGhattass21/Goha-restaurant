import type { CreateCancelledOrderDto, ApproveCancellationDto } from "../../../application/dtos/Orders/cancelled-order.dto"
import type { CancelledOrder } from "../../../infrastructure/database/models"
import type { CancellationStatus } from "../../../infrastructure/database/models/CancelledOrder.model"

export interface ICancelledOrderRepository {
  create(cancelledOrderData: CreateCancelledOrderDto): Promise<CancelledOrder>
  findById(id: string): Promise<CancelledOrder | null>
  findByOrderId(orderId: string): Promise<CancelledOrder | null>
  findByCancelledBy(
    userId: string,
    page?: number,
    limit?: number,
  ): Promise<{ cancelledOrders: CancelledOrder[]; total: number }>
  findByShiftId(
    shiftId: string,
    page?: number,
    limit?: number,
  ): Promise<{ cancelledOrders: CancelledOrder[]; total: number }>
  findAll(page?: number, limit?: number): Promise<{ cancelledOrders: CancelledOrder[]; total: number }>
  findByStatus(
    status: CancellationStatus,
    page?: number,
    limit?: number,
  ): Promise<{ cancelledOrders: CancelledOrder[]; total: number }>
  updateStatus(id: string, status: CancellationStatus, approvedBy?: string): Promise<CancelledOrder | null>
}
