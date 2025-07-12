import type { ShiftController } from '../../controllers/Shift/shift.controller';
export declare class ShiftRoutes {
    private controller;
    private router;
    constructor(controller: ShiftController);
    private initializeRoutes;
    getRouter(): import("express-serve-static-core").Router;
}
