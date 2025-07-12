import type { Request, Response } from "express";
import type { CancelledOrderUseCases } from "../../../../application/use-cases/Orders/cancelled-order.use-cases";
export declare class CancelledOrderController {
    private cancelledOrderUseCases;
    constructor(cancelledOrderUseCases: CancelledOrderUseCases);
    createCancelledOrder(req: Request, res: Response): Promise<void>;
    getCancelledOrderById(req: Request, res: Response): Promise<void>;
    getCancelledOrderByOrderId(req: Request, res: Response): Promise<void>;
    getCancelledOrdersByCancelledBy(req: Request, res: Response): Promise<void>;
    getCancelledOrdersByShiftId(req: Request, res: Response): Promise<void>;
    getAllCancelledOrders(req: Request, res: Response): Promise<void>;
}
