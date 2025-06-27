import type { ICancelledOrderRepository } from "../../../domain/repositories/Orders/cancelled-order.repository.interface"
import type { CancelledOrder } from "../../../infrastructure/database/models/CancelledOrder.model"
import type {
  CreateCancelledOrderDto,
  CancelledOrderResponseDto,
  CancelledOrderListResponseDto,
} from "../../../application/dtos/Orders/cancelled-order.dto"
import type { OrderResponseDto, CashierInfoDto, ShiftInfoDto } from "../../../application/dtos/Orders/order.dto"

export class CancelledOrderUseCases {
  constructor(private cancelledOrderRepository: ICancelledOrderRepository) { }

  async createCancelledOrder(cancelledOrderData: CreateCancelledOrderDto): Promise<CancelledOrderResponseDto> {
    const cancelledOrder = await this.cancelledOrderRepository.create(cancelledOrderData)
    const savedCancelledOrder = await this.cancelledOrderRepository.findById(cancelledOrder.cancelled_order_id)
    if (!savedCancelledOrder) {
      throw new Error("Failed to retrieve created cancelled order.")
    }
    return this.mapToResponseDto(savedCancelledOrder)
  }

  async getCancelledOrderById(id: string): Promise<CancelledOrderResponseDto | null> {
    const cancelledOrder = await this.cancelledOrderRepository.findById(id)
    return cancelledOrder ? this.mapToResponseDto(cancelledOrder) : null
  }

  async getCancelledOrderByOrderId(orderId: string): Promise<CancelledOrderResponseDto | null> {
    const cancelledOrder = await this.cancelledOrderRepository.findByOrderId(orderId)
    return cancelledOrder ? this.mapToResponseDto(cancelledOrder) : null
  }

  async getCancelledOrdersByCancelledBy(userId: string, page = 1, limit = 10): Promise<CancelledOrderListResponseDto> {
    const { cancelledOrders, total } = await this.cancelledOrderRepository.findByCancelledBy(userId, page, limit)
    return {
      cancelled_orders: cancelledOrders.map((order) => this.mapToResponseDto(order)),
      total,
      page,
      limit,
    }
  }

  async getCancelledOrdersByShiftId(shiftId: string, page = 1, limit = 10): Promise<CancelledOrderListResponseDto> {
    const { cancelledOrders, total } = await this.cancelledOrderRepository.findByShiftId(shiftId, page, limit)
    return {
      cancelled_orders: cancelledOrders.map((order) => this.mapToResponseDto(order)),
      total,
      page,
      limit,
    }
  }

  async getAllCancelledOrders(page = 1, limit = 10): Promise<CancelledOrderListResponseDto> {
    const { cancelledOrders, total } = await this.cancelledOrderRepository.findAll(page, limit)
    return {
      cancelled_orders: cancelledOrders.map((order) => this.mapToResponseDto(order)),
      total,
      page,
      limit,
    }
  }

  private mapToResponseDto(cancelledOrder: CancelledOrder): CancelledOrderResponseDto {
    const orderDto: OrderResponseDto = {
      order_id: cancelledOrder.order.order_id,
      cashier: cancelledOrder.order.cashier
        ? {
          id: cancelledOrder.order.cashier.id,
          username: cancelledOrder.order.cashier.username,
          fullName: cancelledOrder.order.cashier.fullName,
        }
        : undefined,
      shift: cancelledOrder.order.shift
        ? {
          shift_id: cancelledOrder.order.shift.shift_id,
          shift_type: cancelledOrder.order.shift.shift_type,
          start_time: cancelledOrder.order.shift.start_time?.toISOString() || "", // Add defensive check
          status: cancelledOrder.order.shift.status,
        }
        : undefined,
      table_number: cancelledOrder.order.table_number,
      order_type: cancelledOrder.order.order_type,
      status: cancelledOrder.order.status,
      total_price: Number(cancelledOrder.order.total_price),
      customer_name: cancelledOrder.order.customer_name,
      customer_phone: cancelledOrder.order.customer_phone,
      created_at: cancelledOrder.order.created_at?.toISOString() || "", // Add defensive check
      items: [], // Assuming items are not needed for a cancelled order response, or can be fetched separately
      items_count: 0,
    }

    const cancelledByDto: CashierInfoDto = {
      id: cancelledOrder.cancelled_by.id,
      username: cancelledOrder.cancelled_by.username,
      fullName: cancelledOrder.cancelled_by.fullName,
    }

    const shiftDto: ShiftInfoDto = {
      shift_id: cancelledOrder.shift.shift_id,
      shift_type: cancelledOrder.shift.shift_type,
      start_time: cancelledOrder.shift.start_time?.toISOString() || "",
      status: cancelledOrder.shift.status,
    }

    return {
      cancelled_order_id: cancelledOrder.cancelled_order_id,
      order: orderDto,
      cancelled_by: cancelledByDto,
      shift: shiftDto,
      reason: cancelledOrder.reason,
      cancelled_at: cancelledOrder.cancelled_at.toISOString(),
    }
  }
}
