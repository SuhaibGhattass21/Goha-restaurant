import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { PermissionService } from '../../../domain/services/Permission.service';

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
    async getPermissionsForAdmin(req: Request, res: Response): Promise<void> {
        const { adminId } = req.params;
        const result = await this.service.getPermissionsForAdmin(adminId);
        res.json({ success: true, data: result });
    }

    async getPermissionsForShift(req: Request, res: Response): Promise<void> {
        const { shiftId } = req.params;
        const result = await this.service.getPermissionsForShift(shiftId);
        res.json({ success: true, data: result });
    }
}
