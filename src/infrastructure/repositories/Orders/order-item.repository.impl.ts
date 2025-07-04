import type { Repository } from "typeorm"
import type { OrderItem } from "../../database/models/OrderItem.model"
import type { CreateOrderItemDto, UpdateOrderItemDto } from "../../../application/dtos/Orders/order-item.dto"
import type { IOrderItemRepository } from "../../../domain/repositories/Orders/order-item.repository.interface"

export class OrderItemRepositoryImpl implements IOrderItemRepository {
  constructor(private orderItemRepository: Repository<OrderItem>) { }

  async create(orderItemData: CreateOrderItemDto): Promise<OrderItem> {
    const orderItem = this.orderItemRepository.create({
      order: { order_id: orderItemData.order_id },
      product_size: { product_size_id: orderItemData.product_size_id },
      quantity: orderItemData.quantity,
      unit_price: orderItemData.unit_price,
      special_instructions: orderItemData.special_instructions,
    })
    return await this.orderItemRepository.save(orderItem)
  }

  async findById(id: string): Promise<OrderItem | null> {
    return await this.orderItemRepository.findOne({
      where: { order_item_id: id },
      relations: [
        "order",
        "product_size",
        "product_size.product",
        "product_size.product.category",
        "product_size.size",
        "product_size.size.category",
        "extras",
        "extras.extra",
        "extras.extra.category",
      ],
    })
  }

  async findByOrderId(orderId: string): Promise<OrderItem[]> {
    return await this.orderItemRepository.find({
      where: { order: { order_id: orderId } },
      relations: [
        "product_size",
        "product_size.product",
        "product_size.product.category",
        "product_size.size",
        "product_size.size.category",
        "extras",
        "extras.extra",
        "extras.extra.category",
      ],
      order: { order_item_id: "ASC" },
    })
  }

  async findAll(page = 1, limit = 10): Promise<{ orderItems: OrderItem[]; total: number }> {
    const [orderItems, total] = await this.orderItemRepository.findAndCount({
      relations: [
        "order",
        "product_size",
        "product_size.product",
        "product_size.product.category",
        "product_size.size",
        "product_size.size.category",
        "extras",
        "extras.extra",
        "extras.extra.category",
      ],
      skip: (page - 1) * limit,
      take: limit,
      order: { order_item_id: "DESC" },
    })

    return { orderItems, total }
  }

  async update(id: string, orderItemData: UpdateOrderItemDto): Promise<OrderItem | null> {
    const updateData: any = { ...orderItemData }

    // Handle product_size_id update
    if (orderItemData.product_size_id) {
      updateData.product_size = { product_size_id: orderItemData.product_size_id }
      delete updateData.product_size_id
    }

    await this.orderItemRepository.update(id, updateData)
    return await this.findById(id)
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.orderItemRepository.delete(id)
    return (result.affected ?? 0) > 0
  }

  async deleteByOrderId(orderId: string): Promise<boolean> {
    const result = await this.orderItemRepository.delete({ order: { order_id: orderId } })
    return (result.affected ?? 0) > 0
  }
}
