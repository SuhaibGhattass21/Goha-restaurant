import { type ValidationChain } from "express-validator";
export declare class OrderItemValidator {
    static createOrderItem(): ValidationChain[];
    static updateOrderItem(): ValidationChain[];
    static getOrderItemById(): ValidationChain[];
    static getOrderItemsByOrderId(): ValidationChain[];
    static deleteOrderItem(): ValidationChain[];
    static getOrderItems(): ValidationChain[];
}
