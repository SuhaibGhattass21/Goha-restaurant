import { Repository } from "typeorm";
import type { Order } from "../../database/models/Order.model";
import type { CreateOrderDto, UpdateOrderDto, OrderStatsDto } from "../../../application/dtos/Orders/order.dto";
import type { IOrderRepository } from "../../../domain/repositories/Orders/order.repository.interface";
import type { OrderStatus, OrderType } from "../../../domain/enums/Order.enums";
import type { ShiftType } from "../../../domain/enums/Shift.enums";
export declare class OrderRepositoryImpl implements IOrderRepository {
    private orderRepository;
    constructor(orderRepository: Repository<Order>);
    create(orderData: Omit<CreateOrderDto, "items">): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    findByShiftId(shiftId: string): Promise<Order[]>;
    findByCashierId(cashierId: string, page?: number, limit?: number): Promise<{
        orders: Order[];
        total: number;
    }>;
    findByStatus(status: OrderStatus, page?: number, limit?: number): Promise<{
        orders: Order[];
        total: number;
    }>;
    findByOrderType(orderType: OrderType, page?: number, limit?: number): Promise<{
        orders: Order[];
        total: number;
    }>;
    findByDateRange(startDate: Date, endDate: Date, page?: number, limit?: number): Promise<{
        orders: Order[];
        total: number;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        orders: Order[];
        total: number;
    }>;
    update(id: string, orderData: UpdateOrderDto): Promise<Order | null>;
    updateStatus(id: string, status: OrderStatus): Promise<Order | null>;
    delete(id: string): Promise<boolean>;
    getOrderStats(shiftId?: string, startDate?: Date, endDate?: Date): Promise<OrderStatsDto>;
    getOrdersByShiftTypeAndDate(shiftType: ShiftType, dateStr: string): Promise<Order[]>;
    calculateOrderTotal(orderId: string): Promise<number>;
}
