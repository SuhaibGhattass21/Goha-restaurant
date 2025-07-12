import { type ValidationChain } from "express-validator";
export declare class OrderValidator {
    static createOrder(): ValidationChain[];
    static updateOrder(): ValidationChain[];
    static updateOrderStatus(): ValidationChain[];
    static getOrderById(): ValidationChain[];
    static getOrdersByShiftId(): ValidationChain[];
    static getOrdersByCashierId(): ValidationChain[];
    static getOrdersByStatus(): ValidationChain[];
    static getOrdersByType(): ValidationChain[];
    static getOrdersByDateRange(): ValidationChain[];
    static deleteOrder(): ValidationChain[];
    static getOrders(): ValidationChain[];
    static getOrderStats(): ValidationChain[];
    static recalculateOrderTotal(): ValidationChain[];
}
