import { Request, Response } from 'express';
import { AuthUseCases } from '../../../application/use-cases/auth.use-case';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
export declare class AuthController {
    private authUseCases;
    constructor(authUseCases: AuthUseCases);
    login(req: Request, res: Response): Promise<void>;
    register(req: Request, res: Response): Promise<void>;
    getProfile(req: AuthenticatedRequest, res: Response): Promise<void>;
    refreshToken(req: AuthenticatedRequest, res: Response): Promise<void>;
    changePassword(req: AuthenticatedRequest, res: Response): Promise<void>;
    logout(req: AuthenticatedRequest, res: Response): Promise<void>;
}
