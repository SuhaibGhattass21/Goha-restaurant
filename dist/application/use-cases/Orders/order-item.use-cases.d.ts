import type { IOrderItemRepository } from "../../../domain/repositories/Orders/order-item.repository.interface";
import type { IOrderItemExtraRepository } from "../../../domain/repositories/Orders/order-item-extra.repository.interface";
import type { CreateOrderItemDto, OrderItemResponseDto, OrderItemListResponseDto, UpdateOrderItemDto } from "../../../application/dtos/Orders/order-item.dto";
export declare class OrderItemUseCases {
    private orderItemRepository;
    private orderItemExtraRepository;
    constructor(orderItemRepository: IOrderItemRepository, orderItemExtraRepository: IOrderItemExtraRepository);
    createOrderItem(orderItemData: CreateOrderItemDto): Promise<OrderItemResponseDto>;
    getOrderItemById(id: string): Promise<OrderItemResponseDto | null>;
    getOrderItemsByOrderId(orderId: string): Promise<OrderItemResponseDto[]>;
    getAllOrderItems(page?: number, limit?: number): Promise<OrderItemListResponseDto>;
    updateOrderItem(id: string, orderItemData: UpdateOrderItemDto): Promise<OrderItemResponseDto | null>;
    deleteOrderItem(id: string): Promise<boolean>;
    deleteOrderItemsByOrderId(orderId: string): Promise<boolean>;
    private mapToResponseDto;
    private mapExtraToResponseDto;
}
