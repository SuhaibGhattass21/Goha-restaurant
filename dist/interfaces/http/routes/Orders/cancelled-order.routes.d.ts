import { Router } from "express";
import type { CancelledOrderController } from "../../controllers/Orders/cancelled-order.controller";
export declare class CancelledOrderRoutes {
    private router;
    private cancelledOrderController;
    constructor(cancelledOrderController: CancelledOrderController);
    private initializeRoutes;
    getRouter(): Router;
}
