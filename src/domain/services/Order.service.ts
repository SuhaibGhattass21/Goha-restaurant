import { CreateOrderDto, UpdateOrderStatusDto } from '../../application/dtos/Order.dto';
import { AppDataSource } from '../../infrastructure/database/postgres/db';
import { Order } from '../../infrastructure/database/models/Order.model';
import { OrderItem } from '../../infrastructure/database/models/OrderItem.model';
import { ProductSizePrice } from '../../infrastructure/database/models/ProductSizePrice.model';
import { OrderRepository } from '../../infrastructure/repositories/order.repository.impl';
import { OrderStatus } from '@domain/enums/Order.enums';

export class OrderService {
    private orderRepo = new OrderRepository();

    async createOrder(dto: CreateOrderDto): Promise<Order> {
        const order = new Order();
        order.order_type = dto.order_type;
        order.table_number = dto.table_number;
        order.total_price = 0;
        order.cashier = { user_id: dto.cashier_id } as any;
        order.shift = { shift_id: dto.shift_id } as any;

        const orderItems: OrderItem[] = [];

        for (const item of dto.items) {
            const price = await this.getProductSizePrice(item.product_size_id);
            const orderItem = new OrderItem();
            orderItem.product_size = { product_size_id: item.product_size_id } as ProductSizePrice;
            orderItem.quantity = item.quantity;
            orderItem.unit_price = price;
            orderItem.order = order;
            orderItems.push(orderItem);
            order.total_price += price * item.quantity;
        }

        order.items = orderItems;
        return await this.orderRepo.save(order);
    }

    private async getProductSizePrice(product_size_id: string): Promise<number> {
        const repo = AppDataSource.getRepository(ProductSizePrice);
        const result = await repo.findOne({ where: { product_size_id } });
        if (!result) throw new Error(`Price not found for size ${product_size_id}`);
        return Number(result.price);
    }

    async getOrderById(orderId: string): Promise<Order | null> {
        return this.orderRepo.findById(orderId);
    }

    async getAllOrders(): Promise<Order[]> {
        return AppDataSource.getRepository(Order).find({
            relations: ['items', 'cashier', 'shift'],
            order: { created_at: 'DESC' },
        });
    }

    async getOrdersByShift(shiftId: string): Promise<Order[]> {
        return AppDataSource.getRepository(Order).find({
            where: { shift: { shift_id: shiftId } },
            relations: ['items'],
        });
    }

    async updateOrderStatus(dto: UpdateOrderStatusDto): Promise<void> {
        const repo = AppDataSource.getRepository(Order);

        const order = await repo.findOneBy({ order_id: dto.order_id });
        if (!order) {
            throw new Error('Order not found');
        }

        order.status = dto.status;
        await repo.save(order);
    }

    async markCompleted(orderId: string): Promise<void> {
        await this.updateOrderStatus({
            order_id: orderId,
            status: OrderStatus.COMPLETED,
        });
    }

    async markCancelled(orderId: string): Promise<void> {
        await this.updateOrderStatus({
            order_id: orderId,
            status: OrderStatus.CANCELLED,
        });
    }

    async deleteOrder(orderId: string): Promise<void> {
        await AppDataSource.getRepository(Order).softDelete(orderId);
    }
}
