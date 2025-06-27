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
} from "@application/dtos/Orders/order.dto"
import { OrderStatus, type OrderType } from "../../../domain/enums/Order.enums" // Declare the variable here
import type { CancelledOrderUseCases } from "./cancelled-order.use-cases"

export class OrderUseCases {
  constructor(
    private orderRepository: IOrderRepository,
    private orderItemRepository: IOrderItemRepository,
    private orderItemExtraRepository: IOrderItemExtraRepository,
    private cancelledOrderUseCases: CancelledOrderUseCases, // Add this line
  ) {}

  async createOrder(orderData: CreateOrderDto): Promise<OrderResponseDto> {
    // Create the order first
    const order = await this.orderRepository.create({
      cashier_id: orderData.cashier_id,
      shift_id: orderData.shift_id,
      table_number: orderData.table_number,
      order_type: orderData.order_type,
      customer_name: orderData.customer_name,
      customer_phone: orderData.customer_phone,
    })

    // Create order items
    for (const itemData of orderData.items) {
      const orderItem = await this.orderItemRepository.create({
        order_id: order.order_id,
        product_size_id: itemData.product_size_id,
        quantity: itemData.quantity,
        unit_price: itemData.unit_price,
        special_instructions: itemData.special_instructions,
      })

      // Create extras for this item
      if (itemData.extras && itemData.extras.length > 0) {
        const extrasData = itemData.extras.map((extra) => ({
          ...extra,
          order_item_id: orderItem.order_item_id,
        }))
        await this.orderItemExtraRepository.createMany(extrasData)
      }
    }

    // Calculate and update total price
    await this.orderRepository.calculateOrderTotal(order.order_id)

    // Fetch the complete order with all relations
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

  async getOrdersByShiftId(shiftId: string): Promise<OrderSummaryDto[]> {
    const orders = await this.orderRepository.findByShiftId(shiftId)
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

  async getAllOrders(page = 1, limit = 10): Promise<OrderListResponseDto> {
    const { orders, total } = await this.orderRepository.findAll(page, limit)

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
      // Ensure cashier and shift relations are loaded and not null
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
        reason: "Order status changed to CANCELLED automatically", // Default reason
      })
    }
    if (order) {
      // Recalculate total if needed
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

    // Delete all order items and their extras (cascade should handle this)
    const orderItems = await this.orderItemRepository.findByOrderId(id)
    for (const item of orderItems) {
      await this.orderItemExtraRepository.deleteByOrderItemId(item.order_item_id)
    }
    await this.orderItemRepository.deleteByOrderId(id)

    // Delete the order
    return await this.orderRepository.delete(id)
  }

  async getOrderStats(shiftId?: string, startDate?: Date, endDate?: Date): Promise<OrderStatsDto> {
    return await this.orderRepository.getOrderStats(shiftId, startDate, endDate)
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
            start_time: order.shift.start_time?.toISOString() || "", // Add defensive check
            status: order.shift.status,
          }
        : undefined,
      table_number: order.table_number,
      order_type: order.order_type,
      status: order.status,
      total_price: Number(order.total_price),
      customer_name: order.customer_name,
      customer_phone: order.customer_phone,
      created_at: order.created_at?.toISOString() || "", // Add defensive check
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

    return {
      order_item_id: item.order_item_id,
      order_id: item.order?.order_id || "",
      product_size: item.product_size
        ? {
            product_size_id: item.product_size.product_size_id,
            product_name: item.product_size.product?.name || "",
            size_name: item.product_size.size?.size_name || "",
            price: Number(item.product_size.price),
          }
        : undefined,
      quantity: item.quantity,
      unit_price: Number(item.unit_price),
      special_instructions: item.special_instructions,
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
