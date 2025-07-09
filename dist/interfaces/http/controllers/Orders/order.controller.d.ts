import type { Request, Response } from "express";
import type { OrderUseCases } from "../../../../application/use-cases/Orders/order.use-cases";
export declare class OrderController {
    private orderUseCases;
    constructor(orderUseCases: OrderUseCases);
    createOrder(req: Request, res: Response): Promise<void>;
    getOrderById(req: Request, res: Response): Promise<void>;
    getOrdersByShiftId(req: Request, res: Response): Promise<void>;
    getOrdersByCashierId(req: Request, res: Response): Promise<void>;
    getOrdersByStatus(req: Request, res: Response): Promise<void>;
    getOrdersByType(req: Request, res: Response): Promise<void>;
    getOrdersByDateRange(req: Request, res: Response): Promise<void>;
    getOrdersByShiftTypeAndDate(req: Request, res: Response): Promise<void>;
    getAllOrders(req: Request, res: Response): Promise<void>;
    updateOrder(req: Request, res: Response): Promise<void>;
    updateOrderStatus(req: Request, res: Response): Promise<void>;
    deleteOrder(req: Request, res: Response): Promise<void>;
    getOrderStats(req: Request, res: Response): Promise<void>;
    recalculateOrderTotal(req: Request, res: Response): Promise<void>;
}
