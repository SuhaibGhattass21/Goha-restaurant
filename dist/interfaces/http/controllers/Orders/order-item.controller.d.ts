import type { Request, Response } from "express";
import type { OrderItemUseCases } from "../../../../application/use-cases/Orders/order-item.use-cases";
export declare class OrderItemController {
    private orderItemUseCases;
    constructor(orderItemUseCases: OrderItemUseCases);
    createOrderItem(req: Request, res: Response): Promise<void>;
    getOrderItemById(req: Request, res: Response): Promise<void>;
    getOrderItemsByOrderId(req: Request, res: Response): Promise<void>;
    getAllOrderItems(req: Request, res: Response): Promise<void>;
    updateOrderItem(req: Request, res: Response): Promise<void>;
    deleteOrderItem(req: Request, res: Response): Promise<void>;
}
