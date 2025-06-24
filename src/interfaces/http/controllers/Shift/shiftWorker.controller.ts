import { Request, Response } from "express";
import { ShiftWorkerService } from "../../../../domain/services/Shift/ShiftWorker.service";
import { AddShiftWorkerDto, UpdateShiftWorkerDto } from "../../../../application/dtos/Shift/ShiftWorker.dto";

export class ShiftWorkerController {
    constructor(private service: ShiftWorkerService) { }

    async createShiftWorker(req: Request, res: Response) {
        try {
            const dto: AddShiftWorkerDto = req.body;

            if (!dto.shift_id || !dto.worker_id || !dto.hourly_rate || !dto.start_time) {
                res.status(400).json({ message: "Missing required fields" });
            }

            const result = await this.service.create(dto);
            res.status(201).json(result);
        } catch (err) {
            console.error("Error creating shift worker:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const dto: UpdateShiftWorkerDto = req.body;

            if (!id) {
                res.status(400).json({ message: "ShiftWorker ID is required" });
            }

            const updated = await this.service.update(id, dto);
            if (!updated) {
                res.status(404).json({ message: "ShiftWorker not found" });
            }

            res.json(updated);
        } catch (err) {
            console.error("Error updating shift worker:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getShiftWorkerById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: "ShiftWorker ID is required" });
            }

            const result = await this.service.getById(id);
            if (!result) {
                res.status(404).json({ message: "ShiftWorker not found" });
            }

            res.json(result);
        } catch (err) {
            console.error("Error getting shift worker by ID:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getWorkerByShiftId(req: Request, res: Response) {
        try {
            const { shiftId } = req.params;
            if (!shiftId) {
                res.status(400).json({ message: "Shift ID is required" });
            }

            const workers = await this.service.getByShiftId(shiftId);
            res.json(workers);
        } catch (err) {
            console.error("Error getting shift workers by shift ID:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: "ShiftWorker ID is required" });
            }

            const deleted = await this.service.delete(id);
            if (!deleted) {
                res.status(404).json({ message: "ShiftWorker not found" });
            }

            res.status(204).send();
        } catch (err) {
            console.error("Error deleting shift worker:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
