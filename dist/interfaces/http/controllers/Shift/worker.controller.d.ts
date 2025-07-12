import { Request, Response } from "express";
import { WorkerService } from "@domain/services/Shift/Worker.service";
export declare class WorkerController {
    private service;
    constructor(service: WorkerService);
    createWorker(req: Request, res: Response): Promise<void>;
    updateWorker(req: Request, res: Response): Promise<void>;
    getWorkerById(req: Request, res: Response): Promise<void>;
    getAllWorkers(req: Request, res: Response): Promise<void>;
    deleteWorker(req: Request, res: Response): Promise<void>;
}
