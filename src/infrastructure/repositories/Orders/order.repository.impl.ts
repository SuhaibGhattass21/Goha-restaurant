import { Repository, Between } from "typeorm"
import type { Order } from "../../database/models/Order.model"
import type { CreateOrderDto, UpdateOrderDto, OrderStatsDto } from "../../../application/dtos/Orders/order.dto"
import type { IOrderRepository } from "../../../domain/repositories/Orders/order.repository.interface"
import { OrderStatus, OrderType } from "../../../domain/enums/Order.enums"
import { ShiftType } from "../../../domain/enums/Shift.enums"
import { startOfDay, endOfDay } from "date-fns"
import { Not } from "typeorm"
import { log } from "node:console"
export class OrderRepositoryImpl implements IOrderRepository {
  constructor(private orderRepository: Repository<Order>) { }

  async create(orderData: Omit<CreateOrderDto, "items">): Promise<Order> {
    const order = this.orderRepository.create({
      cashier: { id: orderData.cashier_id },
      shift: { shift_id: orderData.shift_id },
      table_number: orderData.table_number,
      order_type: orderData.order_type,
      customer_name: orderData.customer_name,
      customer_phone: orderData.customer_phone,
      total_price: 0, 
    })
    return await this.orderRepository.save(order)
  }

  async findById(id: string): Promise<Order | null> {
    return await this.orderRepository.findOne({
      where: { order_id: id },
      relations: [
        "cashier",
        "shift",
        "items",
        "items.product_size",
        "items.product_size.product",
        "items.product_size.product.category",
        "items.product_size.size",
        "items.extras",
        "items.extras.extra",
      ],
    })
  }

async findByShiftIdGoha(shiftId: string): Promise<Order[]> {
  return await this.orderRepository.find({
    where: { 
      shift: { shift_id: shiftId },
      order_type: Not(OrderType.CAFE)
    },
    relations: ["cashier", "items"],
    order: { created_at: "DESC" },
  })
}

    async findByShiftIdCafe(shiftId: string): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { shift: { shift_id: shiftId }, 
      order_type: OrderType.CAFE
    },
      relations: ["cashier", "items"],
      order: { created_at: "DESC" },
    })
  }

  async findByCashierId(cashierId: string, page = 1, limit = 10): Promise<{ orders: Order[]; total: number }> {
    const [orders, total] = await this.orderRepository.findAndCount({
      where: { cashier: { id: cashierId } },
      relations: ["cashier", "shift", "items"],
      skip: (page - 1) * limit,
      take: limit,
      order: { created_at: "DESC" },
    })

    return { orders, total }
  }

  async findByStatus(status: OrderStatus, page = 1, limit = 10): Promise<{ orders: Order[]; total: number }> {
    const [orders, total] = await this.orderRepository.findAndCount({
      where: { status },
      relations: ["cashier", "shift", "items"],
      skip: (page - 1) * limit,
      take: limit,
      order: { created_at: "DESC" },
    })

    return { orders, total }
  }

  async findByOrderType(orderType: OrderType, page = 1, limit = 10): Promise<{ orders: Order[]; total: number }> {
    const [orders, total] = await this.orderRepository.findAndCount({
      where: { order_type: orderType },
      relations: ["cashier", "shift", "items"],
      skip: (page - 1) * limit,
      take: limit,
      order: { created_at: "DESC" },
    })

    return { orders, total }
  }

  async findByDateRange(
    startDate: Date,
    endDate: Date,
    page = 1,
    limit = 10,
  ): Promise<{ orders: Order[]; total: number }> {
    const [orders, total] = await this.orderRepository
      .createQueryBuilder("order")
      .leftJoinAndSelect("order.cashier", "cashier")
      .leftJoinAndSelect("order.shift", "shift")
      .leftJoinAndSelect("order.items", "items")
      .where("order.created_at >= :startDate", { startDate })
      .andWhere("order.created_at <= :endDate", { endDate })
      .orderBy("order.created_at", "DESC")
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount()

    return { orders, total }
  }

  async findAllExceptCafe(page = 1, limit = 10): Promise<{ orders: Order[]; total: number }> {
    const [orders, total] = await this.orderRepository.findAndCount({
      where: { order_type: Not(OrderType.CAFE) },
      relations: ["cashier", "shift", "items", "items.product_size",
  "items.product_size.product",
  "items.product_size.product.category"],
      skip: (page - 1) * limit,
      take: limit,
      order: { created_at: "DESC" },
    })

    return { orders, total }
  }

    async findAllCafe(page = 1, limit = 10): Promise<{ orders: Order[]; total: number }> {
    const [orders, total] = await this.orderRepository.findAndCount({
      where: { order_type: OrderType.CAFE },
      relations: ["cashier", "shift", "items", "items.product_size",
  "items.product_size.product",
  "items.product_size.product.category"],
      skip: (page - 1) * limit,
      take: limit,
      order: { created_at: "DESC" },
    })

    return { orders, total }
  }

  // async findAll(page = 1, limit = 10): Promise<{ orders: Order[]; total: number }> {
  //   const [orders, total] = await this.orderRepository.findAndCount({
  //     relations: ["cashier", "shift", "items", "items.product_size",
  // "items.product_size.product",
  // "items.product_size.product.category"],
  //     skip: (page - 1) * limit,
  //     take: limit,
  //     order: { created_at: "DESC" },
  //   })

  //   return { orders, total }
  // }

  async update(id: string, orderData: UpdateOrderDto): Promise<Order | null> {
    await this.orderRepository.update(id, orderData)
    return await this.findById(id)
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order | null> {
    await this.orderRepository.update(id, { status })
    return await this.findById(id)
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.orderRepository.delete(id)
    return (result.affected ?? 0) > 0
  }

  //for goha not for cafe
  async getOrderStats(shiftId?: string, startDate?: Date, endDate?: Date): Promise<OrderStatsDto> {
    let query = this.orderRepository.createQueryBuilder("order")

    if (shiftId) {
      query = query.where("order.shift.shift_id = :shiftId", { shiftId })
        .andWhere("order.order_type != :cafeType", { cafeType: OrderType.CAFE })
    }

    if (startDate && endDate) {
      const whereClause = shiftId ? "AND" : "WHERE"
      query = query.andWhere(`order.created_at >= :startDate ${whereClause} order.created_at <= :endDate`, {
        startDate,
        endDate,
      })
    }

    const orders = await query.getMany()

    const stats = {
      total_orders: orders.length,
      active_orders: orders.filter((o) => o.status === "active").length,
      completed_orders: orders.filter((o) => o.status === "completed").length,
      cancelled_orders: orders.filter((o) => o.status === "cancelled").length,
      total_revenue: orders.filter((o) => o.status === "completed").reduce((sum, o) => sum + Number(o.total_price), 0),
      average_order_value: 0,
    }

    stats.average_order_value = stats.completed_orders > 0 ? stats.total_revenue / stats.completed_orders : 0

    return stats
  }

    async getOrderStatsCafe(shiftId?: string, startDate?: Date, endDate?: Date): Promise<OrderStatsDto> {
    let query = this.orderRepository.createQueryBuilder("order")
    console.log("a7aaaaa")
    if (shiftId) {
      query = query.where("order.shift.shift_id = :shiftId", { shiftId })
        .andWhere("order.order_type = :cafeType", { cafeType: OrderType.CAFE })
    }

    if (startDate && endDate) {   
      const whereClause = shiftId ? "AND" : "WHERE"
      query = query.andWhere(`order.created_at >= :startDate ${whereClause} order.created_at <= :endDate`, {
        startDate,
        endDate,
      })
    }

    const orders = await query.getMany()
    console.log(orders)

    const stats = {
      total_orders: orders.length,
      active_orders: orders.filter((o) => o.status === "active").length,
      completed_orders: orders.filter((o) => o.status === "completed").length,
      cancelled_orders: orders.filter((o) => o.status === "cancelled").length,
      total_revenue: orders.filter((o) => o.status === "completed").reduce((sum, o) => sum + Number(o.total_price), 0),
      average_order_value: 0,
    }

    stats.average_order_value = stats.completed_orders > 0 ? stats.total_revenue / stats.completed_orders : 0

    return stats
  }


  async getOrdersByShiftTypeAndDate(shiftType: ShiftType, dateStr: string): Promise<Order[]> {
    const start = startOfDay(new Date(dateStr));
    const end = endOfDay(new Date(dateStr));

    
    return this.orderRepository.find({
      where: {
        shift: {
          shift_type: shiftType,
          start_time: Between(start, end),
        },
      },
      relations: ['shift', 'cashier', 'items', 'items.product_size'],
    });
  }

  async calculateOrderTotal(orderId: string): Promise<number> {
    const order = await this.orderRepository.findOne({
      where: { order_id: orderId },
      relations: ["items", "items.extras"],
    })

    if (!order) return 0

    const total = order.items.reduce((orderTotal, item) => {
      const itemTotal = Number(item.unit_price) * item.quantity
      const extrasTotal = item.extras?.reduce((sum, extra) => sum + Number(extra.price), 0) || 0
      return orderTotal + itemTotal + extrasTotal
    }, 0)

    await this.orderRepository.update(orderId, { total_price: total })

    return total
  }
}
