import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { PermissionService } from '../../../domain/services/Permission.service';
import { AssignPermissionsDto, BatchAssignPermissionDto, CheckMultiplePermissionsDto, RevokePermissionsDto } from '@application/dtos/Permission.dto';

export class PermissionController {
    constructor(private service: PermissionService) { }

    async create(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        try {
            const result = await this.service.create(req.body);
            res.status(201).json({ success: true, data: result });
        } catch (err: any) {
            res.status(409).json({ success: false, message: err.message });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        const result = await this.service.update(req.params.id, req.body);
        if (!result) {
            res.status(404).json({ message: 'Permission not found' });
            return;
        }

        res.json({ success: true, data: result });
    }

    async getById(req: Request, res: Response): Promise<void> {
        const result = await this.service.findById(req.params.id);
        if (!result) {
            res.status(404).json({ message: 'Permission not found' });
            return;
        }

        res.json({ success: true, data: result });
    }

    async getAll(req: Request, res: Response): Promise<void> {
        const result = await this.service.findAll();
        res.json({ success: true, data: result });
    }

    async delete(req: Request, res: Response): Promise<void> {
        const success = await this.service.delete(req.params.id);
        if (!success) {
            res.status(404).json({ message: 'Permission not found' });
            return;
        }

        res.json({ success: true, message: 'Permission deleted' });
    }

    async assignPermissionsToUser(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
            return;
        }

        try {
            const { userId, permissionIds, grantedBy: granted_by }: AssignPermissionsDto = req.body;

            await this.service.assignPermissionsToUser(userId, permissionIds, granted_by);
            res.status(200).json({
                success: true,
                message: 'Permissions assigned successfully'
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async revokePermissionsFromUser(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
            return;
        }

        try {
            const { userId, permissionIds }: RevokePermissionsDto = req.body;
            await this.service.revokePermissionsFromUser(userId, permissionIds);
            res.status(200).json({
                success: true,
                message: 'Permissions revoked successfully'
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async getUserPermissions(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
            return;
        }

        try {
            const userId = req.params.userId;
            const permissions = await this.service.getUserPermissions(userId);
            res.status(200).json({
                success: true,
                data: { permissions }
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async checkUserHasPermission(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
            return;
        }

        try {
            const userId = req.params.userId;
            const permissionName = req.params.permissionName;
            const hasPermission = await this.service.checkUserHasPermission(userId, permissionName);
            res.status(200).json({
                success: true,
                data: { hasPermission }
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async getAllPermissionsForUser(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
            return;
        }

        try {
            const userId = req.params.userId;
            const permissions = await this.service.getAllPermissionsForUser(userId);
            res.status(200).json({
                success: true,
                data: permissions
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async getAllUsersWithPermission(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
            return;
        }

        try {
            const permissionId = req.params.permissionId;
            const users = await this.service.getAllUsersWithPermission(permissionId);
            res.status(200).json({
                success: true,
                data: users
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async checkMultiplePermissions(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
            return;
        }

        try {
            const userId = req.params.userId;
            const { permissionNames }: CheckMultiplePermissionsDto = req.body;

            const result = await this.service.checkMultiplePermissions(userId, permissionNames);
            res.status(200).json({
                success: true,
                data: result
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async batchAssignPermission(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
            return;
        }

        try {
            const { permissionId, userIds, granted_by }: BatchAssignPermissionDto = req.body;

            await this.service.batchAssignPermission(permissionId, userIds, granted_by);
            res.status(200).json({
                success: true,
                message: 'Permission assigned to users successfully'
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

}
