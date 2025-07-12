import { type ValidationChain } from "express-validator";
export declare class CancelledOrderValidator {
    static createCancelledOrder(): ValidationChain[];
    static getCancelledOrderById(): ValidationChain[];
    static getCancelledOrderByOrderId(): ValidationChain[];
    static getCancelledOrdersByCancelledBy(): ValidationChain[];
    static getCancelledOrdersByShiftId(): ValidationChain[];
    static getCancelledOrders(): ValidationChain[];
}
