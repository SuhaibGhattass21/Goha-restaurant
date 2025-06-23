import { Request, Response } from "express";
import { WorkerService } from "@domain/services/Shift/Worker.service";
import { UpdateWorkerDto } from "../../../../application/dtos/Shift/Worker.dto"

export class WorkerController {
    constructor(private service: WorkerService) { }

    async createWorker(req: Request, res: Response): Promise<void> {
        const data = req.body;

        try {
            const worker = await this.service.create(data);
            res.status(201).json({
                success: true,
                message: "Worker created successfully",
                data: worker
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message || "Failed to create worker"
            });
        }
    }

    async updateWorker(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const data: UpdateWorkerDto = req.body;

            const result = await this.service.update(id, data);

            if (!result) {
                res.status(404).json({
                    success: false,
                    message: 'Worker not found',
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Worker updated successfully',
                data: result,
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message || 'Failed to update worker',
            });
        }
    }

    async getWorkerById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const result = await this.service.getById(id);

            if (!result) {
                res.status(404).json({
                    success: false,
                    message: 'Worker not found',
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: result,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error fetching worker',
                error: error.message,
            });
        }
    }

    async getAllWorkers(req: Request, res: Response): Promise<void> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const result = await this.service.getAll(page, limit);

            res.status(200).json({
                success: true,
                data: result,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch workers',
                error: error.message,
            });
        }
    }

    async deleteWorker(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deleted = await this.service.delete(id);

            if (!deleted) {
                res.status(404).json({
                    success: false,
                    message: 'Worker not found',
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Worker deleted successfully',
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete worker',
                error: error.message,
            });
        }
    }
}