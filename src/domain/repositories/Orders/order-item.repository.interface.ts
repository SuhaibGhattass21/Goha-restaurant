import type { CreateOrderItemDto, UpdateOrderItemDto } from "../../../application/dtos/Orders/order-item.dto"
import type { OrderItem } from "../../../infrastructure/database/models"

export interface IOrderItemRepository {
  create(orderItemData: CreateOrderItemDto): Promise<OrderItem>
  findById(id: string): Promise<OrderItem | null>
  findByOrderId(orderId: string): Promise<OrderItem[]>
  findAll(page?: number, limit?: number): Promise<{ orderItems: OrderItem[]; total: number }>
  update(id: string, orderItemData: UpdateOrderItemDto): Promise<OrderItem | null>
  delete(id: string): Promise<boolean>
  deleteByOrderId(orderId: string): Promise<boolean>
}
