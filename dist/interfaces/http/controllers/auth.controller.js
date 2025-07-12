"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const express_validator_1 = require("express-validator");
class AuthController {
    constructor(authUseCases) {
        this.authUseCases = authUseCases;
    }
    async login(req, res) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: errors.array()
                });
                return;
            }
            const authData = await this.authUseCases.login(req.body);
            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: authData
            });
        }
        catch (error) {
            res.status(401).json({
                success: false,
                message: error.message || 'Login failed'
            });
        }
    }
    async register(req, res) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: errors.array()
                });
                return;
            }
            const authData = await this.authUseCases.register(req.body);
            res.status(201).json({
                success: true,
                message: 'Registration successful',
                data: authData
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message || 'Registration failed'
            });
        }
    }
    async getProfile(req, res) {
        try {
            if (!req.user?.userId) {
                res.status(401).json({
                    success: false,
                    message: 'User not authenticated'
                });
                return;
            }
            const userProfile = await this.authUseCases.getUserProfile(req.user.userId);
            res.status(200).json({
                success: true,
                data: userProfile
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message || 'Failed to get profile'
            });
        }
    }
    async refreshToken(req, res) {
        try {
            if (!req.user?.userId) {
                res.status(401).json({
                    success: false,
                    message: 'User not authenticated'
                });
                return;
            }
            const tokenData = await this.authUseCases.refreshToken(req.user.userId);
            res.status(200).json({
                success: true,
                message: 'Token refreshed successfully',
                data: tokenData
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message || 'Token refresh failed'
            });
        }
    }
    async changePassword(req, res) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: errors.array()
                });
                return;
            }
            if (!req.user?.userId) {
                res.status(401).json({
                    success: false,
                    message: 'User not authenticated'
                });
                return;
            }
            const { oldPassword, newPassword } = req.body;
            await this.authUseCases.changePassword(req.user.userId, oldPassword, newPassword);
            res.status(200).json({
                success: true,
                message: 'Password changed successfully'
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message || 'Password change failed'
            });
        }
    }
    async logout(req, res) {
        res.status(200).json({
            success: true,
            message: 'Logout successful'
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map