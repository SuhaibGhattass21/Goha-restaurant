import type { CreateOrderDto, UpdateOrderDto, OrderStatsDto } from "../../../application/dtos/Orders/order.dto"
import type { Order } from "../../../infrastructure/database/models"
import type { OrderStatus, OrderType } from "../../enums/Order.enums"

export interface IOrderRepository {
  create(orderData: Omit<CreateOrderDto, "items">): Promise<Order>
  findById(id: string): Promise<Order | null>
  findByShiftId(shiftId: string): Promise<Order[]>
  findByCashierId(cashierId: string, page?: number, limit?: number): Promise<{ orders: Order[]; total: number }>
  findByStatus(status: OrderStatus, page?: number, limit?: number): Promise<{ orders: Order[]; total: number }>
  findByOrderType(orderType: OrderType, page?: number, limit?: number): Promise<{ orders: Order[]; total: number }>
  findByDateRange(
    startDate: Date,
    endDate: Date,
    page?: number,
    limit?: number,
  ): Promise<{ orders: Order[]; total: number }>
  findAll(page?: number, limit?: number): Promise<{ orders: Order[]; total: number }>
  update(id: string, orderData: UpdateOrderDto): Promise<Order | null>
  updateStatus(id: string, status: OrderStatus): Promise<Order | null>
  delete(id: string): Promise<boolean>
  getOrderStats(shiftId?: string, startDate?: Date, endDate?: Date): Promise<OrderStatsDto>
  calculateOrderTotal(orderId: string): Promise<number>
}
