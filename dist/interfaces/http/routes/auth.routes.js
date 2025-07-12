"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
class AuthRoutes {
    constructor(authController, authMiddleware) {
        this.authController = authController;
        this.authMiddleware = authMiddleware;
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/login', this.authController.login.bind(this.authController));
        this.router.post('/register', this.authController.register.bind(this.authController));
        this.router.get('/profile', this.authMiddleware.authenticate, this.authController.getProfile.bind(this.authController));
        this.router.post('/refresh-token', this.authMiddleware.authenticate, this.authController.refreshToken.bind(this.authController));
        this.router.post('/change-password', this.authMiddleware.authenticate, this.authController.changePassword.bind(this.authController));
        this.router.post('/logout', this.authMiddleware.authenticate, this.authController.logout.bind(this.authController));
    }
    getRouter() {
        return this.router;
    }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=auth.routes.js.map