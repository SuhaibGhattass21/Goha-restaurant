import type { CreateOrderItemExtraDto } from "../../../application/dtos/Orders/order-item.dto"
import type { OrderItemExtra } from "../../../infrastructure/database/models"

export interface IOrderItemExtraRepository {
  create(orderItemExtraData: CreateOrderItemExtraDto & { order_item_id: string }): Promise<OrderItemExtra>
  findById(id: string): Promise<OrderItemExtra | null>
  findByOrderItemId(orderItemId: string): Promise<OrderItemExtra[]>
  delete(id: string): Promise<boolean>
  deleteByOrderItemId(orderItemId: string): Promise<boolean>
  createMany(orderItemExtras: (CreateOrderItemExtraDto & { order_item_id: string })[]): Promise<OrderItemExtra[]>
}
