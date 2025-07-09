import type { Repository } from "typeorm";
import type { OrderItemExtra } from "../../database/models/OrderItemExtra.model";
import type { CreateOrderItemExtraDto } from "../../../application/dtos/Orders/order-item.dto";
import type { IOrderItemExtraRepository } from "../../../domain/repositories/Orders/order-item-extra.repository.interface";
export declare class OrderItemExtraRepositoryImpl implements IOrderItemExtraRepository {
    private orderItemExtraRepository;
    constructor(orderItemExtraRepository: Repository<OrderItemExtra>);
    create(orderItemExtraData: CreateOrderItemExtraDto & {
        order_item_id: string;
    }): Promise<OrderItemExtra>;
    findById(id: string): Promise<OrderItemExtra | null>;
    findByOrderItemId(orderItemId: string): Promise<OrderItemExtra[]>;
    delete(id: string): Promise<boolean>;
    deleteByOrderItemId(orderItemId: string): Promise<boolean>;
    createMany(orderItemExtras: (CreateOrderItemExtraDto & {
        order_item_id: string;
    })[]): Promise<OrderItemExtra[]>;
}
