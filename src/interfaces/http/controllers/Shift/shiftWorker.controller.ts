import { Request, Response } from "express";
import { ShiftWorkerService } from "../../../../domain/services/Shift/ShiftWorker.service";
import {
    AddShiftWorkerDto,
    UpdateShiftWorkerDto,
    UpdateShiftWorkerEndDto
} from "../../../../application/dtos/Shift/ShiftWorker.dto";

export class ShiftWorkerController {
    constructor(private service: ShiftWorkerService) { }

    async createShiftWorker(req: Request, res: Response): Promise<void> {
        const dto: AddShiftWorkerDto = req.body;

        if (!dto.shift_id || !dto.worker_id || !dto.hourly_rate || !dto.start_time) {
            res.status(400).json({ message: "Missing required fields" });
        }

        try {
            const result = await this.service.create(dto);
            res.status(201).json(result);
        } catch (error) {
            console.error("Error creating shift worker:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const dto: UpdateShiftWorkerDto = req.body;

        if (!id) {
            res.status(400).json({ message: "ShiftWorker ID is required" });
        }

        try {
            const updated = await this.service.update(id, dto);
            if (!updated) {
                res.status(404).json({ message: "ShiftWorker not found" });
            }

            res.status(200).json(updated);
        } catch (error) {
            console.error("Error updating shift worker:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getShiftWorkerById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "ShiftWorker ID is required" });
        }

        try {
            const result = await this.service.getById(id);
            if (!result) {
                res.status(404).json({ message: "ShiftWorker not found" });
            }

            res.status(200).json(result);
        } catch (error) {
            console.error("Error fetching shift worker by ID:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getWorkerByShiftId(req: Request, res: Response): Promise<void> {
        const { shiftId } = req.params;
        if (!shiftId) {
            res.status(400).json({ message: "Shift ID is required" });
        }

        try {
            const workers = await this.service.getByShiftId(shiftId);
            res.status(200).json(workers);
        } catch (error) {
            console.error("Error fetching workers by shift ID:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "ShiftWorker ID is required" });
        }

        try {
            const deleted = await this.service.delete(id);
            if (!deleted) {
                res.status(404).json({ message: "ShiftWorker not found" });
            }

            res.status(204).send();
        } catch (error) {
            console.error("Error deleting shift worker:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async setEndTime(req: Request, res: Response): Promise<void> {
        const dto: UpdateShiftWorkerEndDto = req.body;

        if (!dto.shift_worker_id || !dto.end_time) {
            res.status(400).json({ message: "ShiftWorker ID and end_time are required" });
        }

        try {
            const result = await this.service.updateEndTime(dto);
            res.status(200).json(result);
        } catch (error) {
            console.error("Error setting end time:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
