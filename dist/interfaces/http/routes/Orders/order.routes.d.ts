import { Router } from "express";
import type { OrderController } from "../../controllers/Orders/order.controller";
export declare class OrderRoutes {
    private router;
    private orderController;
    constructor(orderController: OrderController);
    private initializeRoutes;
    getRouter(): Router;
}
