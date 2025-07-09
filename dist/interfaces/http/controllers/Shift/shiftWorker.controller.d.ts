import { Request, Response } from "express";
import { ShiftWorkerService } from "../../../../domain/services/Shift/ShiftWorker.service";
export declare class ShiftWorkerController {
    private service;
    constructor(service: ShiftWorkerService);
    createShiftWorker(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    getShiftWorkerById(req: Request, res: Response): Promise<void>;
    getWorkerByShiftId(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}
