import type { Repository } from "typeorm"
import type { OrderItemExtra } from "../../database/models/OrderItemExtra.model"
import type { CreateOrderItemExtraDto } from "../../../application/dtos/Orders/order-item.dto"
import type { IOrderItemExtraRepository } from "../../../domain/repositories/Orders/order-item-extra.repository.interface"

export class OrderItemExtraRepositoryImpl implements IOrderItemExtraRepository {
  constructor(private orderItemExtraRepository: Repository<OrderItemExtra>) { }

  async create(orderItemExtraData: CreateOrderItemExtraDto & { order_item_id: string }): Promise<OrderItemExtra> {
    const orderItemExtra = this.orderItemExtraRepository.create({
      orderItem: { order_item_id: orderItemExtraData.order_item_id },
      extra: { extra_id: orderItemExtraData.extra_id }, // Fixed: using extra_id
      price: orderItemExtraData.price,
    })
    return await this.orderItemExtraRepository.save(orderItemExtra)
  }

  async findById(id: string): Promise<OrderItemExtra | null> {
    return await this.orderItemExtraRepository.findOne({
      where: { order_item_extra_id: id },
      relations: ["orderItem", "extra", "extra.category"],
    })
  }

  async findByOrderItemId(orderItemId: string): Promise<OrderItemExtra[]> {
    return await this.orderItemExtraRepository.find({
      where: { orderItem: { order_item_id: orderItemId } },
      relations: ["extra", "extra.category"],
      order: { order_item_extra_id: "ASC" },
    })
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.orderItemExtraRepository.delete(id)
    return (result.affected ?? 0) > 0
  }

  async deleteByOrderItemId(orderItemId: string): Promise<boolean> {
    const result = await this.orderItemExtraRepository.delete({
      orderItem: { order_item_id: orderItemId },
    })
    return (result.affected ?? 0) > 0
  }

  async createMany(
    orderItemExtras: (CreateOrderItemExtraDto & { order_item_id: string })[],
  ): Promise<OrderItemExtra[]> {
    const entities = orderItemExtras.map((data) =>
      this.orderItemExtraRepository.create({
        orderItem: { order_item_id: data.order_item_id },
        extra: { extra_id: data.extra_id }, // Fixed: using extra_id
        price: data.price,
      }),
    )
    return await this.orderItemExtraRepository.save(entities)
  }
}
