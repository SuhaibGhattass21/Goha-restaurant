import { CreateOrderDto, UpdateOrderDto, OrderStatsDto } from "../../../application/dtos/Orders/order.dto"
import { Order } from "../../../infrastructure/database/models"
import { OrderStatus, OrderType } from "../../enums/Order.enums"
import { ShiftType } from "../../enums/Shift.enums"

export interface IOrderRepository {
  create(orderData: Omit<CreateOrderDto, "items">): Promise<Order>
  findById(id: string): Promise<Order | null>
  findByShiftIdGoha(shiftId: string): Promise<Order[]>
  findByShiftIdCafe(shiftId: string): Promise<Order[]>

  findByCashierId(cashierId: string, page?: number, limit?: number): Promise<{ orders: Order[]; total: number }>
  findByStatus(status: OrderStatus, page?: number, limit?: number): Promise<{ orders: Order[]; total: number }>
  findByOrderType(orderType: OrderType, page?: number, limit?: number): Promise<{ orders: Order[]; total: number }>
  findByDateRange(
    startDate: Date,
    endDate: Date,
    page?: number,
    limit?: number,
  ): Promise<{ orders: Order[]; total: number }>
  // findAll(page?: number, limit?: number): Promise<{ orders: Order[]; total: number }>
  findAllExceptCafe(page?: number, limit?: number): Promise<{ orders: Order[]; total: number }>
  findAllCafe(page?: number, limit?: number): Promise<{ orders: (Order & { extrasSummary: any[] })[]; total: number }>
  update(id: string, orderData: UpdateOrderDto): Promise<Order | null>
  updateStatus(id: string, status: OrderStatus): Promise<Order | null>
  delete(id: string): Promise<boolean>
  getOrderStats(shiftId?: string, startDate?: Date, endDate?: Date): Promise<OrderStatsDto>
  getOrderStatsCafe(shiftId?: string, startDate?: Date, endDate?: Date): Promise<OrderStatsDto>

  getOrdersByShiftTypeAndDate(shiftType: ShiftType, date: string): Promise<Order[]>;
  calculateOrderTotal(orderId: string): Promise<number>
}