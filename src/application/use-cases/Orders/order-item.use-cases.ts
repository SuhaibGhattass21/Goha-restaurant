import type { IOrderItemRepository } from "../../../domain/repositories/Orders/order-item.repository.interface"
import type { IOrderItemExtraRepository } from "../../../domain/repositories/Orders/order-item-extra.repository.interface"
import type { OrderItem } from "../../../infrastructure/database/models/OrderItem.model"
import type {
  CreateOrderItemDto,
  OrderItemResponseDto,
  OrderItemListResponseDto,
  UpdateOrderItemDto,
  OrderItemExtraResponseDto,
} from "../../../application/dtos/Orders/order-item.dto"
import { OrderItemExtra } from "@infrastructure/database/models"

export class OrderItemUseCases {
  constructor(
    private orderItemRepository: IOrderItemRepository,
    private orderItemExtraRepository: IOrderItemExtraRepository,
  ) { }

  async createOrderItem(orderItemData: CreateOrderItemDto): Promise<OrderItemResponseDto> {
    const orderItem = await this.orderItemRepository.create({
      order_id: orderItemData.order_id,
      product_size_id: orderItemData.product_size_id,
      quantity: orderItemData.quantity,
      unit_price: orderItemData.unit_price,
      special_instructions: orderItemData.special_instructions,
    })

    // Create extras if provided
    if (orderItemData.extras && orderItemData.extras.length > 0) {
      const extrasData = orderItemData.extras.map((extra) => ({
        extra_id: extra.extra_id, // Fixed: using extra_id
        price: extra.price,
        quantity: extra.quantity,
        order_item_id: orderItem.order_item_id,
      }))
      await this.orderItemExtraRepository.createMany(extrasData)
    }

    // Fetch the complete order item with relations
    const completeOrderItem = await this.orderItemRepository.findById(orderItem.order_item_id)
    if (!completeOrderItem) {
      throw new Error("Failed to create order item")
    }

    return this.mapToResponseDto(completeOrderItem)
  }

  async getOrderItemById(id: string): Promise<OrderItemResponseDto | null> {
    const orderItem = await this.orderItemRepository.findById(id)
    return orderItem ? this.mapToResponseDto(orderItem) : null
  }

  async getOrderItemsByOrderId(orderId: string): Promise<OrderItemResponseDto[]> {
    const orderItems = await this.orderItemRepository.findByOrderId(orderId)
    return orderItems.map((item) => this.mapToResponseDto(item))
  }

  async getAllOrderItems(page = 1, limit = 10): Promise<OrderItemListResponseDto> {
    const { orderItems, total } = await this.orderItemRepository.findAll(page, limit)

    return {
      order_items: orderItems.map((item) => this.mapToResponseDto(item)),
      total,
      page,
      limit,
    }
  }

  async updateOrderItem(id: string, orderItemData: UpdateOrderItemDto): Promise<OrderItemResponseDto | null> {
    const orderItem = await this.orderItemRepository.update(id, orderItemData)
    return orderItem ? this.mapToResponseDto(orderItem) : null
  }

  async deleteOrderItem(id: string): Promise<boolean> {
    const orderItem = await this.orderItemRepository.findById(id)
    if (!orderItem) {
      return false
    }

    // Delete extras first
    await this.orderItemExtraRepository.deleteByOrderItemId(id)

    // Then delete the order item
    return await this.orderItemRepository.delete(id)
  }

  async deleteOrderItemsByOrderId(orderId: string): Promise<boolean> {
    // Get all order items for this order
    const orderItems = await this.orderItemRepository.findByOrderId(orderId)

    // Delete all extras for these order items
    for (const item of orderItems) {
      await this.orderItemExtraRepository.deleteByOrderItemId(item.order_item_id)
    }

    // Delete all order items
    return await this.orderItemRepository.deleteByOrderId(orderId)
  }

  private mapToResponseDto(orderItem: OrderItem): OrderItemResponseDto {
    const basePrice = Number(orderItem.unit_price) * orderItem.quantity
    const extrasPrice = orderItem.extras?.reduce(
      (sum, extra) => sum + Number(extra.price) * Number(extra.quantity || 1), 0
    ) || 0
    const totalPrice = basePrice + extrasPrice

    return {
      order_item_id: orderItem.order_item_id,
      order_id: orderItem.order?.order_id || "",
      product_size: orderItem.product_size
        ? {
          product_size_id: orderItem.product_size.product_size_id,
          product_name: orderItem.product_size.product?.name || "",
          size_name: orderItem.product_size.size?.size_name || "",
          price: Number(orderItem.product_size.price),
          category_name: orderItem.product_size.product?.category?.name || "",
          product_description: orderItem.product_size.product?.description,
          category_description: orderItem.product_size.product?.category?.description,
        }
        : undefined,
      quantity: orderItem.quantity,
      unit_price: Number(orderItem.unit_price),
      category_id: orderItem.product_size.product.category.category_id,
      category_name: orderItem.product_size.product.category.name,
      special_instructions: orderItem.special_instructions,
      extras: orderItem.extras?.map((extra) => this.mapExtraToResponseDto(extra)) || [],
      total_price: Number(totalPrice.toFixed(2)),
    }
  }

  private mapExtraToResponseDto(extra: OrderItemExtra): OrderItemExtraResponseDto {
    return {
      order_item_extra_id: extra.order_item_extra_id,
      order_item_id: extra.orderItem?.order_item_id || "",
      extra: extra.extra
        ? {
          extra_id: extra.extra.extra_id,
          name: extra.extra.name,
          price: Number(extra.extra.price),
          category_name: extra.extra.category?.name || "",
        }
        : undefined,
      quantity: Number(extra.quantity) || 1,
      price: Number(extra.price),
    }
  }
}
