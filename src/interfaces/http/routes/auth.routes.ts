import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class AuthRoutes {
    private router: Router;

    constructor(
        private authController: AuthController,
    ) {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            '/login',
            this.authController.login.bind(this.authController)
        );

        this.router.post(
            '/register',
            this.authController.register.bind(this.authController)
        );

        this.router.get(
            '/profile',
            AuthMiddleware.authenticate(),
            this.authController.getProfile.bind(this.authController)
        );

        this.router.post(
            '/refresh-token',
            AuthMiddleware.authenticate(),
            this.authController.refreshToken.bind(this.authController)
        );

        this.router.post(
            '/change-password',
            AuthMiddleware.authenticate(),
            this.authController.changePassword.bind(this.authController)
        );

        this.router.post(
            '/logout',
            AuthMiddleware.authenticate(),
            this.authController.logout.bind(this.authController)
        );
    }

    getRouter() {
        return this.router;
    }
}