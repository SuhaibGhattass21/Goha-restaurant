import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
export declare class AuthRoutes {
    private authController;
    private authMiddleware;
    private router;
    constructor(authController: AuthController, authMiddleware: AuthMiddleware);
    private initializeRoutes;
    getRouter(): Router;
}
