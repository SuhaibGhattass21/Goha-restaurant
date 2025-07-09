import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
export declare class UserRoutes {
    private controller;
    private router;
    constructor(controller: UserController);
    private initializeRoutes;
    getRouter(): Router;
}
