"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerController = void 0;
class WorkerController {
    constructor(service) {
        this.service = service;
    }
    async createWorker(req, res) {
        const data = req.body;
        try {
            const worker = await this.service.create(data);
            res.status(201).json({
                success: true,
                message: "Worker created successfully",
                data: worker
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message || "Failed to create worker"
            });
        }
    }
    async updateWorker(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
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
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message || 'Failed to update worker',
            });
        }
    }
    async getWorkerById(req, res) {
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
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching worker',
                error: error.message,
            });
        }
    }
    async getAllWorkers(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const result = await this.service.getAll(page, limit);
            res.status(200).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch workers',
                error: error.message,
            });
        }
    }
    async deleteWorker(req, res) {
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
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete worker',
                error: error.message,
            });
        }
    }
}
exports.WorkerController = WorkerController;
//# sourceMappingURL=worker.controller.js.map