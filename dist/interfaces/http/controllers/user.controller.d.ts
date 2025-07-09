import type { Request, Response } from 'express';
import type { UserService } from '@domain/services/user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    createUser(req: Request, res: Response): Promise<void>;
    getUserById(req: Request, res: Response): Promise<void>;
    getAllUsers(req: Request, res: Response): Promise<void>;
    updateUser(req: Request, res: Response): Promise<void>;
    deleteUser(req: Request, res: Response): Promise<void>;
    assignPermissions(req: Request, res: Response): Promise<void>;
}
