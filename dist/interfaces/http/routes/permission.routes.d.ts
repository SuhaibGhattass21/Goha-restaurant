import { Router } from 'express';
import { PermissionController } from '../controllers/permission.controller';
export declare class PermissionRoutes {
    private controller;
    private router;
    constructor(controller: PermissionController);
    private initializeRoutes;
    getRouter(): Router;
}
