import type { Repository } from "typeorm";
import type { OrderItem } from "../../database/models/OrderItem.model";
import type { CreateOrderItemDto, UpdateOrderItemDto } from "../../../application/dtos/Orders/order-item.dto";
import type { IOrderItemRepository } from "../../../domain/repositories/Orders/order-item.repository.interface";
export declare class OrderItemRepositoryImpl implements IOrderItemRepository {
    private orderItemRepository;
    constructor(orderItemRepository: Repository<OrderItem>);
    create(orderItemData: CreateOrderItemDto): Promise<OrderItem>;
    findById(id: string): Promise<OrderItem | null>;
    findByOrderId(orderId: string): Promise<OrderItem[]>;
    findAll(page?: number, limit?: number): Promise<{
        orderItems: OrderItem[];
        total: number;
    }>;
    update(id: string, orderItemData: UpdateOrderItemDto): Promise<OrderItem | null>;
    delete(id: string): Promise<boolean>;
    deleteByOrderId(orderId: string): Promise<boolean>;
}
