import { AppDataSource } from '../database/postgres/db';
import { Order } from '../database/models/Order.model';
import { Repository } from 'typeorm';
import { IOrderRepository } from '@domain/repositories/order.repository.interface';

export class OrderRepository implements IOrderRepository {
    private orderRepo: Repository<Order>;

    constructor() {
        this.orderRepo = AppDataSource.getRepository(Order);
    }
    create(orderData: any): Promise<Order> {
        throw new Error('Method not implemented.');
    }
    update(orderId: string, orderData: any): Promise<Order | null> {
        throw new Error('Method not implemented.');
    }
    delete(orderId: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    async getOrderReceipt(orderId: string): Promise<any> {
        const result = await AppDataSource.query(
            `SELECT * FROM order_receipt_view WHERE order_id = $1`,
            [orderId]
        );
        return result;
    }

    async getAllReceipts(): Promise<any[]> {
        const result = await AppDataSource.query(
            `SELECT * FROM order_receipt_view`
        );
        return result;
    }

    async findById(orderId: string): Promise<Order | null> {
        return this.orderRepo.findOne({
            where: { order_id: orderId },
            relations: ['items'],
        });
    }

    async save(order: Order): Promise<Order> {
        return this.orderRepo.save(order);
    }
}
