import { Router } from "express";
import { WorkerController } from "@interfaces/http/controllers/Shift/worker.controller";
export declare class WorkerRoutes {
    private controller;
    private router;
    constructor(controller: WorkerController);
    private initializeRoutes;
    getRouter(): Router;
}
