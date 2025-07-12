import { Router } from "express";
import { ShiftWorkerController } from "../../controllers/Shift/shiftWorker.controller";
export declare class ShiftWorkerRoutes {
    private controller;
    private router;
    constructor(controller: ShiftWorkerController);
    private init;
    getRouter(): Router;
}
