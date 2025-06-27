import type { Repository } from "typeorm"
import type { CancelledOrder } from "../../database/models/CancelledOrder.model"
import type { CreateCancelledOrderDto } from "../../../application/dtos/Orders/cancelled-order.dto"
import type { ICancelledOrderRepository } from "../../../domain/repositories/Orders/cancelled-order.repository.interface"

export class CancelledOrderRepositoryImpl implements ICancelledOrderRepository {
  constructor(private cancelledOrderRepository: Repository<CancelledOrder>) { }

  async create(cancelledOrderData: CreateCancelledOrderDto): Promise<CancelledOrder> {
    const cancelledOrder = this.cancelledOrderRepository.create({
      order: { order_id: cancelledOrderData.order_id },
      cancelled_by: { id: cancelledOrderData.cancelled_by },
      shift: { shift_id: cancelledOrderData.shift_id },
      reason: cancelledOrderData.reason,
    })
    return await this.cancelledOrderRepository.save(cancelledOrder)
  }

  async findById(id: string): Promise<CancelledOrder | null> {
    return await this.cancelledOrderRepository.findOne({
      where: { cancelled_order_id: id },
      relations: ["order", "cancelled_by", "shift"],
    })
  }

  async findByOrderId(orderId: string): Promise<CancelledOrder | null> {
    return await this.cancelledOrderRepository.findOne({
      where: { order: { order_id: orderId } },
      relations: ["order", "cancelled_by", "shift"],
    })
  }

  async findByCancelledBy(
    userId: string,
    page = 1,
    limit = 10,
  ): Promise<{ cancelledOrders: CancelledOrder[]; total: number }> {
    const [cancelledOrders, total] = await this.cancelledOrderRepository.findAndCount({
      where: { cancelled_by: { id: userId } },
      relations: ["order", "cancelled_by", "shift"],
      skip: (page - 1) * limit,
      take: limit,
      order: { cancelled_at: "DESC" },
    })
    return { cancelledOrders, total }
  }

  async findByShiftId(
    shiftId: string,
    page = 1,
    limit = 10,
  ): Promise<{ cancelledOrders: CancelledOrder[]; total: number }> {
    const [cancelledOrders, total] = await this.cancelledOrderRepository.findAndCount({
      where: { shift: { shift_id: shiftId } },
      relations: ["order", "cancelled_by", "shift"],
      skip: (page - 1) * limit,
      take: limit,
      order: { cancelled_at: "DESC" },
    })
    return { cancelledOrders, total }
  }

  async findAll(page = 1, limit = 10): Promise<{ cancelledOrders: CancelledOrder[]; total: number }> {
    const [cancelledOrders, total] = await this.cancelledOrderRepository.findAndCount({
      relations: ["order", "cancelled_by", "shift"],
      skip: (page - 1) * limit,
      take: limit,
      order: { cancelled_at: "DESC" },
    })
    return { cancelledOrders, total }
  }
}
