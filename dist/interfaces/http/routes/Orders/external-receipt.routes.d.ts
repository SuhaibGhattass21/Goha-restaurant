import { Router } from "express";
import { ExternalReceiptController } from "../../controllers/Orders/external-receipt.controller";
export declare class ExternalReceiptRoutes {
    private controller;
    private router;
    constructor(controller: ExternalReceiptController);
    private initializeRoutes;
    getRouter(): Router;
}
