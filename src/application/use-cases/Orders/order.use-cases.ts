import type { IOrderRepository } from "@domain/repositories/Orders/order.repository.interface"
import type { IOrderItemRepository } from "@domain/repositories/Orders/order-item.repository.interface"
import type { IOrderItemExtraRepository } from "@domain/repositories/Orders/order-item-extra.repository.interface"
import type { Order } from "../../../infrastructure/database/models/Order.model"
import type {
  CreateOrderDto,
  OrderResponseDto,
  OrderListResponseDto,
  UpdateOrderDto,
  OrderSummaryDto,
  OrderStatsDto,
  FilterOrdersByShiftTypeAndDateDto,
} from "../../../application/dtos/Orders/order.dto"
import { OrderStatus, type OrderType } from "../../../domain/enums/Order.enums" 
import type { CancelledOrderUseCases } from "./cancelled-order.use-cases"

export class OrderUseCases {
  constructor(
    private orderRepository: IOrderRepository,
    private orderItemRepository: IOrderItemRepository,
    private orderItemExtraRepository: IOrderItemExtraRepository,
    private cancelledOrderUseCases: CancelledOrderUseCases, // Add this line
  ) { }

  async createOrder(orderData: CreateOrderDto): Promise<OrderResponseDto> {
    const order = await this.orderRepository.create({
      cashier_id: orderData.cashier_id,
      shift_id: orderData.shift_id,
      table_number: orderData.table_number,
      order_type: orderData.order_type,
      customer_name: orderData.customer_name,
      customer_phone: orderData.customer_phone,
    })

    for (const itemData of orderData.items) {
      const orderItem = await this.orderItemRepository.create({
        order_id: order.order_id,
        product_size_id: itemData.product_size_id,
        quantity: itemData.quantity,
        unit_price: itemData.unit_price,
        special_instructions: itemData.special_instructions,
      })

      if (itemData.extras && itemData.extras.length > 0) {
        const extrasData = itemData.extras.map((extra) => ({
          ...extra,
          order_item_id: orderItem.order_item_id,
        }))
        await this.orderItemExtraRepository.createMany(extrasData)
      }
    }

    await this.orderRepository.calculateOrderTotal(order.order_id)

    const completeOrder = await this.orderRepository.findById(order.order_id)
    if (!completeOrder) {
      throw new Error("Failed to create order")
    }

    return this.mapToResponseDto(completeOrder)
  }

  async getOrderById(id: string): Promise<OrderResponseDto | null> {
    const order = await this.orderRepository.findById(id)
    return order ? this.mapToResponseDto(order) : null
  }

  async getOrdersByShiftIdGoha(shiftId: string): Promise<OrderSummaryDto[]> {
    const orders = await this.orderRepository.findByShiftIdGoha(shiftId)
    return orders.map((order) => this.mapToSummaryDto(order))
  }

    async getOrdersByShiftIdCafe(shiftId: string): Promise<OrderSummaryDto[]> {
    const orders = await this.orderRepository.findByShiftIdCafe(shiftId)
    return orders.map((order) => this.mapToSummaryDto(order))
  }

  async getOrdersByCashierId(cashierId: string, page = 1, limit = 10): Promise<OrderListResponseDto> {
    const { orders, total } = await this.orderRepository.findByCashierId(cashierId, page, limit)

    return {
      orders: orders.map((order) => this.mapToResponseDto(order)),
      total,
      page,
      limit,
    }
  }

  async getOrdersByStatus(status: OrderStatus, page = 1, limit = 10): Promise<OrderListResponseDto> {
    const { orders, total } = await this.orderRepository.findByStatus(status, page, limit)

    return {
      orders: orders.map((order) => this.mapToResponseDto(order)),
      total,
      page,
      limit,
    }
  }

  async getOrdersByType(orderType: OrderType, page = 1, limit = 10): Promise<OrderListResponseDto> {
    const { orders, total } = await this.orderRepository.findByOrderType(orderType, page, limit)

    return {
      orders: orders.map((order) => this.mapToResponseDto(order)),
      total,
      page,
      limit,
    }
  }

  async getOrdersByDateRange(startDate: Date, endDate: Date, page = 1, limit = 10): Promise<OrderListResponseDto> {
    const { orders, total } = await this.orderRepository.findByDateRange(startDate, endDate, page, limit)

    return {
      orders: orders.map((order) => this.mapToResponseDto(order)),
      total,
      page,
      limit,
    }
  }

  async getOrdersByShiftTypeAndDate(dto: FilterOrdersByShiftTypeAndDateDto) {
    return this.orderRepository.getOrdersByShiftTypeAndDate(dto.shift_type, dto.date);
  }

    async getAllOrdersExceptCafe(page = 1, limit = 10): Promise<OrderListResponseDto> {
    const { orders, total } = await this.orderRepository.findAllExceptCafe(page, limit)

    return {
      orders: orders.map((order) => this.mapToResponseDto(order)),
      total,
      page,
      limit,
    }
  }

  async getAllOrdersCafe(page = 1, limit = 10): Promise<OrderListResponseDto> {
    const { orders, total } = await this.orderRepository.findAllCafe(page, limit)

    return {
      orders: orders.map((order) => this.mapToResponseDto(order)),
      total,
      page,
      limit,
    }
  }

  async updateOrder(id: string, orderData: UpdateOrderDto): Promise<OrderResponseDto | null> {
    const order = await this.orderRepository.update(id, orderData)
    return order ? this.mapToResponseDto(order) : null
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<OrderResponseDto | null> {
    const order = await this.orderRepository.updateStatus(id, status)
    if (order && status === OrderStatus.CANCELLED) {
      if (!order.cashier || !order.shift) {
        console.error(
          `Error: Cannot create cancelled order for order ${id}. Missing cashier or shift information. Order details:`,
          order,
        )
        throw new Error(`Failed to log cancelled order: Missing cashier or shift details for order ${id}.`)
      }

      await this.cancelledOrderUseCases.createCancelledOrder({
        order_id: order.order_id,
        cancelled_by: order.cashier.id,
        shift_id: order.shift.shift_id,
        reason: "Order status changed to CANCELLED automatically", 
      })
    }
    if (order) {
      await this.orderRepository.calculateOrderTotal(id)
      const updatedOrder = await this.orderRepository.findById(id)
      return updatedOrder ? this.mapToResponseDto(updatedOrder) : null
    }
    return null
  }

  async deleteOrder(id: string): Promise<boolean> {
    const order = await this.orderRepository.findById(id)
    if (!order) {
      return false
    }

    const orderItems = await this.orderItemRepository.findByOrderId(id)
    for (const item of orderItems) {
      await this.orderItemExtraRepository.deleteByOrderItemId(item.order_item_id)
    }
    await this.orderItemRepository.deleteByOrderId(id)

    return await this.orderRepository.delete(id)
  }

  async getOrderStats(shiftId?: string, startDate?: Date, endDate?: Date): Promise<OrderStatsDto> {
    return await this.orderRepository.getOrderStats(shiftId, startDate, endDate)
  }

    async getOrderStatsCafe(shiftId?: string, startDate?: Date, endDate?: Date): Promise<OrderStatsDto> {
    return await this.orderRepository.getOrderStatsCafe(shiftId, startDate, endDate)
  }


  async recalculateOrderTotal(orderId: string): Promise<number> {
    return await this.orderRepository.calculateOrderTotal(orderId)
  }

  private mapToResponseDto(order: Order): OrderResponseDto {
    return {
      order_id: order.order_id,
      cashier: order.cashier
        ? {
          id: order.cashier.id,
          username: order.cashier.username,
          fullName: order.cashier.fullName,
        }
        : undefined,
      shift: order.shift
        ? {
          shift_id: order.shift.shift_id,
          shift_type: order.shift.shift_type,
          start_time: order.shift.start_time?.toISOString() || "", 
          status: order.shift.status,
        }
        : undefined,
      table_number: order.table_number,
      order_type: order.order_type,
      status: order.status,
      total_price: Number(order.total_price),
      customer_name: order.customer_name,
      customer_phone: order.customer_phone,
      created_at: order.created_at?.toISOString() || "", 
      items: order.items?.map((item) => this.mapItemToResponseDto(item)) || [],
      items_count: order.items?.length || 0,
    }
  }

  private mapToSummaryDto(order: Order): OrderSummaryDto {
    return {
      order_id: order.order_id,
      table_number: order.table_number,
      order_type: order.order_type,
      status: order.status,
      total_price: Number(order.total_price),
      customer_name: order.customer_name,
      created_at: order.created_at.toISOString(),
      items_count: order.items?.length || 0,
    }
  }

 private mapItemToResponseDto(item: any): any {
  const basePrice = Number(item.unit_price) * item.quantity
  const extrasPrice = item.extras?.reduce((sum: number, extra: any) => sum + Number(extra.price), 0) || 0
  const totalPrice = basePrice + extrasPrice
  
  const product = item.product_size?.product
  const category = product?.category

  return {
    order_item_id: item.order_item_id,
    order_id: item.order?.order_id || "",
    product_size: item.product_size
      ? {
          product_size_id: item.product_size.product_size_id,
          product_name: product?.name || "",
          size_name: item.product_size.size?.size_name || "",
          price: Number(item.product_size.price),
          category_name: category?.name || "", 
          product_description: product?.description || "",
          category_description: category?.description || "",
        }
      : undefined,
    quantity: item.quantity,
    unit_price: Number(item.unit_price),
    special_instructions: item.special_instructions,
    category_id: category?.category_id || "",  
    category_name: category?.name || "",        
    extras:
      item.extras?.map((extra: any) => ({
        order_item_extra_id: extra.order_item_extra_id,
        order_item_id: extra.orderItem?.order_item_id || "",
        extra: extra.extra
          ? {
              extra_id: extra.extra.extra_id,
              name: extra.extra.name,
              price: Number(extra.extra.price),
            }
          : undefined,
        price: Number(extra.price),
      })) || [],
    total_price: Number(totalPrice.toFixed(2)),
  }
}
}