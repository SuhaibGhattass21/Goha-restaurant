import type { IOrderRepository } from "@domain/repositories/Orders/order.repository.interface"
import type { IOrderItemRepository } from "@domain/repositories/Orders/order-item.repository.interface"
import type { IOrderItemExtraRepository } from "@domain/repositories/Orders/order-item-extra.repository.interface"
import type { Order } from "../../../infrastructure/database/models/Order.model"
import { OrderItem } from "../../../infrastructure/database/models/OrderItem.model"
import type {
  CreateOrderDto,
  OrderResponseDto,
  OrderListResponseDto,
  UpdateOrderDto,
  OrderSummaryDto,
  OrderStatsDto,
  FilterOrdersByShiftTypeAndDateDto,
  CancelOrderDto,
} from "../../../application/dtos/Orders/order.dto"
import { OrderItemExtraResponseDto } from "../../../application/dtos/Orders/order-item.dto"
import { OrderStatus, type OrderType } from "../../../domain/enums/Order.enums"
import type { CancelledOrderUseCases } from "./cancelled-order.use-cases"
import { OrderItemExtra } from "@infrastructure/database/models"
import { OrderItemResponseDto } from "@application/dtos/Orders/order-item.dto"
import { LoggerService } from "../../../infrastructure/logger/logger.service"
import { LoggingUtils } from "../../../infrastructure/logger/utils/logging.utils"
import { LogBusinessOperation, LogMethod } from "../../../infrastructure/logger/decorators/log.decorator"

export class OrderUseCases {
  private logger = LoggerService.getInstance();

  constructor(
    private orderRepository: IOrderRepository,
    private orderItemRepository: IOrderItemRepository,
    private orderItemExtraRepository: IOrderItemExtraRepository,
    private cancelledOrderUseCases: CancelledOrderUseCases, // Add this line
  ) { }

  @LogBusinessOperation('ORDER', 'CREATE')
  async createOrder(orderData: CreateOrderDto): Promise<OrderResponseDto> {
    const traceId = LoggingUtils.generateCorrelationId();
    
    this.logger.info('Creating new order', {
      component: 'ORDER_SERVICE',
      operation: 'CREATE_ORDER',
      traceId,
      data: LoggingUtils.sanitizeData(orderData) as any
    });

    try {
      const order = await this.orderRepository.create({
        cashier_id: orderData.cashier_id,
        shift_id: orderData.shift_id,
        table_number: orderData.table_number,
        order_type: orderData.order_type,
        customer_name: orderData.customer_name,
        customer_phone: orderData.customer_phone,
      })

      this.logger.debug('Order created, adding items', {
        component: 'ORDER_SERVICE',
        operation: 'ADD_ORDER_ITEMS',
        traceId,
        orderId: order.order_id,
        itemCount: orderData.items.length
      });

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
        this.logger.error('Failed to retrieve created order', {
          component: 'ORDER_SERVICE',
          operation: 'CREATE_ORDER',
          traceId,
          orderId: order.order_id
        } as any);
        throw new Error("Failed to create order")
      }

      // Log successful business operation
      LoggingUtils.logBusinessOperation(
        'ORDER',
        completeOrder.order_id,
        'CREATE',
        orderData.cashier_id,
        undefined,
        completeOrder
      );

      this.logger.info('Order created successfully', {
        component: 'ORDER_SERVICE',
        operation: 'CREATE_ORDER',
        traceId,
        orderId: completeOrder.order_id,
        total: completeOrder.total_price || 0
      } as any);

      return this.mapToResponseDto(completeOrder)
    } catch (error) {
      this.logger.error('Failed to create order', error, {
        component: 'ORDER_SERVICE',
        operation: 'CREATE_ORDER',
        traceId,
        data: LoggingUtils.sanitizeData(orderData)
      } as any);
      throw error;
    }
  }

  @LogMethod({ component: 'ORDER_SERVICE' })
  async getOrderById(id: string): Promise<OrderResponseDto | null> {
    const order = await this.orderRepository.findById(id)
    if (order) {
      this.logger.debug('Order retrieved successfully', {
        component: 'ORDER_SERVICE',
        operation: 'GET_ORDER_BY_ID',
        orderId: id
      } as any);
    } else {
      this.logger.warn('Order not found', {
        component: 'ORDER_SERVICE',
        operation: 'GET_ORDER_BY_ID',
        orderId: id
      } as any);
    }
    return order ? this.mapToResponseDto(order) : null
  }

  @LogMethod({ component: 'ORDER_SERVICE' })
  async getOrdersByShiftIdGoha(shiftId: string): Promise<OrderSummaryDto[]> {
    const orders = await this.orderRepository.findByShiftIdGoha(shiftId)
    this.logger.info('Retrieved Goha orders by shift', {
      component: 'ORDER_SERVICE',
      operation: 'GET_ORDERS_BY_SHIFT_GOHA',
      shiftId,
      orderCount: orders.length
    } as any);
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

  async requestCancelOrder(cancelOrderData: { order_id: string; cancelled_by: string; shift_id: string; reason?: string }): Promise<{ order: OrderResponseDto; cancelledOrder: any }> {
    const cancelledOrder = await this.cancelledOrderUseCases.requestCancellation({
      order_id: cancelOrderData.order_id,
      cancelled_by: cancelOrderData.cancelled_by,
      shift_id: cancelOrderData.shift_id,
      reason: cancelOrderData.reason,
    })

    const completeOrder = await this.orderRepository.findById(cancelOrderData.order_id)
    if (!completeOrder) {
      throw new Error("Failed to retrieve updated order")
    }

    return {
      order: this.mapToResponseDto(completeOrder),
      cancelledOrder,
    }
  }

  async cancelOrder(cancelOrderData: { order_id: string; cancelled_by: string; shift_id: string; reason?: string }): Promise<{ order: OrderResponseDto; cancelledOrder: any }> {
    // First, check if the order exists and is not already cancelled
    const existingOrder = await this.orderRepository.findById(cancelOrderData.order_id)
    if (!existingOrder) {
      throw new Error("Order not found")
    }

    if (existingOrder.status === OrderStatus.CANCELLED) {
      throw new Error("Order is already cancelled")
    }

    // Update the order status to cancelled
    const updatedOrder = await this.orderRepository.updateStatus(cancelOrderData.order_id, OrderStatus.CANCELLED)
    if (!updatedOrder) {
      throw new Error("Failed to update order status")
    }

    // Create a cancelled order record
    const cancelledOrder = await this.cancelledOrderUseCases.createCancelledOrder({
      order_id: cancelOrderData.order_id,
      cancelled_by: cancelOrderData.cancelled_by,
      shift_id: cancelOrderData.shift_id,
      reason: cancelOrderData.reason || "Manually cancelled",
    })

    // Recalculate order total
    await this.orderRepository.calculateOrderTotal(cancelOrderData.order_id)

    // Get the complete updated order
    const completeOrder = await this.orderRepository.findById(cancelOrderData.order_id)
    if (!completeOrder) {
      throw new Error("Failed to retrieve updated order")
    }

    return {
      order: this.mapToResponseDto(completeOrder),
      cancelledOrder,
    }
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

  private mapItemToResponseDto(item: OrderItem): any {
    const basePrice = Number(item.unit_price) * item.quantity;
    const extrasPrice =
      item.extras?.reduce(
        (sum, extra) => sum + Number(extra.price) * Number(extra.quantity || 1),
        0
      ) || 0;
    const totalPrice = basePrice + extrasPrice;

    return {
      order_item_id: item.order_item_id,
      product_size: item.product_size
        ? {
          product_size_id: item.product_size.product_size_id,
          product_name: item.product_size.product.name || "",
          size_name: item.product_size.size.size_name || "",
          price: Number(item.product_size.price),
          category_name: item.product_size.product.category.name || "",
          product_description: item.product_size.product.description || "",
        }
        : undefined,
      quantity: item.quantity,
      basePrice: Number(basePrice.toFixed(2)),
      special_instructions: item.special_instructions,
      category_id: item.product_size.product.category.category_id,
      category_name: item.product_size.product.category.name,
      extras: item.extras?.map((extra) => this.mapExtraToResponseDto(extra)) || [],
      extrasPrice: Number(extrasPrice.toFixed(2)),
      total_price: Number(totalPrice.toFixed(2)),
    };
  }

  private mapExtraToResponseDto(extra: OrderItemExtra): any {
    return {
      order_item_extra_id: extra.order_item_extra_id,
      extra: extra.extra.extra_id,
      extra_name: extra.extra.name,
      price: Number(extra.price),
      category_name: extra.extra.category.name || "",
      quantity: extra.quantity || 1,
    };
  }

}