import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validation.middleware';
import { LoginDto, RegisterDto, ChangePasswordDto } from '../../../application/dtos/auth.dto';

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
            validateBody(LoginDto),
            this.authController.login.bind(this.authController)
        );

        this.router.post(
            '/register',
            validateBody(RegisterDto),
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
            validateBody(ChangePasswordDto),
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