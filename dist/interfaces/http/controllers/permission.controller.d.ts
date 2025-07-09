import { Request, Response } from 'express';
import { PermissionService } from '../../../domain/services/Permission.service';
export declare class PermissionController {
    private service;
    constructor(service: PermissionService);
    create(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    getAll(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
    assignPermissionsToUser(req: Request, res: Response): Promise<void>;
    revokePermissionsFromUser(req: Request, res: Response): Promise<void>;
    getUserPermissions(req: Request, res: Response): Promise<void>;
    checkUserHasPermission(req: Request, res: Response): Promise<void>;
    getAllPermissionsForUser(req: Request, res: Response): Promise<void>;
    getAllUsersWithPermission(req: Request, res: Response): Promise<void>;
    checkMultiplePermissions(req: Request, res: Response): Promise<void>;
    batchAssignPermission(req: Request, res: Response): Promise<void>;
}
