import { Router } from "express";
import type { OrderItemController } from "../../controllers/Orders/order-item.controller";
export declare class OrderItemRoutes {
    private router;
    private orderItemController;
    constructor(orderItemController: OrderItemController);
    private initializeRoutes;
    getRouter(): Router;
}
