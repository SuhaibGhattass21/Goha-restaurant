import { Order } from "@infrastructure/database/models/Order.model"

export interface IOrderRepository {
    findById(orderId: string): Promise<Order | null>
    getOrderReceipt(orderId: string): Promise<any>
    getAllReceipts(): Promise<any[]>
    create(orderData: any): Promise<Order>
    update(orderId: string, orderData: any): Promise<Order | null>
    delete(orderId: string): Promise<boolean>
}