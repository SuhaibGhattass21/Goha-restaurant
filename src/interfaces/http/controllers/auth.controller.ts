import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { AuthUseCases } from '../../../application/use-cases/auth.use-case';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export class AuthController {
    constructor(private authUseCases: AuthUseCases) { }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const errors = validationResult(req);
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
        } catch (error: any) {
            res.status(401).json({
                success: false,
                message: error.message || 'Login failed'
            });
        }
    }

    async register(req: Request, res: Response): Promise<void> {
        try {
            const errors = validationResult(req);
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
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message || 'Registration failed'
            });
        }
    }

    async getProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
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
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message || 'Failed to get profile'
            });
        }
    }

    async refreshToken(req: AuthenticatedRequest, res: Response): Promise<void> {
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
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message || 'Token refresh failed'
            });
        }
    }

    async changePassword(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const errors = validationResult(req);
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
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message || 'Password change failed'
            });
        }
    }

    async logout(req: AuthenticatedRequest, res: Response): Promise<void> {
        res.status(200).json({
            success: true,
            message: 'Logout successful'
        });
    }
}